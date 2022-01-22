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
                            
                            <v-col cols="12" class="container my-3">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <h1 class="mb-3">Upload Image</h1>
                                    </div>
                                    <div class="col-md-5 offset-md-1">
                                        <h5>1. Primary image</h5>
                                        <form>
                                            <div class="form-group">
                                            <label for="my-file">Select Image</label>
                                            <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">
                                        
                                            <div class="border p-2 mt-3">
                                                <p>Preview Here:</p>
                                                <template v-if="preview">
                                                    <v-img :src="preview" height="82px" width="115px"></v-img>
                                                    <!-- <img src="" class="img-fluid" />
                                                    <p class="mb-0">file name: </p>
                                                    <p class="mb-0">size: KB</p> -->
                                                </template>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                    
                                    <div class="col-md-5">
                                        <h5>2. Secondary Images</h5>
                                        <form>
                                            <div class="form-group">
                                                <label for="my-file">Select Image</label>
                                                <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage" class="form-control-file" id="my-file">
                                            
                                                <div class="border">
                                                    <template v-if="preview_list.length">
                                                        <p>Preview Here:</p>
                                                        <v-container>
                                                            <v-row no-gutters>
                                                                <v-col v-for="item, index in preview_list" :key="index" color="grey lighten-3" flat cols="12" md="4">
                                                                    <v-toolbar flat dense color="transparent" class="font-weight-bold">
                                                                        <!-- <v-col>
                                                                            <p class="mb-0">file name: {{ image_list[index].name }}</p>
                                                                            <p>size: {{ image_list[index].size/1024 }}KB</p>
                                                                        </v-col> -->
                                                                    </v-toolbar>
                                                                    <div class="header">
                                                                        <v-img :src="item" height="82px" width="115px"></v-img>
                                                                        <!-- <div class="btn-section">
                                                                            <div class="button right-btn"><a href="#"> Mark Primary </a></div>
                                                                        </div> -->
                                                                    </div>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </template>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    
                                    <div class="w-100"></div>
                                    <div class="col-12 mt-3 text-center">
                                        <p class="text-primary">* You should send data "image" & "image_list" via API to upload image files.</p>
                                        Reset input file <button @click="reset">Clear All</button>
                                    </div>
                                </div>

                                
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
                    category: '',
                    colors: '',
                },
                preview: null,
                image: null,
                preview_list: [],
                image_list: [],
                categories: [],
                colors: [],
            }
        },
        computed: {
            // form() {
            //     return {
            //         name: this.formData.name,
            //         brand: this.formData.brand,
            //         weight: this.formData.weight,
            //         price: this.formData.price,
            //         description: this.formData.description,
            //         stockQuantity: this.formData.stockQuantity,
            //         category: this.formData.category,
            //         colors: this.formData.colors,
            //     }
            // }
        },
        async mounted() {
            try{
                let categoryResponse = await axios.get('http://127.0.0.1:8000/api/categories')
                categoryResponse.data['hydra:member'].filter(item => {
                    this.categories.push(item['@id'])
                })

                let colorResponse = await axios.get('http://127.0.0.1:8000/api/colors')
                colorResponse.data['hydra:member'].filter(item => {
                    this.colors.push(item['@id'])
                })
            } catch(err) {
                console.log(err)
            }
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

            async save () {
                if(this.$refs.form.validate()) {
                    let currentObj = {
                        name: this.formData.name ? this.formData.name : '',
                        brand: this.formData.brand ? this.formData.brand : '',
                        weight: this.formData.weight ? parseFloat(this.formData.weight) : '',
                        price: this.formData.price ? parseInt(this.formData.price) : '',
                        description: this.formData.description ? this.formData.description : '',
                        stockQuantity: this.formData.stockQuantity ? parseInt(this.formData.stockQuantity) : '',
                        category: this.formData.category ? this.formData.category : '',
                        colors: this.formData.colors ? [this.formData.colors] : '',
                        files: this.formData.files != null ? this.formData.files : [],
                    }

                    console.log('currentObject: ', currentObj)

                    // let response = await axios.post('http://127.0.0.1:8000/api/products', currentObj)
                    // if(response.status === 201) {
                    //     this.$router.back()
                    // }
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
            },
            previewImage: function(event) {
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                    this.preview = e.target.result;
                    }
                    this.image=input.files[0];
                    reader.readAsDataURL(input.files[0]);
                }
            },
            previewMultiImage: function(event) {
                var input = event.target;
                var count = input.files.length;
                var index = 0;
                if (input.files) {
                    while(count --) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.preview_list.push(e.target.result);
                        }
                        this.image_list.push(input.files[index]);
                        reader.readAsDataURL(input.files[index]);
                        index ++;
                    }
                }
            },
            reset: function() {
                console.log('Reset!...')
                // this.image = null;
                // this.preview = null;
                // this.image_list = [];
                // this.preview_list = [];
            }
        },
    }
</script>

<style scoped>
    .header {
        position: relative;
        /* margin-top: 50px; */
        width: 250px;
        /* height: 300px; */
    }

    .header:hover {
        display: block;
        /*   background: rgba(0, 0, 0, .3); */
    }

    .button {
        position: absolute;
        /* width: 160px; */
        left:78px;
        top: 70px;
        text-align: center;
        opacity: 0;
        transition: opacity .35s ease;
    }

    .button a {
        width: 200px;
        padding: 4px 4px;
        text-align: center;
        color: white;
        border: solid 2px white;
        z-index: 1;
    }

    .header:hover .button {
        opacity: 1;
    }
</style>