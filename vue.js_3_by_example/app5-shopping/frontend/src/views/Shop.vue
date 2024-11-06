<template>
    <h1>Shop</h1>
    <div>
        <router-link to="/order-form">Check out</router-link>
    </div>

    <button type="button" @click="clearCart()">Clear shopping cart</button>
    <p>{{ cartItemsAdded.length }} item(s) added to cart.</p>
    <div v-for="shopItem of shopItems" :key="shopItem.shop_item_id">
        <h2>{{ shopItem.name }}</h2>
        <p>Description: {{ shopItem.description }}</p>
        <p>Price: {{ shopItem.price }}</p>
        <img :src="shopItem.image_url" :alt="shopItem.name" />
        <br />
        <button type="button" @click="addCartItem(shopItem)">Add to card</button>
    </div>
</template>

<script>
 import { mapState, mapActions } from 'pinia'
 import { GraphQLClient, gql } from 'graphql-request'
 import { useCartStore } from '@/stores/cart'

 const APIURL = 'http://localhost:3000/graphql'
 const graphQLClient = new GraphQLClient(APIURL)

 export default {
     name: "Shop",
     data() {
         return {
             shopItems: []
         }
     },
     beforeMount() {
         this.getShopItems();
     },
     computed: {
         ...mapState(useCartStore, ['cartItemsAdded']),
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
             const { getShopItems: data } = await graphQLClient.request(query)
             this.shopItems = data
         },
         ...mapActions(useCartStore, ['addCartItem', 'clearCart']),
     }
 }
</script>
