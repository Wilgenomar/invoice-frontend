<template>
  <v-card color="teal accent-3">
    <v-card-title color="primary">Generar factura</v-card-title>
    <v-card-text>
      <v-dialog v-model="dialog" width="500">
        <v-list rounded>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              outlined
              v-for="(item, i) in products"
              :key="i"
              @click="addProduct(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-dialog>
      <v-row>
        <v-col cols="6">
          <v-combobox
            v-model="select"
            label="Seleccione un cliente"
            :items="customers"
            item-text="name"
            outlined
            placeholder="Seleccione una empresa"
            dense
          ></v-combobox>
        </v-col>
        <v-col cols="1" flex>
          <h3 class="text-end">Descuento</h3>
        </v-col>
        <v-col cols="1">
          <v-text-field label="Descuento" type="number"  height="20px"> </v-text-field>
        </v-col>
      </v-row>
      <v-btn color="pink" dark top right fab @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="cart"
        :hide-default-footer="true"
        dense
      >
      <template v-slot:[`item.quantity`]="{ item }" v-slot:>
            <v-text-field v-model="item.quantity" dense @change="updateQuantity(item)"></v-text-field>
          </template>
          <template v-slot:[`item.discount`]="{ item }" v-slot:>
            <v-text-field v-model="item.discount" dense></v-text-field>
          </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import headers from '../config/headers-invoice-generate.json'
import axios from 'axios'
export default {
  data () {
    return {
      selectedItem: 1,
      select: {},
      cart: [],
      customers: [],
      products: [],
      headers: headers,
      headerss: [
        { text: 'Producto', value: 'name' },
        { text: 'Precio', value: 'price' }
      ],
      dialog: false,
      insertProduct: {}
    }
  },
  created () {
    this.getCustomers()
    this.getProducts()
  },
  methods: {
    getCustomers () {
      axios.get('http://127.0.0.1:3000/customers').then((response) => {
        this.customers = response.data
      })
    },
    getProducts () {
      axios.get('http://127.0.0.1:3000/products').then((response) => {
        this.products = response.data
      })
    },
    addProduct (product) {
      this.insertProduct = {
        name: product.name,
        price: parseInt(product.price),
        quantity: 1,
        discount: 0,
        totalProduct: parseInt(product.price)
      }
      this.cart.push(this.insertProduct)
      this.dialog = !this.dialog
    },
    updateQuantity (item) {
      item.totalProduct = item.quantity * item.price
    }
  }
}
</script>
