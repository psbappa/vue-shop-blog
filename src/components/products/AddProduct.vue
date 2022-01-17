<template>
    <div>
        <v-toolbar dark >
            <v-toolbar-title>Add New Product</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn color="primary" class="mb-2" @click="goBack"> Back </v-btn>
        </v-toolbar>
        
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                    ref="formData.name" 
                                    v-model="formData.name" 
                                    label="Product name"
                                    :rules="[() => !!formData.name || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()">
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    ref="formData.price"
                                    v-model="formData.price" 
                                    label="price"
                                    :rules="[() => !!formData.price || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()">
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    ref="formData.weight"
                                    v-model="formData.weight" 
                                    label="weight"
                                    :rules="[() => !!formData.weight || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    ref="formData.stockQuantity" 
                                    v-model="formData.stockQuantity" 
                                    label="stockQuantity"
                                    :rules="[() => !!formData.stockQuantity || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    ref="formData.brand" 
                                    v-model="formData.brand" 
                                    label="brand"
                                    :rules="[() => !!formData.brand || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()">
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="4">
                                <!-- <pre> {{ JSON.stringify(this.categories, null, 2) }}</pre> -->
                                <v-select 
                                    ref="formData.category"
                                    v-model="formData.category"
                                    :items="this.categories" 
                                    filled
                                    :rules="[() => !!formData.category || 'This field is required']"
                                    required
                                    background-color="cyan darken-2"
                                    label="category" 
                                    dense >
                                </v-select>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="4">
                                <v-select 
                                    ref="formData.colors"
                                    v-model="formData.colors"
                                    :items="this.colors" 
                                    filled
                                    :rules="[() => !!formData.colors || 'This field is required']"
                                    required
                                    background-color="cyan darken-2"
                                    label="colors" 
                                    dense >
                                </v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    ref="formData.description" 
                                    v-model="formData.description" 
                                    label="description"
                                    :rules="[() => !!formData.description || 'This field is required']"
                                    :error-messages="errorMessages"
                                    required
                                    solo-inverted
                                    background-color="cyan darken-2"
                                    @update:error="updateError()">
                                    </v-textarea>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-file-input
                                    ref="formData.files"
                                    accept="image/*"
                                    v-model="formData.files"
                                    label="File input"
                                    :error-messages="errorMessages"
                                    background-color="cyan darken-2"
                                    @update:error="updateError()"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider class="mt-5"></v-divider>

                <v-card-actions>
                    <v-btn text>Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip v-if="formHasErrors" left >
                            <v-btn icon class="my-0"  @click="resetForm" >
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                            <span>Refresh form</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn 
                        :disabled="!valid"
                        class="mr-4"
                        color="blue darken-1" text @click="save">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'AddProduct',
        data() {
            return {
                errorMessages: [],
                formHasErrors: false,
                valid: true,
                // editedIndex: -1,
                // editedItem: {
                //     name: '',
                //     brand: '',
                //     weight: '',
                //     price: '',
                //     description: '',
                //     stockQuantity: 0,
                //     imageFilename: '',
                //     category: '',
                //     colors: '',

                // },
                formData: {
                    name: '',
                    brand: '',
                    weight: '',
                    price: '',
                    description: '',
                    stockQuantity: '0',
                    imageFilename: '',
                    category: '',
                    colors: '',
                    files: [],
                },
                categories: [],
                colors: [],
            }
        },
        computed: {
            form() {
                return {
                    name: this.formData.name,
                    brand: this.formData.brand,
                    weight: this.formData.weight,
                    price: this.formData.price,
                    description: this.formData.description,
                    stockQuantity: this.formData.stockQuantity,
                    imageFilename: this.formData.imageFilename,
                    category: this.formData.category,
                    colors: this.formData.colors,
                }
            }
        },
        mounted() {
            // category fetch
            let productCategories = []
            axios.get('http://127.0.0.1:8000/api/categories').then(res => {
                this.categories = res.data['hydra:member']
                this.categories.filter(item => {
                    productCategories.push(item.name)
                    this.categories = productCategories
                })

            }).catch(e => {
                console.log('Something went wrong: ', e)
            })

            // color fetch
            let productColors = []
            axios.get('http://127.0.0.1:8000/api/colors').then(res => {
                this.colors = res.data['hydra:member']
                
                this.colors.filter(item => {
                    productColors.push(item.name)
                    this.colors = productColors
                    console.log('Colors: ', this.colors)
                })

            }).catch(e => {
                console.log('Something went wrong: ', e)
            })
        },
        watch: {
            name () {
                this.errorMessages = []
            }
        },
        methods: {
            goBack() {
                return this.$router.back()
            },

            save () {
                if(this.$refs.form.validate()) {
                    console.log('Data: ', this.formData)
                } else {
                    this.formHasErrors = true
                    console.log('Not valid')
                }
            },

            close () {
                console.log('close')
            },
            updateError() {
                // console.log('error');
            },
            resetForm() {
                console.log('Reset')
            }
        },
    }
</script>

<style scoped>

</style>