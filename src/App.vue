<template>
  <v-app id="inspire">
        <Header @handleDrawer="drawer = !drawer"/>
        <Sidebar :drawer="drawer"/>
        
        <v-main>
            <div class="py-8 px-6" fluid>
                <router-view />
            </div>
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