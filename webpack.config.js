'use strict';

/* eslint-env node */

const path = require( 'path' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = () => {
	return {
		devtool: 'source-map',
		performance: { hints: false },

		entry: path.resolve( __dirname, 'src', 'ckeditor5-blk42.js' ),

		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'ckeditor5-blk42.js',
			libraryTarget: 'umd',
			libraryExport: 'default'
		},

		optimization: {
			minimizer: [
				new TerserWebpackPlugin( {
					sourceMap: true,
					terserOptions: {
						format: {
							// 'some' keeps the @license/@preserve notices the bundled sources carry -
							// CKEditor 5 puts one in every module. The old /^!/ matched none of them
							// (they are /**, not /*!), so it stripped what it meant to keep.
							comments: 'some'
						}
					},
					extractComments: false
				} )
			]
		},

		plugins: [
			// @ckeditor/ckeditor5-dev-webpack-plugin (translations) is not needed anymore,
			// this build is English-only
		],

		module: {
			rules: [
				{
					test: /\.svg$/,
					use: [ 'raw-loader' ]
				},
				{
					// ckeditor5.css comes prebuilt now and is imported by the entry,
					// so we only load it, no theme-lark postcss processing
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								injectType: 'singletonStyleTag',
								attributes: {
									'data-cke': true
								}
							}
						},
						{
							loader: 'css-loader'
						}
					]
				}
			]
		}
	};
};
