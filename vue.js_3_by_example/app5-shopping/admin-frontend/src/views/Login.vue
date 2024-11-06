<template>
    <h1>Admin login</h1>
    <Form :validateSchema="schema" @submit="submitForm">
        <div>
            <label for="name">Username</label>
            <br />
            <Field name="username" type="text" placeholder="Username" />
            <ErrorMessage name="username" />
        </div>
        <br />
        <div>
            <label for="password">Password</label>
            <br />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
        </div>
        <input type="submit" />
    </Form>
</template>

<script>
 import { GraphQLClient, gql } from 'graphql-request'
 import { Form, Field, ErrorMessage } from "vee-validate"
 import * as yup from "yup"

 const APIURL = 'http://localhost:3000/graphql'
 const graphQLClient = new GraphQLClient(APIURL, {
     headers: {
         authorization: ""
     }
 })

 const schema = yup.object({
     name: yup.string().required(),
     password: yup.string().required()
 })

 export default {
     name: 'Login',
     components: {
         Form,
         Field,
         ErrorMessage
     },
     data() {
         return {
             schema,
         }
     },
     methods: {
         async submitForm({ username, password }) {
             const mutation = gql`
                 mutation login($username: String, $password: String) {
                     login(user: { username: $username, password: $password }) {
                         token
                     }
                 }
             `;
             const variables = { username, password };
             try {
                 const {
                     login: { token },
                 } = await graphQLClient.request(mutation, variables);
                 localStorage.setItem("token", token)
                 this.$router.push('/orders');
             } catch(err) {
                 alert('Login failed');
             }
         }
     }
 }
</script>
