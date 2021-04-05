<template>
  <div class="section">
    <h2>Order #{{id}}</h2>
    <div class="columns" v-if="ordersLoaded">
      <div class="column is-half">
        <h3>Personal Details</h3>
        <div><strong>Full name: </strong>{{order.details.title}} {{order.details.firstName}} {{order.details.lastName}}</div>
        <div><strong>Company name: </strong>{{order.details.company}}</div>
        <div><strong>Email address: </strong>{{order.details.email}}</div>
        <div><strong>Phone number: </strong>{{order.details.phone}}</div>
      </div>

      <div class="column is-half">
        <h3>Postage Details</h3>
        <div><strong>Address: </strong>{{order.details.address1}} {{order.details.address2}} {{order.details.address3}}</div>
        <div><strong>City: </strong>{{order.details.city}}</div>
        <div><strong>Postcode: </strong>{{order.details.zipcode}}</div>
        <div><strong>Region: </strong>{{order.details.state}}</div>
        <div><strong>Country: </strong>GB</div>
      </div>

      <div class="column is-half">
        <h3>Payment Details</h3>
        <div><strong>PayPal Transaction ID: </strong>{{order.paypal.paymentID}}</div>
        <div><strong>Order Date: </strong>{{order.date}}</div>
        <!-- <div><strong>Cena brutto: </strong>${{order.subtotal}}</div> -->
        <!-- <div><strong>Podatek: </strong>${{order.tax}}</div> -->
        <div><strong>Price Paid: </strong>£{{order.total}}</div>
        <div><strong>Status: </strong><span class="tag" :class="statusType(order.status)" v-html="status(order.status)"></span></div>
        <div class="dispatcher" v-if="order.status !== 'dispatched'">
          <button class="button is-success" @click="dispatch">Mark As Dispatched</button>
        </div>
        <div class="dispatcher" v-else>
          <strong>Tracking number:</strong> {{ order.tracking ? order.tracking : null }}
        </div>
      </div>

      <div class="column is-half" v-if="order.discount">
        <h3>Discount Code</h3>
        <div><strong>Title: </strong>{{ discount.title }}</div>
        <div><strong>Code: </strong>{{ discount.code }}</div>
        <div><strong>Discount: </strong>{{ discount.discount }}%</div>
      </div>
    </div>

    <div class="columns" v-if="ordersLoaded">
      <div class="column">
        <h3>Order Details</h3>
        <b-table :data="order.items" :bordered="true" :striped="true" :narrowed="true">
          <b-table-column field="name" label="Product" id="name" v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="SKU" label="SKU" v-slot="props">
            {{ props.row.sku && props.row.sku !== 'undefined' ? props.row.sku : '' }}
          </b-table-column>
          <b-table-column field="description" label="Size" v-slot="props">
            <span v-html="props.row.description ? props.row.description : ''"></span>
          </b-table-column>
          <b-table-column field="quantity" label="Quantity" v-slot="props">
            {{ props.row.quantity ? props.row.quantity: '' }}
          </b-table-column>
          <b-table-column field="price" label="Price" v-slot="props">
            £{{ props.row.price }}
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  created() {
    this.$store.dispatch('getOrdersData');
  },
  computed: {
    discounts() {
      return this.$store.state.discounts;
    },
    discount() {
      let discount = this.discounts.filter(discount => discount.id === this.order.discount);
      discount = discount[0];

      return discount;
    },
    ordersLoaded() {
      let ordersLoaded = this.$store.state.ordersLoaded;
      return ordersLoaded;
    },
    id() {
      return this.$route.params.id;
    },
    order() {
      let order = this.$store.state.orders.filter(order => order.paypal.orderID === this.id)[0];
      return order;
    }
  },
  methods: {
    status: function(status) {
      let temp = status;

      switch (temp) {
        case 'abandoned':
          return 'Not Paid'
        case 'paid':
          return '<strong>Paid</strong>'
        case 'dispatched':
          return 'Dispatched'
      }
    },
    statusType: function(status) {
      let temp = status;

      switch (temp) {
        case 'abandoned':
          return 'is-danger'
        case 'paid':
          return 'is-warning'
        case 'dispatched':
          return 'is-success'
      }
    },
    dispatch() {
      this.$buefy.dialog.prompt({
        title: 'Are you sure?',
        message: 'This will send a confirmation email to the client with the dispatch information.',
        confirmText: 'Yes, dispatch order',
        type: 'is-warning',
        cancelText: 'Cancel',
        inputAttrs: {
          placeholder: 'Tracking number',
          maxlength: 50
        },
        hasIcon: true,
        onConfirm: (tracking) => {
          // Send email to customer
          let emailCart = "<table border='1' cellspacing='0' cellpadding='5' style='border: none; border-collapse: collapse;'>";
          emailCart = `${emailCart}<tr><td>Item</td><td>SKU</td><td>Description</td><td>Quantity</td><td>Price</td></tr>`;

          this.order.items.forEach(item => {
            emailCart = `${emailCart}<tr><td>${item.name}</td><td>${item.description}</td><td>${item.quantity}</td><td>£${item.price}</td></tr>`;
          });

          // emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Subtotal</strong></td><td><strong>$${this.order.subtotal}</strong></td></tr>`;
          // emailCart = `${emailCart}<tr><td style="border: none"></td><td style="border: none"></td><td><strong>Tax</strong></td><td><strong>$${this.order.tax}</strong></td></tr>`;
          emailCart = `${emailCart}<tr><td style="border: none"></td><td><strong>Total</strong></td><td><strong>£${this.order.total}</strong></td></tr>`;
          emailCart = emailCart + '</table>';

          let emailShippingAddress = `<p>${this.order.details.address1}`;
          if (this.order.details.address2 != '') emailShippingAddress = emailShippingAddress + ', '  + this.order.details.address2;
          if (this.order.details.address3 != '') emailShippingAddress = emailShippingAddress + ', '  + this.order.details.address3;

          emailShippingAddress = emailShippingAddress + '</p><p>' + this.order.details.city + ', ' + this.order.details.zipcode + '</p><p>' + this.order.details.state + ', United Kingdom</p>'

          this.$buefy.toast.open({message: 'Order dispatched!', type: 'is-success'});
          this.$store.commit('dispatchOrder', [this.order, emailCart, emailShippingAddress, tracking]);
          this.$router.push('/dashboard/orders');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    flex-wrap: wrap;

    .column {
      margin-top: 50px;
    }

    .dispatcher {
      margin-top: 25px;
    }
  }
</style>
