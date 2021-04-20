<template>
<v-card>
  <v-card-title>Clientes</v-card-title>
  <v-card-text>
    <v-btn color="primary" to="/customers/add">new client</v-btn>
    <v-data-table :headers="headers" :items="customers" :items-per-page="5" class="elevation-1 mt-5">
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
    axios.get('http://127.0.0.1:3000/customers')
      .then((response) => {
        this.customers = response.data
      })
  }
}
</script>
