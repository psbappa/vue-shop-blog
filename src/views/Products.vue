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
        <!-- <pre> {{ JSON.stringify(defaultProducts, null, 2) }}</pre> -->
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
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