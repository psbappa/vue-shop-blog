<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Products : {{ productsCount }}</h2>
        <v-data-table :headers="headers" :items="defaultProducts" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>defaultProducts Sections</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>
                    
                    <v-btn color="primary" dark class="mb-2">
                        <router-link :to="{ name: 'AddProduct' }" tag="button">
                            <v-icon small class="mr-2" > Add Product </v-icon>
                        </router-link>
                    </v-btn>

                    <v-dialog v-model="dialog" max-width="1000px">
                        <!-- <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Product </v-btn>
                        </template> -->
                        
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    ref="editedItem.name" 
                                                    v-model="editedItem.name" 
                                                    label="Product name"
                                                    :rules="[() => !!editedItem.name || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()">
                                                </v-text-field>
                                            </v-col>
                                            
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="editedItem.price"
                                                    v-model="editedItem.price" 
                                                    label="price"
                                                    :rules="[() => !!editedItem.price || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()">
                                                </v-text-field>
                                            </v-col>
                                            
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="editedItem.weight"
                                                    v-model="editedItem.weight" 
                                                    label="weight"
                                                    :rules="[() => !!editedItem.weight || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="editedItem.stockQuantity" 
                                                    v-model="editedItem.stockQuantity" 
                                                    label="stockQuantity"
                                                    :rules="[() => !!editedItem.stockQuantity || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()">
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="editedItem.brand" 
                                                    v-model="editedItem.brand" 
                                                    label="brand"
                                                    :rules="[() => !!editedItem.brand || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()">
                                                </v-text-field>
                                            </v-col>
                                            
                                            <v-col cols="12" sm="6" md="4">
                                                <!-- <pre> {{ JSON.stringify(editedItem.category, null, 2) }}</pre> -->
                                                <!-- <v-select 
                                                    ref="formData.category"
                                                    v-model="editedItem.category"
                                                    :item = "editedItem.category"
                                                    filled
                                                    :rules="[() => !!editedItem.category || 'This field is required']"
                                                    required
                                                    background-color="cyan darken-2"
                                                    label="category" 
                                                    dense >
                                                </v-select> -->
                                            </v-col>
                                            
                                            <v-col cols="12" sm="6" md="4">
                                                <!-- <v-select 
                                                    ref="editedItem.colors"
                                                    v-model="editedItem.colors"
                                                    filled
                                                    background-color="cyan darken-2"
                                                    label="colors" 
                                                    dense >
                                                </v-select> -->
                                            </v-col>

                                            <v-col cols="12">
                                                <v-textarea
                                                    ref="editedItem.description" 
                                                    v-model="editedItem.description" 
                                                    label="description"
                                                    :rules="[() => !!editedItem.description || 'This field is required']"
                                                    :error-messages="errorMessages"
                                                    required
                                                    solo-inverted
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()">
                                                    </v-textarea>
                                            </v-col>
                                            
                                            <v-col cols="12">
                                                <v-file-input
                                                    ref="editedItem.files"
                                                    accept="image/*"
                                                    v-model="editedItem.files"
                                                    label="File input"
                                                    :error-messages="errorMessages"
                                                    background-color="cyan darken-2"
                                                    @update:error="updateError()"
                                                ></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
                                    <v-btn :disabled="!valid" color="blue darken-1" text @click="save" > Save popup </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
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
            errorMessages: [],
            valid: true,
            headers: [
                { text: 'Id (Products)',align: 'start',sortable: true,value: 'id',},
                { text: 'Name (Products)',align: 'start',sortable: false,value: 'name',},
                { text: 'brand', value: 'brand' },
                { text: 'Stock Quantity', value: 'stockQuantity' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            defaultProducts: [],                 //this.$store.state.defaultProducts
            products: [],
            editedIndex: -1,
            editedItem: {
                name: '',       //
                description: '',
                brand: 0,
                weight: '',
                price: '',
                imageFilename: [],
                // category: '',
                // colors: [],
                stockQuantity: ''
            },
            defaultItem: {
                name: '',
                description: '',
                brand: 0,
                weight: '',
                price: '',
                imageFilename: [],
                // category: '',
                // colors: [],
                stockQuantity: ''
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Product'
            },

            productsCount() {
                return this.defaultProducts.length
            },

            form() {
                return {
                    name: this.editedItem.name,
                    brand: this.editedItem.brand,
                    weight: this.editedItem.weight,
                    price: this.editedItem.price,
                    description: this.editedItem.description,
                    stockQuantity: this.editedItem.stockQuantity,
                    imageFilename: this.editedItem.imageFilename,
                    // category: this.editedItem.category,
                    // colors: this.editedItem.colors,
                }
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

            async save () {
                if (this.editedIndex > -1) {
                    if(this.$refs.form.validate()) {
                        try{
                            console.log(this.editedItem)

                            let response = await axios.put(`http://127.0.0.1:8000/api/products/${this.editedItem.id}`, this.editedItem)
                            
                            if(response.status === 200) {
                                Object.assign(this.defaultProducts[this.editedIndex], this.editedItem)
                            }
                        }catch(err) {
                            console.log(err.response.data)
                        }
                    } else {
                        console.log('Something went wrong...')
                    }
                } else {
                    // Enabled push if also add using modal
                    // console.log('Newly added...')
                    // this.defaultProducts.push(this.editedItem)
                }
                this.close()
            },

            updateError() {
                console.log()
            }
        },
  }
</script>

<style scoped>

</style>




















<!--
products.vue

<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Products : {{ productsCount }}</h2>
        <v-data-table :headers="headers" :items="defaultProducts" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>defaultProducts Sections</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>

                    
                    <v-btn color="primary" dark class="mb-2">
                        <router-link :to="{ name: 'AddProduct' }" tag="button">
                            <v-icon small class="mr-2" > Add Product </v-icon>
                        </router-link>
                    </v-btn>

                    <v-dialog v-model="dialog" max-width="1000px">
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
                <v-icon disabled small class="mr-2" @click="editItem(item)" > mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                No Data found!
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'Id (Products)',align: 'start',sortable: true,value: 'id',},
                { text: 'Name (Products)',align: 'start',sortable: false,value: 'name',},
                { text: 'Brand', value: 'brand' },
                { text: 'Stock Quantity', value: 'stockQuantity' },
                // { text: 'Status' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            defaultProducts: [],                 //this.$store.state.defaultProducts
            products: [],
        }),

        computed: {
            productsCount() {
                return this.defaultProducts.length
            }
        },

        async mounted() {
            try{
                 // this.$store.dispatch('GET_PRODUCTS')
                // this.initialize()

                let response = await axios.get('http://127.0.0.1:8000/api/products')
                this.defaultProducts = response.data['hydra:member']
            } catch(err) {
                console.log(err)
            }
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

            async deleteItem (item) {
                await axios.delete(`http://127.0.0.1:8000/api/products/${item.id}`)
                .then(data => {
                        if(data.status === 204) {
                            this.editedIndex = this.defaultProducts.indexOf(item)
                            this.editedItem = Object.assign({}, item)
                            this.dialogDelete = true
                        }
                    })
            },

            deleteItemConfirm () {
                this.defaultProducts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },
        },
  }
</script>

<style scoped>

</style>
-->