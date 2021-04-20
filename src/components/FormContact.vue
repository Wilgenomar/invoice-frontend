<template>
<v-card class="mr-3">
  <v-card-text>
    <v-row v-for="(contact, index) in contacts" :key="index" >
      <v-col >
        <v-card elevation="2" class="mr-3">
          <v-card-title>Contacto</v-card-title>
        <v-form>
            <v-card-text>
              <v-text-field v-model="contact.first_name" label="Nombres" dense> </v-text-field>
              <v-text-field v-model="contact.last_name" label="Apellidos" dense> </v-text-field>
              <v-text-field v-model="contact.email" label="Correo elextronico" dense> </v-text-field>
              <v-text-field v-model="contact.phone" label="Telefono" dense> </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="contacts.length>1" color="pink lighten-1" plain @click="removeContact(index)">Quitar</v-btn>
            </v-card-actions>
        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
      <v-btn class="mt-5"   elevation="2" outlined color="teal accent-3" @click="addContact">Agregar contacto</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: 'FormContact',
  props: {
    contacts: {
      type: Array
    }
  },
  data () {
    return {
      contact: {
        customer_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    addContact () {
      this.contacts.push({
        customer_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      })
    },
    removeContact (index) {
      this.contacts.splice(index, 1)
    }
  }
}
</script>
