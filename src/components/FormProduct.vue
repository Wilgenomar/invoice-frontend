<template>
  <v-dialog
      :value="dialog"
      persistent
      max-width="600px"
      @input="$emit('input')"
      @keydown.esc="$emit('close')"
    >
      <v-card>
        <v-card-title>Producto</v-card-title>
          <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="8">
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model="product.name"
                      label="Nombre"
                      :rules="rulesName"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="product.description"
                      label="Descripcion"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="product.price"
                      label="Precio"
                      type="number"
                      placeholder="Solo numeros"
                      :rules="rulesName"
                      outlined
                    ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="$emit('close')">
              Close
            </v-btn>
            <v-btn color="primary" @click="saveProduct">Guardar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormProduct',
  props: {
    dialog: {
      type: Boolean
    },
    product: {
      type: Object
    },
    mode: {
      type: String
    },
    getProducts: {
      function () {
      }
    }
  },
  data () {
    return {
      rulesName: [v => !!v || 'Campo obligatorio'],
      valid: false
    }
  },
  methods: {
    close () {
      this.$emit('input')
      this.product.name = ''
      this.product.description = ''
      this.product.price = 0
    },
    open () {
      this.dialog = true
    },
    addProduct () {
      if (!this.$refs.form.validate()) {
        return
      }
      axios.post('http://127.0.0.1:3000/products', this.product)
        .then((response) => {
          console.log(response)
          this.product.name = ''
          this.product.description = ''
          this.product.price = 0
          this.close()
          this.$emit('saveSuccess', true)
          this.getProducts()
        })
    },
    updateProduct () {
      if (!this.$refs.form.validate()) {
        return
      }
      axios.put('http://127.0.0.1:3000/products/' + this.product.id, this.product)
        .then((response) => {
          if (response.status === 200) {
            this.product.name = ''
            this.product.description = ''
            this.product.price = 0
            this.close()
            this.$emit('saveSuccess', true)
            this.getProducts()
          }
        })
    },
    saveProduct () {
      if (this.mode === 'update') {
        this.updateProduct()
      } else {
        this.addProduct()
      }
    }
  }
}
</script>
