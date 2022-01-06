const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
	plugins: [
		{
			plugin: CracoEsbuildPlugin,
			options: {
				enableSvgr: true,
				svgrOptions: {
					icon: true,
				},
				esbuildLoaderOptions: {
					loader: 'tsx',
					target: 'es2015',
				},
				esbuildMinimizerOptions: {
					target: 'es2015',
					css: true,
				},
				skipEsbuildJest: false,
				esbuildJestOptions: {
					loaders: {
						'.ts': 'ts',
						'.tsx': 'tsx',
					},
				},
			},
		},
	],
  };