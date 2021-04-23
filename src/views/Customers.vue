<template>
<v-card>
  <v-card-title>Clientes</v-card-title>
  <v-card-text>
    <v-btn color="primary" to="/customers/add">new client</v-btn>
    <v-data-table :headers="headers" :items="customers" :items-per-page="5" class="elevation-1 mt-5">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small>
          mdi-pencil
        </v-icon>
        <v-icon small  @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-btn
        :to="{ name: 'CustomerDetails', params: { customerId: item.id , item} }"
        icon
        small
        >
        <v-icon
        small
        class="mr-2"
        >
        mdi-eye
        </v-icon>
        </v-btn>
    </template>
    </v-data-table>
  </v-card-text>
</v-card>
</template>

<script>
import axios from 'axios'
import headers from '../config/headers-customers'
export default {
  name: 'Customers',
  components: {
  },
  data () {
    return {
      customers: [],
      headers: headers
    }
  },
  created () {
    this.getCustomers()
  },
  methods: {
    getCustomers () {
      axios.get('http://127.0.0.1:3000/customers')
        .then((response) => {
          this.customers = response.data
        })
    },
    deleteItem (item) {
      axios.delete('http://127.0.0.1:3000/customers/' + item.id)
        .then((response) => {
          this.customers = response.data
        })
    }
  }
}
</script>
