<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Categories : {{ categoriesCount }}</h2>
        <v-data-table :headers="headers" :items="defaultCategories" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>All category</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>
                    
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Category </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field
                                                ref="editedItem.name"
                                                v-model="editedItem.name"
                                                :rules="[() => !!editedItem.name || 'This field is required']"
                                                required
                                                label="Category Name">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
                                    <v-btn :disabled="!valid" color="blue darken-1" text @click="save" > Save </v-btn>
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
                    
                    </v-form>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <router-link :to="{ name: 'ViewProduct', params: { id: item.id } }" tag="button">
                    <v-icon small class="mr-2" @click="viewItem(item.id)" > mdi-eye </v-icon>
                </router-link>
                <v-icon small class="mr-2" @click="editItem(item)" > mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                No Data found!
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
        <!-- <pre> {{ JSON.stringify(defaultCategories, null, 2) }}</pre> -->
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            valid: true,
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'Category Name (Products)',align: 'start',sortable: false,value: 'name',},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            defaultCategories: [],
            editedIndex: -1,
            editedItem: {
                name: '',
            },
            defaultItem: {
                name: '',
            },

            products: [],
            defaultProducts: [],
            
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
            },

            categoriesCount() {
                return this.defaultCategories.length
            },
            form() {
                return {
                    name: this.editedItem.name,
                }
            }
        },

        async mounted() {
            // Category fetch
            await axios.get('http://127.0.0.1:8000/api/categories').then(res => {
                this.defaultCategories = res.data['hydra:member']
            }).catch(e => {
                console.log(e)
            })

            // Products fetch
            await axios.get('http://127.0.0.1:8000/api/products').then(res => {
                this.defaultProducts = res.data['hydra:member']
                this.defaultProducts.filter(item => {
                    // this.products.push({ productsUriId: item['@id'] , name: item.name })
                    this.products.push(item['@id'])
                })
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
                // this.defaultCategories = this.$store.state.products
                // this.defaultCategories = [
                //     { name: 'Frozen Yogurt', brand: 159, fat: 6.0, carbs: 24, protein: 4.0},
                //     { name: 'Ice cream sandwich', brand: 237, fat: 9.0, carbs: 37, protein: 4.3},
                // ]

                // console.log('Test: ', this.$store.state.products)
            },

            editItem (item) {
                this.editedIndex = this.defaultCategories.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            viewItem () {
                // console.log('Selected product is: ', item)
            },

            async deleteItem (item) {
                await axios.delete(`http://127.0.0.1:8000/api/categories/${item.id}`)
                    .then(data => {
                        if(data.status === 204) {
                            this.editedIndex = this.defaultCategories.indexOf(item)
                            this.editedItem = Object.assign({}, item)
                            this.dialogDelete = true
                        }
                    })
            },

            deleteItemConfirm () {
                this.defaultCategories.splice(this.editedIndex, 1)
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
                let selProducts = []
                if(this.$refs.form.validate()) {

                    let currentObj = {
                        name: this.editedItem.name,
                        products: selProducts,
                    }

                    axios.post('http://127.0.0.1:8000/api/categories', currentObj)
                        .then(function (response) {
                            console.log(response)
                        })
                        .catch(function (error) {
                            console.log(error.response.data)
                        });


                    
                } else {
                    this.formHasErrors = true
                    console.log('Not valid')
                }

                // if (this.editedIndex > -1) {
                //     Object.assign(this.defaultCategories[this.editedIndex], this.editedItem)
                // } else {
                //     this.defaultCategories.push(this.editedItem)
                // }
                // this.close()
            },
        },
  }
</script>

<style scoped>

</style>