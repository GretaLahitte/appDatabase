var webpack = require("../../");
module.exports = {
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				worker: {
                    output: {
                        filename: 'worker.test.js',
                        chunkFilename: '[id].worker.test.js'
                    }
                    },
			}
		})
	]
};