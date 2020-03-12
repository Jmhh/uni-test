let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
    BASE_URL = '' // 测试环境
} else {
    BASE_URL = '' // 生产环境
}
const config = {
	base_url: BASE_URL,
	appId: 'wx3c6a94c265af69fa',
	appKey: ''
}

export { config }