<template>
    <div>
        <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" >
            <v-toolbar-title>
                <!-- <v-btn v-for="link in links" :key="link.id"> {{ link.menu }} </v-btn> -->
                <v-btn v-for="link in links" :key="link.id" @click="deleteData"> Delete </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <button @click="goBack">Back</button>
        </v-toolbar>

        <div class="product show">
            <div>
                <div class="d-block pa-2 accent-4">
                    <v-form v-model="valid">
                        <v-container>
                          <v-row>
                            <v-col cols="12" md="4" >
                              <v-text-field v-model="firstname" :rules="nameRules" :counter="12" label="First name" required ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="4" >
                              <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="4" >
                              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                </div>
                <div class="d-block pa-2">
                    <pre> {{ JSON.stringify(product, null, 2) }}</pre>
                </div>
              </div>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: 'ViewProduct',
        data: () => ({
            product: [],
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 12 || 'Name must be less than 12 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            links: [
                {id: 1, menu: 'Partial Delete'},
            ],
        }),
        methods: {
            goBack() {
                return this.$router.back()
            },
            // deleteItem() {
            //     const fetchedId = this.$route.params.id
            //     console.log('Delete: ', fetchedId)
            //     axios.delete(`http://127.0.0.1:8000/api/products/${fetchedId}`).then(res => {
            //         console.log('Successfully deleted!...')
            //     }).catch(e => {
            //         console.log(e)
            //     })
            // }

            deleteData: function() {
                const fetchedId = this.$route.params.id
                let isDeleted = axios.delete(`http://127.0.0.1:8000/api/products/${fetchedId}`)

                if(isDeleted) {
                    alert(`Product - ${fetchedId} deleted successfully`)
                } else {
                    alert('Something went wrong! Please try again...')
                }

                let products = axios.get(`http://127.0.0.1:8000/api/products`).then(res => {
                    this.defaultProducts = res.data['hydra:member']
                    const index = res.data['hydra:member'].findIndex(post => post.id === fetchedId) // find the post index
                    if (~index) // if the post exists in array
                        products.splice(index, 1) //delete the post
                }).catch(e => {
                    console.log(e)
                })
                
                this.goBack()
            },
        },
        mounted() {
            const fetchedId = this.$route.params.id
            axios.get(`http://127.0.0.1:8000/api/products/${fetchedId}`).then(res => {
                this.product = res.data
            }).catch(e => {
                console.log(e)
            })
        },
    }
</script>

<style scoped>

</style>