<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Products : {{ productsCount }}</h2>
        <v-data-table :headers="headers" :items="defaultProducts" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>defaultProducts Sections</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Product </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="Name name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.brand" label="brand"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
                                <v-btn color="blue darken-1" text @click="save" > Save </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <router-link :to="{ name: 'ViewProduct', params: { id: item.id } }" tag="button">
                    <v-icon small class="mr-2" @click="viewItem(item.id)" > mdi-eye </v-icon>
                </router-link>
                <v-icon small class="mr-2" @click="editItem(item)" > mdi-pencil </v-icon>
                <v-icon disabled small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                No Data found!
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
        <pre> {{ JSON.stringify(defaultProducts, null, 2) }}</pre>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'Id (Products)',align: 'start',sortable: false,value: 'id',},
                { text: 'Name (Products)',align: 'start',sortable: false,value: 'name',},
                { text: 'brand', value: 'brand' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            defaultProducts: [],                 //this.$store.state.defaultProducts
            products: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                brand: 0,
            },
            defaultItem: {
                name: '',
                brand: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Product'
            },

            productsCount() {
                return this.defaultProducts.length
            }
        },

        mounted() {
            // this.$store.dispatch('GET_PRODUCTS')
            // this.initialize()

            axios.get('http://127.0.0.1:8000/api/products').then(res => {
                this.defaultProducts = res.data['hydra:member']
            }).catch(e => {
                console.log(e)
            })
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        methods: {
            initialize () {
                // this.defaultProducts = this.$store.state.products
                // this.defaultProducts = [
                //     { name: 'Frozen Yogurt', brand: 159, fat: 6.0, carbs: 24, protein: 4.0},
                //     { name: 'Ice cream sandwich', brand: 237, fat: 9.0, carbs: 37, protein: 4.3},
                // ]

                // console.log('Test: ', this.$store.state.products)
            },

            editItem (item) {
                this.editedIndex = this.defaultProducts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            viewItem () {
                // console.log('Selected product is: ', item)
            },

            deleteItem (item) {
                this.editedIndex = this.defaultProducts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.defaultProducts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.defaultProducts[this.editedIndex], this.editedItem)
                } else {
                    this.defaultProducts.push(this.editedItem)
                }
                this.close()
            },
        },
  }
</script>

<style scoped>

</style>