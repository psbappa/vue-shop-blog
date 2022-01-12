<template>
    <v-app-bar app
      color="white"
      elevate-on-scroll
      elevation="4"
    >
    <v-app-bar-nav-icon @click="$emit('handleDrawer')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" col="12">
        <v-form class="mt-5">
            <v-text-field rounded outline dense placeholder="search here..." append-icon="mdi-magnify"/>
        </v-form>
    </v-col>
    <v-spacer />

    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
          <v-badge content="3" color="red" offset-y="10" offset-x="10">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADr-3PrecoVO1hoAmq1qUaXmfmPNM30r2Nw&usqp=CAU" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">Bappa Dey</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADr-3PrecoVO1hoAmq1qUaXmfmPNM30r2Nw&usqp=CAU" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Bappa Dey</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-app-bar>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                menus: [
                    {title: "Profile", icon: 'mdi-account'},
                    {title: "Change password", icon: 'mdi-key'},
                    {title: "Setting", icon: 'mdi-cog'},
                    {title: "Logout", icon: 'mdi-logout'},
                ],
                items: [
                        { header: 'Today' },
                        {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Brunch this weekend?',
                        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                        },
                        { divider: true, inset: true },
                        {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                        },
                        { divider: true, inset: true },
                        {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Oui oui',
                        subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                        }
                    ],
            }
        }
    }
</script>

<style scoped>

</style>