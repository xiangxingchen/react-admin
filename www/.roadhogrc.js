export default {
    "entry": "src/index.js",
    "disableCSSModules": false,
    "autoprefixer": null,
    "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
    ],
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr"
            ]
        }
    },
    "proxy": {
        "/api": {
            "target": "http://localhost:9000/api",
            "changeOrigin": true,
            "pathRewrite": {
                "^/api": "/"
            }
        }
    }
}