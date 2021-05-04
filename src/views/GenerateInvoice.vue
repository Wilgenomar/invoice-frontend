<template>
  <v-card >
    <v-card-title color="primary">Generar factura</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="select"
            :items="customers"
            outlined
            dense
            label="Seleccione un cliente"
            item-text="name"
            return-object
            :search-input.sync="searchCustomer"
          >
          </v-autocomplete>
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
              :min="minDate"
              :max="minDate"
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
              :min="minDate"
              :max="maxDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row v-if="!isObjEmpty(select)">
        <v-col cols="3">
            <p> <b>Cliente: </b> {{select.name | capitalizeWords}}</p>
            <p> <b>NIT: </b> {{select.id_number }}</p>
            <p> <b>Codigo postal: </b> {{select.postal_code }}</p>
        </v-col>
        <v-col cols="3">
            <p> <b>Email: </b>  {{select.email | lower }}</p>
            <p> <b>Telefono: </b> {{select.phone }}</p>
            <p> <b>Website: </b> {{select.website | lower }}</p>
        </v-col>
        <v-col cols="3" >
            <p> <b>Departamento: </b>  {{select.state | capitalize }}</p>
            <p> <b>Ciudad: </b> {{select.city | capitalizeWords }}</p>
            <p> <b>Direccion: </b> {{select.address | lower }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="d-flex align-end">
          <v-autocomplete
          v-model="selectProduct"
          :items="products"
          item-text="name"
          label="Seleccione un producto"
          :search-input.sync="searchProduct"
          return-object
          outlined
          dense
          @change="addToCart(selectProduct)"
          >
          </v-autocomplete>
        </v-col>
        <v-spacer></v-spacer>
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
        :headers="headers"
        :items="cart"
        :hide-default-footer="true"
        dense
      >
        <template v-slot:[`item.price`]="{item}">
          {{item.price | currency}}
        </template>
        <template v-slot:[`item.quantity`]="{ item }">
          <v-spacer></v-spacer>
          <v-text-field
            v-model="item.quantity"
            @input="updateItem(item)"
            type="number"
            reverse
            class="styled-input mt-3"
            dense
          >
          </v-text-field>
        </template>

        <template v-slot:[`item.discount`]="{ item }">
          <v-text-field
            v-model="item.discount"
            dense
            @input="updateItem(item)"
            type="number"
            reverse
            class="styled-input mt-3"
          >
          </v-text-field>
        </template>
        <template v-slot:[`item.iva`]="{item}">
          {{item.iva | currency}}
        </template>
        <template v-slot:[`item.subtotal`]="{item}">
          {{item.subtotal | currency}}
        </template>
        <template v-slot:[`item.action`]="{item}">
            <v-icon small @click="removeToCart(item)" >
              mdi-delete
            </v-icon>
          </template>
      </v-data-table>
    </v-card-text>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="3" class="mr-5 pr-16">
        <v-text-field
          suffix="Subtotal"
          :value="subtotal | currency"
          class="mr-5"
          prepend-icon="mdi-currency-usd"
          outlined
          reverse
          readonly
          dense
          full-width
        >
        </v-text-field>
        <v-text-field
          suffix="IVA"
          :value="iva | currency"
          class="mr-5"
          prepend-icon="mdi-currency-usd"
          outlined
          reverse
          readonly
          dense
          full-width
        >
        </v-text-field>
        <v-text-field
          suffix="Total"
          :value="total | currency"
          class="mr-5"
          prepend-icon="mdi-currency-usd"
          outlined
          reverse
          readonly
          dense
          full-width
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-card-actions class="d-flex justify-center align-center ma-5">
      <v-btn color="error" class="ma-2">Cancelar</v-btn>
      <v-btn color="success" class="ma-2">Facturar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import headers from '../config/headers-invoice-generate.json'
import axios from 'axios'
export default {
  data () {
    return {
      select: {},
      selectProduct: {},
      searchCustomer: '',
      searchProduct: '',
      customers: [],
      products: [],
      headers: headers,
      subtotal: 0,
      total: 0,
      iva: 0,
      insertProduct: {},
      totalProduct: 0,
      invoiceDate: new Date().toISOString().substr(0, 10),
      dueDate: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date(),
      menu2: false,
      menu: false
    }
  },
  filters: {
    currency (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    upper (value) {
      return value.toUpperCase()
    },
    capitalizeWords (value) {
      value.toString()
      return value.replace(/\b\w/g, l => l.toUpperCase())
    },
    capitalize (value) {
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    lower (value) {
      return value.toLowerCase()
    }
  },
  watch: {
    searchCustomer (val) {
      if (val) {
        if (val.length > 3) {
          this.getCustomers(val)
        }
      } else {
        this.customers = []
      }
    },
    searchProduct (val) {
      if (val) {
        if (val.length > 3) {
          this.getProducts(val)
        }
      } else {
        this.products = []
      }
    }
  },
  computed: mapState(['cart']),
  created () {
    this.getProducts()
    this.maxDate.setDate(this.maxDate.getDate() + 30)
    this.maxDate = new Date(this.maxDate).toISOString().substr(0, 10)
    console.log(this.maxDate)
    console.log(this.minDate)
  },
  mounted () {
  },
  methods: {
    getCustomers (select) {
      axios.get(`http://127.0.0.1:3000/customers/search?search_query=${select}`).then((response) => {
        this.customers = response.data
      })
    },
    isObjEmpty (obj) {
      return Object.keys(obj).length === 0
    },
    getProducts (selectProduct) {
      axios.get(`http://127.0.0.1:3000/products/search?search_query=${selectProduct}`).then((response) => {
        this.products = response.data
      })
    },
    addToCart (product) {
      if (product) {
        this.insertProduct = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseInt(product.price),
          quantity: 1,
          discount: 0,
          iva: parseFloat(product.price) * 0.19,
          ivaProduct: parseFloat(product.price) * 0.19,
          finalPrice: parseFloat(product.price) * 1.19,
          subtotal: parseInt(product.price) * 1.19
        }
        this.$store.dispatch('addToCart', this.insertProduct)
        this.calculateTotal()
      }
    },
    removeToCart (item) {
      this.$store.dispatch('removeToCart', item)
      this.calculateTotal()
    },
    updateItem (item) {
      this.$store.dispatch('updateItem', item)
      this.calculateTotal()
    },
    calculateTotal () {
      this.subtotal = 0
      this.iva = 0
      this.total = 0
      for (var key in this.cart) {
        this.iva += this.cart[key].iva
        this.total += this.cart[key].subtotal
      }
      this.subtotal = this.total - this.iva
    }
  }
}
</script>
