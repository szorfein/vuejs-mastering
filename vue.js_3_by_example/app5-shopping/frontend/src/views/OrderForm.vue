<template>
    <router-link to='/'>Back</router-link>

    <h1>Order form</h1>
    <div v-for="(cartItem, index) of cartItemsAdded" :key="cartItem.cartItemId">
        <h2>{{ cartItem.name }}</h2>
        <p>Description: {{ cartItem.description }}</p>
        <p>Price: ${{ cartItem.price }}</p>
        <br />
        <button type="button" @click="removeCartItem(index)">Remove from cart</button>
    </div>
    <Form :validationSchema="schema" @submit="submitOrder">
        <div>
            <label for="name">Name</label>
            <br />
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />
        </div>
        <div>
            <label for="phone">Phone</label>
            <br />
            <Field name="phone" type="text" placeholder="Phone number" />
            <ErrorMessage name="phone" />
        </div>
        <div>
            <label for="address">Address</label>
            <br />
            <Field name="address" type="text" placeholder="Address" />
            <ErrorMessage name="address" />
        </div>
        <br />
        <input type="submit" />
    </Form>
</template>

<script>
 import { mapState, mapActions } from 'pinia'
 import { useCartStore } from '@/stores/cart'
 import { Form, Field, ErrorMessage } from 'vee-validate'
 import * as yup from 'yup'
 import { GraphQLClient, gql } from 'graphql-request'

 const APIURL = 'http://localhost:3000/graphql'
 const graphQLClient = new GraphQLClient(APIURL)

 const schema = yup.object({
     name: yup.string().required(),
     phone: yup.string().required(),
     address: yup.string().required()
 })

 export default {
     name: 'OrderForm',
     data() {
         return {
             schema
         }
     },
     components: {
         Form,
         Field,
         ErrorMessage
     },
     computed: {
         ...mapState(useCartStore, ['cartItemsAdded'])
     },
     methods: {
         async submitOrder({ name, phone, address }) {
             const mutation = gql`
                 mutation addOrder (
                     $name: String
                     $phone: String
                     $address: String
                     $ordered_items: [ShopItem]
                 ) {
                     addOrder(
                         order: {
                             name: $name
                             phone: $phone
                             address: $address
                             ordered_items: $ordered_items
                         }
                     ) {
                         status
                     }
                 }
             `;
             const variables = {
                 name,
                 phone,
                 address,
                 ordered_items: this.cartItemsAdded.map(
                     ({ shop_item_id, name, description, image_url, price }) => ({
                         shop_item_id,
                         name,
                         description,
                         image_url,
                         price
                     })
                 )
             };
             await graphQLClient.request(mutation, variables);
             this.clearCart();
             this.$router.push('/success');
         },
         ...mapActions(useCartStore, ['addCartItem', 'removeCartItem', 'clearCart'])
     }
 }
</script>
