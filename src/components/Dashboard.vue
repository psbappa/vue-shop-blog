<template>
    <div class="py-8 px-6 admin-dashboard">
        <v-row no-gutters>
            <template v-for="n in 4">
              <v-col :key="n">
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  Column
                </v-card>
              </v-col>
              <v-responsive
                v-if="n === 2"
                :key="`width-${n}`"
                width="100%"
              ></v-responsive>
            </template>
          </v-row>
        <v-row>
            <v-col v-for="card in cards" :key="card" cols="12">
                <v-card>
                    <v-subheader>{{ card }}</v-subheader>

                    <v-list two-line>
                    <template v-for="n in 6">
                        <v-list-item

                        :key="n"
                        >
                        <v-list-item-avatar color="grey darken-1">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Message {{ n }}</v-list-item-title>

                            <v-list-item-subtitle>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>

                        <v-divider
                        v-if="n !== 6"
                        :key="`divider-${n}`"
                        inset
                        ></v-divider>
                    </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    

    export default {
        name: 'Dashboard',
        components: {
            
        },
        data: () => ({
            cards: ['Today', 'Yesterday']
        }),
    }
</script>

<style scoped>

</style>