<template>
    <TopBar />
    <h1>Shop items</h1>
    <button @click="showDialog = true">Add item to shop</button>
    <div>
        <div v-for="shopItem of shopItems" :key="shopItem.shop_item_id">
            <h2>{{ shopItem.name }}</h2>
            <p>{{ shopItem.description }}</p>
            <imp :src="shopItem.image_url" :alt="shopItem.name" />
            <br />
            <button type="button" @click="deleteItem(shopItem)">
                Delete from shop
            </button>
        </div>
    </div>

    <dialog :open="showDialog">
        <h2>Add item to shop</h2>
        <Form :validateSchema="schema" @submit="submitForm">
            <div>
                <label for="name">Name</label>
                <br />
                <Field name="name" type="text" placeholder="Name" />
                <ErrorMessage name="name" />
            </div>

            <div>
                <label for="description">Description</label>
                <br />
                <Field name="description" type="text" placeholder="Description" />
                <ErrorMessage name="description" />
            </div>

            <div>
                <label for="imageUrl">Image URL</label>
                <br />
                <Field name="imageUrl" type="text" placeholder="Image URL" />
                <ErrorMessage name="imageUrl" />
            </div>

            <div>
                <label for="price">Price</label>
                <br />
                <Field name="price" type="text" placeholder="Price" />
                <ErrorMessage name="price" />
            </div>

            <br />
            <input type="submit" />
            <button type="button" @click="showDialog = false">Finish</button>
        </Form>
    </dialog>
</template>

<script>
 import TopBar from '@/components/TopBar.vue'
 import { GraphQLClient, gql } from 'graphql-request'
 import * as yup from "yup"
 import { Form, Field, ErrorMessage } from 'vee-validate'

 const APIURL = 'http://localhost:3000/graphql'
 const graphQLClient = new GraphQLClient(APIURL, {
   headers: {
       authorization: localStorage.getItem('token'),
   },
 });

 const schema = yup.object({
     name: yup.string().required(),
     description: yup.string().required(),
     imageUrl: yup.string().required(),
     price: yup.number().required().min(0),
 })

 export default {
     name: 'ShopItems',
     components: {
         TopBar,
         Form,
         Field,
         ErrorMessage
     },
     data() {
         return {
             shopItems: [],
             showDialog: false,
             schema,
         }
     },
     beforeMount() {
         this.getShopItems();
     },
     methods: {
         async getShopItems() {
             const query = gql`
                 {
                     getShopItems {
                         shop_item_id
                         name
                         description
                         image_url
                         price
                     }
                 }
             `;
             const { getShopItems: data } = await graphQLClient.request(query);
             this.shopItems = data;
         },
         async submitForm({ name, description, imageUrl, price: oldPrice }) {
             const mutation = gql`
                 mutation addShopItem(
                     $name: String
                     $description: String
                     $image_url: String
                     $price: Float
                 ) {
                     addShopItem(
                         shopItem: {
                             name: $name
                             description: $description
                             image_url: $image_url
                             price: $price
                         }
                     ) {
                         status
                     }
                 }
             `;
             const variables = {
                 name,
                 description,
                 image_url: imageUrl,
                 price: +oldPrice
             };
             await graphQLClient.request(mutation, variables);
             this.showDialog = false;
             await this.getShopItems();
         },
         async deleteItem({ shop_item_id: shopItemId }) {
             const mutation = gql`
                 mutation removeShopItem($shopItemId: Int) {
                     removeShopItem(shopItemId: $shopItemId) {
                         status
                     }
                 }
             `;
             const variables = { showItemId };
             await graphQLClient.request(mutation, variables);
             await this.getShopItems();
         }
     }
 }
</script>
