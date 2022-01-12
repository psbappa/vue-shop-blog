<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-img src="https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg" class="pa-4">
          <div class="text-center mt-4">
              <v-avatar class="mb-4" color="grey-darken-1" size="64">
                  <v-img aspect-ratio="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADr-3PrecoVO1hoAmq1qUaXmfmPNM30r2Nw&usqp=CAU"></v-img>
              </v-avatar>
              <h4 class="white-text">Bappa Dey</h4>
          </div>
      </v-img>
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
      </v-sheet>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          router :to="link.route"
        >
        <!-- <pre> {{ JSON.stringify(item, null, 2) }}</pre> -->
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Sidebar',
        props: ['drawer'],
        data() {
            return {
                links: [
                  {icon: 'mdi-inbox-arrow-down', text: 'Dashboard', route: '/'},
                  {icon: 'mdi-send', text: 'Profile', route: '/profile'},
                  {icon: 'mdi-delete', text: 'Products', route: '/products'},
                  {icon: 'mdi-alert-octagon', text: 'Orders', route: '/orders'},
                  {icon: 'mdi-inbox-arrow-up', text: 'System Settings', route: '/settings'},
                ]

                // links: [
                //     ['mdi-inbox-arrow-down', 'Dashboard'],
                //     ['mdi-send', 'Profile'],
                //     ['mdi-delete', 'Products'],
                //     ['mdi-alert-octagon', 'Orders'],
                //     ['mdi-inbox-arrow-up', 'System Settings'],
                // ],
            }
        }
    }
</script>

<style scoped>

</style>