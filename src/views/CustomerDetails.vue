<template>
<v-row>
  <v-col cols="8">
    <v-card>
      <v-card-title> {{ item.name | upper }} </v-card-title>
      <v-card-subtitle>  {{item.id_number}} </v-card-subtitle>
      <v-card-text>
        <v-card>
          <v-card-title>Informacion</v-card-title>
          <v-card-text>
            <p>Email: {{item.email | lower}}</p>
            <p>Telefono: {{item.phone}}</p>
            <p>Website: {{item.website | lower}}</p>
            <p>Departamento: {{item.state | capitalize}}</p>
            <p>Ciudad: {{item.city | capitalizeWords}}</p>
            <p>Direccion: {{item.address | lower}}</p>
            <p>Codigo postal: {{item.postal_code}}</p>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-col>
  <v-col cols="4">
  </v-col>
  <v-row >
    <v-col cols="4" v-for="(contact, index) in contacts" :key="index">
      <v-card>
        <v-card-title> {{contact.first_name +' '+ contact.last_name | capitalizeWords}} </v-card-title>
          <v-card-subtitle>  {{ item.name | upper }} </v-card-subtitle>
            <v-card-text>
            <v-card>
            <v-card-text>
              <p>Email: {{contact.email | lower}}</p>
              <p>Telefono: {{contact.phone}}</p>

            </v-card-text>
            </v-card>
            </v-card-text>
             </v-card>
    </v-col>
  </v-row>
</v-row>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      contacts: [],
      aux_contacts: []
    }
  },
  filters: {
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
  created () {
    this.getContacts()
  },
  methods: {
    getContacts () {
      axios.get('http://127.0.0.1:3000/contacts')
        .then((response) => {
          this.aux_contacts = response.data
          for (var item in this.aux_contacts) {
            if (this.aux_contacts[item].customer_id === this.item.id) {
              this.contacts.push(this.aux_contacts[item])
            }
          }
        })
    }
  }
}
</script>
