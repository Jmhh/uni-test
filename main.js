import Vue from 'vue'
import App from './App'
//import uniPop from './components/uniPop/uniPop.vue'
//腾讯地图 key:UVTBZ-Y7JCK-XYGJU-AYUFD-QXRAF-LRF3N  UVTBZ-Y7JCK-XYGJU-AYUFD-QXRAF-LRF3N

import { ApiModel } from 'models/api.js'
const api = new ApiModel()
Vue.prototype.$api = api 
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
