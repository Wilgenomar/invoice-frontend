<template>
<v-row>
  <v-col cols="12">
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
            <v-icon small  @click="dialogDeleteItem(item)">
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
  </v-col>

    <v-dialog
      v-model="dialogDelete"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          ¿Desea eliminar este producto?
        </v-card-title>

        <v-card-text>
          Tenga en cuenta que si acepta eliminarlo, este producto sera eliminado de la base de datos y no podra recuperarlo.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="dialogDelete = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="pink"
            text
            @click="deleteItem(deletedItem)"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>

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
      dialogDelete: false,
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
      deletedItem: {}
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
          this.deletedItem = {}
          this.dialogDelete = false
        })
    },
    dialogDeleteItem (item) {
      this.dialogDelete = !this.dialogDelete
      this.deletedItem = item
    }
  }
}
</script>
