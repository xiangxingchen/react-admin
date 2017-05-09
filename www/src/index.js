import dva from 'dva';
import { message } from 'antd';
import { browserHistory,routerRedux } from 'dva/router';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(e, dispatch) {
        dispatch({type: 'app/logout'});
        if (e.message === 'Unauthorized') {
            dispatch(routerRedux.push('/login'));
            } else {
            message.error(e.message, 5);
        }
    }
});

// 2. Plugins
app.use(createLoading({effects: true}));

// 3. Model
app.model(require("./models/app"));
app.model(require("./models/user"));
app.model(require("./models/profile"));
app.model(require("./models/posts"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
