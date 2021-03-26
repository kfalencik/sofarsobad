import firebase from 'firebase/app';
import emailjs from 'emailjs-com';
import axios from 'axios'
import md5 from 'js-md5';
import 'firebase/firestore';
import firebaseConfig from '~/assets/data/firebase';
import { ToastProgrammatic as Toast } from 'buefy'

// Firestore database connection
let db

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Email configuration
let emailserviceid = process.env.EMAIL_SERVICE;
let emailuserid = process.env.EMAIL_USER;

export const state = () => ({
  authorized: false,
  cart: [],
  order: {},
  discount: null,
  expire: 1
});

export const mutations = {
  addToCart (state, data) {
    let cartItem = {
      product: data[0],
      size: data[1],
      quantity: data[2],
      sku: data[3]
    };

    let found = null;
    let i = 0;

    // Check if item already exists in cart
    state.cart.forEach(item => {
      if (item.product == cartItem.product && item.size === cartItem.size) {
        found = i;
      }
      i++;
    })

    if (found !== null) {
      state.cart[found].quantity = state.cart[found].quantity + data[2];
    } else {
      state.cart.push(cartItem);
      
    }
  },
  addDiscount (state, id) {
    state.discount = id;
  },
  login (state) {
    state.authorized = true;
  },
  logout (state) {
    state.authorized = false;
  },
  removeFromCart(state, index) {
    state.cart.splice(index, 1);
  },
  changeQuantity (state, data) {
    const product = state.cart[data.index].quantity = data.quantity
  },
  completeOrder (state, data) {
    const self = this;
    db = firebase.firestore();

    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let timeReversed = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    date = dd + '/' + mm + '/'  + yyyy + ' ' + time;

    state.order.details = data[0];
    state.order.paypal = data[1];
    state.order.items = data[2];
    state.order.subtotal = data[3];
    state.order.total = data[4];
    state.order.tax = (Math.floor(data[5] * 100) / 100).toFixed(2);

    if (state.discount) {
      state.order.items.pop();
    }

    const printifyOrder = {
      external_id: state.order.paypal.orderID,
      label: `Order - ${state.order.paypal.orderID}`,
      line_items: [],
      shipping_method: 1,
      send_shipping_notification: true,
      address_to: {
        first_name: 'Kevin',
        last_name: 'Falencik',
        email: 'kfalencik@gmail.com',
        phone: '07961276427',
        country: 'GB',
        region: 'Midlothian',
        address1: '67/2 Lorne Street',
        address2: '',
        city: 'Edinburgh',
        zip: 'EH6 8QG'
      }
    }

    const printifyLineItems = []

    state.cart.forEach(product => {
      console.log(product)
      printifyLineItems.push({
        sku: product.sku,
        quantity: product.quantity
      })
    })

    printifyOrder.line_items = printifyLineItems;


    const printifyOptions = {
      version: 'v1',
      access_token: process.env.PRINTING_KEY,
      shop_id: process.env.PRINTING_ID
    }
    const baseURL = `https://api.printify.com/${printifyOptions.version}/shops/${printifyOptions.shop_id}/orders.json`
    
    if (printifyOptions.access_token) {
      axios({
        method: 'post',
        baseURL: baseURL,
        headers: { 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Bearer ' + printifyOptions.access_token },
        data: JSON.stringify(printifyOrder)
      }).then(response => {
        console.log(response)
      });
    }

    // printifyAPI.Order.create(printifyOrder).then(result => {
    //   console.log(result)
    // });

    // db.collection("orders").add({
    //   details: data[0],
    //   paypal: data[1],
    //   items: data[2],
    //   subtotal: data[3],
    //   total: data[4],
    //   tax: data[5],
    //   status: data[6],
    //   date: date,
    //   timestamp: `${yyyy}${mm}${dd}${timeReversed}`,
    //   discount: state.discount
    // });
    // state.cart = [];
    // state.discount = null;

    // let emailCart = "<table border='1' cellspacing='0' cellpadding='5' style='border: none; border-collapse: collapse;'>";
    // emailCart = `${emailCart}<tr><td>Item</td><td>Description</td><td>Quantity</td><td>Price</td></tr>`;

    // state.order.items.forEach(item => {
    //   emailCart = `${emailCart}<tr><td>${item.name}</td><td>${item.description}</td><td>${item.quantity}</td><td>£${item.price}</td></tr>`;
    // });

    // emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Total</strong></td><td><strong>£${state.order.total}</strong></td></tr>`;
    // emailCart = emailCart + '</table>';


    // let emailShippingAddress = `<p>${state.order.details.address1}`;
    // if (state.order.details.address2 != '') emailShippingAddress = emailShippingAddress + ', '  + state.order.details.address2;
    // if (state.order.details.address3 != '') emailShippingAddress = emailShippingAddress + ', '  + state.order.details.address3;

    // emailShippingAddress = emailShippingAddress + '</p><p>' + state.order.details.city + ', ' + state.order.details.zipcode + '</p><p>' + state.order.details.state + ', United Kingdom</p>'

    // // Send email
    // let emailParams = {
    //   "send_to": state.order.details.email,
    //   "orderID": state.order.paypal.orderID,
    //   "firstName": state.order.details.firstName,
    //   "lastName": state.order.details.lastName,
    //   "address": emailShippingAddress,
    //   "cart": emailCart,
    //   "tax": state.order.tax,
    //   "subtotal": state.order.subtotal,
    //   "total": state.order.total
    // }

    // emailjs.send(emailserviceid, 'sofarsobad_processing', emailParams, emailuserid).then(function(){
    //   emailjs.send(emailserviceid, 'sofarsobad_order', emailParams, emailuserid);
    //   setTimeout(function() {
    //     fetch(`/­api/­orders.­php?AppId=${process.env.PRINTING_ID}&­Signature=­${process.env.PRINTING_KEY}`, {
    //       method: 'POST',
    //       redirect: 'follow',
    //       body: JSON.stringify(order)
    //     }).then(response => {
    //       console.log(response)
    //       self.app.router.push('/shop/checkout/complete');
    //     });
    //     //self.app.router.push('/shop/checkout/complete');
    //   }, 2000);
    // });
  }
}

export const actions = {
  authorize (context, data) {
    const self = this;
    db = firebase.firestore();

    db.collection("users").where("password", "==", md5(data[1])).where("email", "==", data[0]).get()
    .then(function(querySnapshot) {
      if(querySnapshot.size) {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          Toast.open({message: 'Witamy ' + data.name + '!', type: 'is-success'});
          context.commit('login');
        })
      } else {
        Toast.open({message: 'Zly email lub haslo. Sprobuj jeszcze raz.', type: 'is-danger'});
      }
    })
  },
}