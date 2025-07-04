export default defineAppConfig({
	tabBar: {
		custom: true,
		list: [
			{
				pagePath: "pages/index/index",
				text: "首页"
			},
			{
				pagePath: "pages/mine/index",
				text: "我的"
			}
		]
	},
	pages: ["pages/index/index", "pages/mine/index", "pages/login/index"],
	subpackages: [
		{
			name: "user",
			root: "subPages/user",
			pages: ["UserServiceAgreement/index", "PrivacyPolicy/index", "UserNickNameAndAvatar/index"]
		}
	],
	window: {
		backgroundTextStyle: "light",
		navigationBarBackgroundColor: "#fff",
		navigationBarTitleText: "WeChat",
		navigationBarTextStyle: "black"
	}
});
