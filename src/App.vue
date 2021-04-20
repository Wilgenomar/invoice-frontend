<template>
  <v-app>
    <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" color="teal accent-3" dark app>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path" >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-1">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" color="teal accent-3" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn :to="'/'"  plain>Wilgen Invoices</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    </v-app>
  </v-app>
</template>

<script>
import items from './config/items'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      items: items,
      drawer: null,
      dialog: false
    }
  }
}
</script>
