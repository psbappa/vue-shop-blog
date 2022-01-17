<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Categories : {{ categoriesCount }}</h2>
        <v-data-table :headers="headers" :items="defaultCategories" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>All category</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Category </v-btn>
                        </template>

                        
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-card-text>
                                    <v-container>
                                        
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="formData.name"
                                                    v-model="formData.name" 
                                                    label="Category Name"
                                                    :rules="[() => !!formData.name || 'This field is required']"
                                                    required>
                                                </v-text-field>
                                            </v-col>
                                            <v-select
                                                v-model="productsAssign"
                                                :items="products"
                                                label="Favorite Fruits"
                                                multiple
                                                >
                                                <template v-slot:prepend-item>
                                                    <v-list-item
                                                    ripple
                                                    @mousedown.prevent
                                                    @click="toggle"
                                                    >
                                                    <v-list-item-action>
                                                        <v-icon :color="productsAssign.length > 0 ? 'indigo darken-4' : ''">
                                                        {{ icon }}
                                                        </v-icon>
                                                    </v-list-item-action>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                        Select All
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                    <v-divider class="mt-2"></v-divider>
                                                </template>
                                                <template v-slot:append-item>
                                                    <v-divider class="mb-2"></v-divider>
                                                    <v-list-item disabled>
                                                    <v-list-item-avatar color="grey lighten-3">
                                                        <v-icon>
                                                        mdi-food-apple
                                                        </v-icon>
                                                    </v-list-item-avatar>

                                                    <v-list-item-content v-if="likesAllFruit">
                                                        <v-list-item-title>
                                                        Holy smokes, someone call the fruit police!
                                                        </v-list-item-title>
                                                    </v-list-item-content>

                                                    <v-list-item-content v-else-if="likesSomeFruit">
                                                        <v-list-item-title>
                                                        Fruit Count
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>
                                                        {{ productsAssign.length }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>

                                                    <v-list-item-content v-else>
                                                        <v-list-item-title>
                                                        How could you not like fruit?
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>
                                                        Go ahead, make a selection above!
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </v-select>
                                            <!-- <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    ref="formData.name"
                                                    v-model="formData.name" 
                                                    label="Category Name"
                                                    :rules="[() => !!formData.name || 'This field is required']"
                                                    required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="8">
                                                <v-text-field
                                                    ref="formData.productsAssign"
                                                    v-model="formData.productsAssign"
                                                    label="Assign Products"
                                                    :rules="[() => !!formData.productsAssign || 'This field is required']"
                                                    required></v-text-field>
                                            </v-col> -->
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
                                    <v-btn 
                                        :disabled="!valid"
                                        color="blue darken-1" text @click="save" > Save category </v-btn>
                                </v-card-actions>
                            </v-form>
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
            defaultCategories: [],                 //this.$store.state.defaultCategories
            defaultProducts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
            },
            formData: {
                name: '',
            },
            products: [],
            productsAssign: [],
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New category' : 'Edit category'
            },

            categoriesCount() {
                return this.defaultCategories.length
            },

            form() {
                return {
                    name: this.formData.name
                }
            },
             likesAllFruit () {
                return this.productsAssign.length === this.products.length
            },
            likesSomeFruit () {
                return this.productsAssign.length > 0 && !this.likesAllFruit
            },
            icon () {
                if (this.likesAllFruit) return 'mdi-close-box'
                if (this.likesSomeFruit) return 'mdi-minus-box'
                return 'mdi-checkbox-blank-outline'
            },
        },

        mounted() {
            // this.$store.dispatch('GET_PRODUCTS')
            // this.initialize()

            axios.get('http://127.0.0.1:8000/api/categories').then(res => {
                this.defaultCategories = res.data['hydra:member']
            }).catch(e => {
                console.log(e)
            })

            axios.get('http://127.0.0.1:8000/api/products').then(res => {
                this.products = res.data['hydra:member']
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

            save () {
                if(this.$refs.form.validate()) {
                    this.valid = true
                    console.log('Data: ', this.formData)
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

            toggle () {
                this.$nextTick(() => {
                    if (this.likesAllFruit) {
                        this.productsAssign = []
                    } else {
                        this.productsAssign = this.products.slice()
                    }
                })
            },

            editItem (item) {
                this.editedIndex = this.defaultCategories.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            viewItem () {
                // console.log('Selected product is: ', item)
            },

            deleteItem (item) {
                this.editedIndex = this.defaultCategories.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.defaultCategories.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.formData)
                this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.formData)
                this.editedIndex = -1
                })
            },
        },
  }
</script>

<style scoped>

</style>