let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'http://121.201.18.34:8090' // 测试环境
} else {
    BASE_URL = 'http://121.201.18.34:8090' // 生产环境
}
const config = {
	base_url: BASE_URL,
	appId: 'wx3c6a94c265af69fa',
	appKey: ''
}

export { config }