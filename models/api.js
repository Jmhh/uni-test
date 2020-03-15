import { HTTP } from '../utils/http.js'

class ApiModel extends HTTP {
	login(params) {
        return this.request({
            url: `/api/common/user/login_jscode`,
			method: 'POST',
			data: params
        })
    }
	getUserInfo(params) {
		return this.request({
		    url: `/api/userinfo/one?id=${params}`,
			method: 'GET'
		})
	}
	uploadImg(params) {
        return this.request({
            url: `/api/file/upload`,
			method: 'POST',
			data: params
        })
    }
	updateUserInfo(params) {
		return this.request({
		    url: `/api/userinfo/update`,
			method: 'POST',
			data: params
		})
	}
	getUserList(params) {
		return this.request({
		    url: `/api/userinfo/collect/list?id=${params}`,
			method: 'GET'
		})
	}
	getUserSearch(params,message) {
		return this.request({
		    url: `/api/userinfo/search?id=${params}&message=${message}`,
			method: 'GET'
		})
	}
	postUserCollect(params) {
		return this.request({
		    url: `/api/collect/add`,
			method: 'POST',
			data: params
		})
	}
}

export { ApiModel }