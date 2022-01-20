<template>
    <div class="py-8 px-6">
        <h2 class="text-center">Total Colors : {{ colorsCount }}</h2>
        <v-data-table :headers="headers" :items="defaultColors" sort-by="brand" class="elevation-1" >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>All Colors</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-spacer></v-spacer>
                    
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Color </v-btn>
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
                                                label="Color Name">
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
        <!-- <pre> {{ JSON.stringify(defaultColors, null, 2) }}</pre> -->
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
                // { text: 'ID (Colors)',align: 'start',sortable: true, value: 'id',},
                { text: 'Color Name (Products)',align: 'start',sortable: false,value: 'name',},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            defaultColors: [],
            editedIndex: -1,
            editedItem: {
                name: '',
            },
            defaultItem: {
                name: '',
            },
            
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Color' : 'Edit Color'
            },

            colorsCount() {
                return this.defaultColors.length
            },
            form() {
                return {
                    name: this.editedItem.name,
                }
            }
        },

        async mounted() {
            await axios.get('http://127.0.0.1:8000/api/colors').then(res => {
                this.defaultColors = res.data['hydra:member']
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
                // this.defaultColors = this.$store.state.products
                // this.defaultColors = [
                //     { name: 'Frozen Yogurt', brand: 159, fat: 6.0, carbs: 24, protein: 4.0},
                //     { name: 'Ice cream sandwich', brand: 237, fat: 9.0, carbs: 37, protein: 4.3},
                // ]

                // console.log('Test: ', this.$store.state.products)
            },

            editItem (item) {
                this.editedIndex = this.defaultColors.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            viewItem () {
                // console.log('Selected product is: ', item)
            },

            async deleteItem (item) {
                await axios.delete(`http://127.0.0.1:8000/api/colors/${item.id}`)
                    .then(data => {
                        if(data.status === 204) {
                            this.editedIndex = this.defaultColors.indexOf(item)
                            this.editedItem = Object.assign({}, item)
                            this.dialogDelete = true
                        }
                    })
            },

            deleteItemConfirm () {
                this.defaultColors.splice(this.editedIndex, 1)
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
                    console.log('Edited ID is: ', this.editedItem)
                    if(this.$refs.form.validate()) {
                        let currentObj = {
                            name: this.editedItem.name
                        }

                        let response = await axios.put(`http://127.0.0.1:8000/api/colors/${this.editedItem.id}`, currentObj)
                        
                        if(response.status === 200) {
                            Object.assign(this.defaultColors[this.editedIndex], this.editedItem)
                        }
                    } else {
                        this.formHasErrors = true
                        console.log('Not valid')
                    }
                } else {
                    console.log('Newly Added!...')
                    if(this.$refs.form.validate()) {
                        let currentObj = {
                            name: this.editedItem.name,
                            hexColor:"ff0000",
                        }

                        let response = await axios.post(`http://127.0.0.1:8000/api/colors`, currentObj)
                        if(response.status === 201) {
                            this.defaultColors.push(this.editedItem)
                        }
                    } else {
                        this.formHasErrors = true
                        console.log('Not valid')
                    }
                }
                this.close()
            },
        },
  }
</script>

<style scoped>

</style>