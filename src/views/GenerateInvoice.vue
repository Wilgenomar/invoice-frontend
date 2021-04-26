<template>
  <v-card >
    <v-card-title color="primary">Generar factura</v-card-title>
    <v-card-text>
      <v-dialog v-model="dialog" width="500">
        <v-list rounded>
          <v-subheader>Seleccione un producto</v-subheader>
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
        <v-col cols="4">
          <v-combobox
            v-model="select"
            label="Seleccione un cliente"
            :items="customers"
            item-text="name"
            outlined
            dense
            placeholder="Seleccione una empresa"
          >
          </v-combobox>
        </v-col>
        <v-col cols="2">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="invoiceDate"
                label="Fecha de facturación"
                prepend-icon="mdi-calendar"
                outlined
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="invoiceDate"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dueDate"
                label="Fecha de vencimiento"
                prepend-icon="mdi-calendar"
                outlined
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dueDate"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="pink" dark top right fab @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-text-field
            label="Descuento"
            dense
            reverse
            outlined
            value="0"
            type="number"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="cart"
        :hide-default-footer="true"
        dense
      >
        <template v-slot:[`item.quantity`]="{ item }" v-slot:>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="item.quantity"
            dense
            @input="updateQuantity(item)"
            type="number"
            reverse
            class="styled-input mt-3"
          >
          </v-text-field>
        </template>

        <template v-slot:[`item.discount`]="{ item }" v-slot:>
          <v-text-field
            v-model="item.discount"
            dense
            @input="updateDiscount(item)"
            type="number"
            reverse
            class="styled-input mt-3"
          >
          </v-text-field>
        </template>
      </v-data-table>
    </v-card-text>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2" class="mr-4">
        <v-text-field
        suffix="Subtotal"
        v-model="subtotal"
        reverse
        prepend-icon="mdi-currency-usd"
        readonly dense
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2" class="mr-4">
        <v-text-field
        suffix="Descuento"
        v-model="subtotal"
        reverse
        prepend-icon="mdi-currency-usd"
        readonly dense
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2" class="mr-4">
        <v-text-field
        suffix="IVA"
        v-model="subtotal"
        reverse
        prepend-icon="mdi-currency-usd"
        readonly
        dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2" class="mr-4">
        <v-text-field
        suffix="Total"
        v-model="subtotal"
        reverse
        prepend-icon="mdi-currency-usd"
        readonly dense ></v-text-field>
      </v-col>
    </v-row>
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
      subtotal: 0,
      dialog: false,
      insertProduct: {},
      totalProduct: 0,
      invoiceDate: new Date().toISOString().substr(0, 10),
      dueDate: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu: false
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
      this.totalProduct = this.insertProduct.totalProduct
      this.cart.push(this.insertProduct)
      this.dialog = !this.dialog
      this.calculateSubtotal()
    },
    updateQuantity (item) {
      item.totalProduct = item.quantity * item.price
      this.totalProduct = item.totalProduct
      this.updateDiscount(item)
    },
    updateDiscount (item) {
      const descuento = (item.price * item.discount) / 100
      item.totalProduct = this.totalProduct - descuento * item.quantity
      this.calculateSubtotal()
    },
    calculateSubtotal () {
      this.subtotal = 0
      for (const key in this.cart) {
        this.subtotal = this.subtotal + this.cart[key].totalProduct
      }
    }
  }
}
</script>
