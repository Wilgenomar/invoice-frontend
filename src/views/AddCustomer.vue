<template>
  <v-card>
    <v-row>
      <v-col cols="6" sm="6">
        <v-card class="ml-3">
          <v-card-title>Informacion basica</v-card-title>
          <v-card-text>
                <v-form ref="form" :v-model="valid">
                  <v-text-field
                    v-model="customer.name"
                    label="Identificacion"
                    placeholder="Numero de registro"
                    :rules="requireField"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.id_number"
                    label="Identificacion"
                    placeholder="Numero de registro"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.email"
                    label="Correo electronico"
                    placeholder="example@example.com"
                    :rules="emailRules"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.phone"
                    label="Telefono"
                    placeholder="123456"
                    :rules="requireField"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.website"
                    label="Website"
                    placeholder="www.example.com"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.address"
                    label="Direccion"
                    placeholder="Av example Carrera 1000"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.city"
                    label="Ciudad"
                    placeholder="Ciudad"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.state"
                    label="Departamento"
                    placeholder="Antioquia - Bolivar -"
                    outlined
                    dense
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="customer.postal_code"
                    label="Codigo postal"
                    placeholder="Codigo postal"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6" >
          <form-contact :contacts="contacts"/>
      </v-col>

    </v-row>

    <v-card-actions>
      <v-btn color="primary" @click="save" class="mt-5">Guardar</v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>
import axios from 'axios'
import FormContact from '../components/FormContact'
export default {
  name: 'AddCustomer',
  components: {
    FormContact
  },
  data () {
    return {
      requireField: [v => !!v || 'Campo obligatorio'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido'
      ],
      customer: {
        name: '',
        id_number: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        postal_code: ''
      },
      aux_customer: {
        id: '',
        name: '',
        id_number: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        postal_code: ''
      },
      contacts: [{
        customer_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }],
      valid: false
    }
  },
  methods: {
    save () {
      if (!this.$refs.form.validate()) {
        return
      }
      let custom = null
      axios.post('http://127.0.0.1:3000/customers', this.customer)
        .then((response) => {
          this.aux_customer = response.data
          custom = response.data.id
          console.log(response)
          this.customer.name = ''
          this.customer.id_number = ''
          this.customer.email = ''
          this.customer.phone = ''
          this.customer.website = ''
          this.customer.address = ''
          this.customer.city = ''
          this.customer.state = ''
          this.customer.postal_code = ''
        }).then(() => {
          this.addContact(custom)
        })
    },
    addContact (id) {
      for (var item in this.contacts) {
        this.contacts[item].customer_id = id
      }
      axios.post('http://127.0.0.1:3000/contacts', this.contacts)
        .then((response) => {
          console.log(response)
        })
      this.contacts = [{ first_name: '', last_name: '', email: '', phone: '', customer_id: '' }]
    }
  }
}
</script>
