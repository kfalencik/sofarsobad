<template>
  <div>
    <p>Testing</p>
    <b-button @click.stop.prevent="send">Send</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    send () {
      const order = {
        "brandName": "So Far So Bad",
        "comment": "",
        "shipping_­address": {
          "firstName": this.$store.state.order ? this.$store.state.order.details.firstName: '',
          "lastName": this.$store.state.order ? this.$store.state.order.details.lastName: '',
          "company": this.$store.state.order ? this.$store.state.order.details.company: '',
          "address1": this.$store.state.order ? this.$store.state.order.details.address1: '',
          "address2": this.$store.state.order ? this.$store.state.order.details.address2: '',
          "city": this.$store.state.order ? this.$store.state.order.details.city: '',
          "county": this.$store.state.order ? this.$store.state.order.details.state: '',
          "postcode": this.$store.state.order ? this.$store.state.order.details.zipcode: '',
          "country": "United Kingdom",
          "phone1": this.$store.state.order ? this.$store.state.order.details.mobile: '',
        },
        "shipping": {
          "shippin­gMethod": "courier"
        },
        "items": [
          {
            "pn": "CV001-BLK-M",
            "quantity": 1,
            "retailPrice": 24.99,
            "description": "",
            "label": {
              "type": "printed",
              "name": "ink-label"
            }
          }
        ]
      }

      // axios.post(`https://www.twofifteen.co.uk/­api/­orders.­php?AppId=${process.env.PRINTING_ID}&­Signature=­${process.env.PRINTING_KEY}`, order).then(response => {
      //   console.log('axios', response)
      // }) 

      fetch(`/­api/­orders.­php?AppId=${process.env.PRINTING_ID}&­Signature=­${process.env.PRINTING_KEY}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(order)
      }).then(response => {
        
        console.log('fetch', response)
      });
    }
  }
}
</script>