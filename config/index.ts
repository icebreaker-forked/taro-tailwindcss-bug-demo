import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import devConfig from "./dev";
import prodConfig from "./prod";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { UnifiedWebpackPluginV5 } from "weapp-tailwindcss/webpack";
import path from "path";

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"webpack5">(async (merge, { command, mode }) => {
	const baseConfig: UserConfigExport<"webpack5"> = {
		devServer: {
			hot: true
		},
		projectName: "benefit-enterprise",
		date: "2025-6-5",
		designWidth: 375,
		deviceRatio: {
			640: 2.34 / 2,
			750: 1,
			375: 2,
			828: 1.81 / 2
		},
		sourceRoot: "src",
		outputRoot: "dist",
		plugins: ["@tarojs/plugin-html"],
		defineConstants: {},
		copy: {
			patterns: [],
			options: {}
		},
		framework: "react",
		compiler: {
			type: "webpack5",
			prebundle: {
				enable: false
			}
		},
		cache: {
			enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
		},
		sass: {
			resource: [path.resolve(__dirname, "..", "src/styles/mixin.scss")]
			// data: `@import "@nutui/nutui-react/dist/styles/theme-default.scss";`,
		},
    terser:{
      enable: true,
    },
		mini: {
			postcss: {
				pxtransform: {
					enable: true,
					config: {
						selectorBlackList: ["nut-"]
					}
				},
				cssModules: {
					enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
					config: {
						namingPattern: "module", // 转换模式，取值为 global/module
						generateScopedName: "[name]__[local]___[hash:base64:5]"
					}
				}
			},
			miniCssExtractPluginOption: {
				//忽略css文件引入顺序
				ignoreOrder: true
			},
			optimizeMainPackage: {
				enable: true
			},
			webpackChain(chain, webpack) {
				chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
				// 复制这块区域到你的配置代码中 region start
				chain.merge({
					plugin: {
						install: {
							plugin: UnifiedWebpackPluginV5,
							args: [
								{
									// 这里可以传参数
									rem2rpx: true,
									injectAdditionalCssVarScope: true,
									appType: "taro"
								}
							]
						}
					}
				});
				// chain.merge({
				// 	plugin: {
				// 		install: {
				// 			plugin: require("terser-webpack-plugin"),
				// 			args: [
				// 				{
				// 					terserOptions: {
				// 						compress: true, // 默认使用terser压缩
				// 						// mangle: false,
				// 						keep_classnames: true, // 不改变class名称
				// 						keep_fnames: true // 不改变函数名称
				// 					}
				// 				}
				// 			]
				// 		}
				// 	}
				// });
				// region end
			}
		},
		h5: {
			publicPath: "/",
			staticDirectory: "static",

			miniCssExtractPluginOption: {
				ignoreOrder: true,
				filename: "css/[name].[hash].css",
				chunkFilename: "css/[name].[chunkhash].css"
			},
			postcss: {
				autoprefixer: {
					enable: true,
					config: {}
				},
				cssModules: {
					enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
					config: {
						namingPattern: "module", // 转换模式，取值为 global/module
						generateScopedName: "[name]__[local]___[hash:base64:5]"
					}
				}
			}
			// webpackChain(chain, webpack) {
			// 	chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
			// }
		},
		rn: {
			appName: "taroDemo",
			postcss: {
				cssModules: {
					enable: false // 默认为 false，如需使用 css modules 功能，则设为 true
				}
			}
		}
	};
	if (process.env.NODE_ENV === "development") {
		// 本地开发构建配置（不混淆压缩）
		return merge({}, baseConfig, devConfig);
	}
	// 生产构建配置（默认开启压缩混淆等）
	return merge({}, baseConfig, prodConfig);
});
