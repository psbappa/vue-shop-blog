<template>
  <v-app id="inspire">
        <Header @handleDrawer="drawer = !drawer"/>
        <Sidebar :drawer="drawer"/>
        
        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  import Header from './components/templates/Header.vue'
  import Sidebar from './components/templates/Sidebar.vue'

  export default {
    components: {
      Header,
      Sidebar,
    },
    data: () => ({
      drawer: true
    }),
  }
</script>