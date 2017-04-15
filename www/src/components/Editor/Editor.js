import React, { PropTypes } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import '../../../node_modules/react-simplemde-editor/dist/simplemde.min.css';
import deepEqual from '../../utils/deepEqual';

class Editor extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string,
    };

    constructor(props) {
        super(props);
        if (props.value) {
            this.state = {value: props.value}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.value !== this.state.value) {
            this.setState({ value });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const fields = ['value'];
        var b = deepEqual(this.props, nextProps, fields);
        if (b && this.state.value === nextState.value) {
            return false;
        }
        return true;
    }

    handleChange = (value) => {
        this.state = {value};
        this.props.onChange(value);
    }

    render() {
        return (<SimpleMDE onChange={this.handleChange} value={this.state.value} />);
    }
}

export default Editor;
