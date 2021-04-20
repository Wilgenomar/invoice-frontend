<template>
  <v-card>
    <v-card-title>Productos</v-card-title>
    <v-card-text>
        <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="5"
        class="elevation-1">

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item)" >
              mdi-pencil
            </v-icon>
            <v-icon small  @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>

    </v-card-text>

    <form-product
    v-model="dialog"
    :getProducts="getProducts"
    :mode="mode" :product="product"
    :dialog="dialog"
    @close="dialog = false"
    @saveSuccess="showMessage" ></form-product>

    <v-snackbar
    v-model="snackbar"
    :timeout="timeout">
      {{ message }}

      <template v-slot:action="{ attrs }">

        <v-btn
        color="green"
        v-bind="attrs"
        @click="snackbar = false">Close</v-btn>

      </template>

    </v-snackbar>

    <v-btn
    bottom
    color="pink"
    dark
    fab
    fixed
    right
    @click="addProduct">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import axios from 'axios'
import headers from '../config/headers-products'
import FormProduct from '../components/FormProduct.vue'
export default {
  name: 'App',
  components: {
    FormProduct
  },
  data () {
    return {
      products: [],
      headers: headers,
      dialog: false,
      check: false,
      mode: '',
      snackbar: false,
      message: '',
      timeout: 2000,
      product: {
        name: '',
        description: '',
        price: 0
      },
      deletedItem: {
        name: '',
        description: '',
        price: 0
      }
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      axios.get('http://127.0.0.1:3000/products')
        .then((response) => {
          this.products = response.data
        })
    },
    addProduct () {
      this.mode = 'create'
      this.dialog = true
      this.subject = { id: '', name: '', description: '', price: '' }
    },
    editProduct (product) {
      this.mode = 'update'
      this.product = product
      this.dialog = true
    },
    showMessage (success) {
      if (success) {
        this.dialog = false
        this.snackbar = true
        this.message = 'Producto agregado'
      }
    },
    deleteItem (item) {
      this.deletedIndex = item
      axios.delete('http://127.0.0.1:3000/products/' + this.deletedIndex.id)
        .then((response) => {
          this.products = response.data
        })
    }
  }
}
</script>
