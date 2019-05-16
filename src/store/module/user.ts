import {
	getUserInfo,
	getMenu,
} from '@/req/user'
export default {
	namespaced: true,
	state: {
		// 用户信息
		info: {
			// 角色权限id
			roleId: 1,
			// 用户名
			displayName: '',
		},
		// 菜单列表
		menu: [],
	},
	// getters:{},
	mutations: {
		setInfo(state: { info: any; }, obj: any) {
			state.info = obj
		},
		setMenu(state: { menu: any; }, obj: any) {
			state.menu = obj
		},
	},
	actions: {
		async updateMenu({
			commit,
		}) {
			const res = await getMenu()
			if (res.code !== 200) {
				(window as any).App.$Message.error(res.msg)
			} else {
				commit('setMenu', res.data)
			}

		},
		// 设置当前用户角色
		async updateInfo({
			commit,
		}) {
			try {
				const res = await getUserInfo()
				if (res.code === 200) {
					commit('setInfo', res.data)
				} else {
					if (window.location.href.indexOf('/login') === -1) {
						(window as any).App.$router.push({
							path: '/login',
						})
					}
				}
			} catch (err) {
				if (window.location.href.indexOf('/login') === -1) {
					(window as any).App.$router.push({
						path: '/login',
					})
				}
			}
		},
	},
}
