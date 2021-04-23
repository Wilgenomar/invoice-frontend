<template>
<v-card>
  <v-card-text>
    <v-btn color="primary" to="/invoice/generate"
    >+ Factura</v-btn>
    <v-data-table
    :headers="headers"
    >
    </v-data-table>
  </v-card-text>
</v-card>
</template>

<script>
import headers from '../config/headers-invoices.json'
export default {
  name: 'Invoices',
  data () {
    return {
      headers: headers
    }
  },
  components: {
  }
}
</script>
