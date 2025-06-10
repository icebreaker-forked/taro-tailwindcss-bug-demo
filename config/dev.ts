import type { UserConfigExport } from "@tarojs/cli";
export default {
	devServer: {
		hot: true
	},
	mini: {},
	h5: {}
} satisfies UserConfigExport<"webpack5">;
