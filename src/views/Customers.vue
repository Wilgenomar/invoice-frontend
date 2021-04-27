<template>
<v-row>
  <v-col cols="12">
    <v-card>
      <v-card-title>Clientes</v-card-title>
      <v-card-text>
        <v-btn color="primary" to="/customers/add">new client</v-btn>
        <v-data-table :headers="headers" :items="customers" :items-per-page="5" class="elevation-1 mt-5">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small>
              mdi-pencil
            </v-icon>
            <v-icon small  @click="dialogDeleteItem(item)">
              mdi-delete
            </v-icon>
            <v-btn
            :to="{ name: 'CustomerDetails', params: { customerId: item.id, item} }"
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
  </v-col>

    <v-dialog
      v-model="dialogDelete"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline text-center">
          ¿Desea eliminar este cliente?
        </v-card-title>

        <v-card-subtitle class="mt-1 text-center">
          Cliente: {{ customer.name }}
        </v-card-subtitle>

        <v-card-text>
          Recuerde que al eliminarlo se perderan todos los datos del cliente y todos los contactos asociados a el.
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
            @click="deleteItem(customer)"
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
import headers from '../config/headers-customers'
export default {
  name: 'Customers',
  components: {
  },
  data () {
    return {
      customers: [],
      headers: headers,
      customer: {},
      dialogDelete: false
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
          this.customer = {}
          this.dialogDelete = false
        })
    },
    dialogDeleteItem (item) {
      this.customer = item
      this.dialogDelete = !this.dialogDelete
    }
  }
}
</script>
