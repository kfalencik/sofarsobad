import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueFbCustomerChat, {
  page_id: '109400771196516', //  change 'null' to your Facebook Page ID,
  theme_color: '#ff4f33', // theme color in HEX
  locale: 'en_GB', // default 'en_US'
})