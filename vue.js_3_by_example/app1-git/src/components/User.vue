<template>
    <h1>User info</h1>
    <p>
        <img :src="userData.avatar_url" id="avatar" />
        Username: {{ userData.login }} <br />
        Followers: {{ userData.followers }}
    </p>
</template>

<script>
 import { OctokitMixin } from '../mixins/OctokitMixin'

 export default {
     name: "User",
     data() {
         return {
             userData: {},
         };
     },
     mixins: [OctokitMixin],
     async mounted() {
         const octokit = this.createOctokitClient();
         const { data: userData } = await octokit.request("/user");
         this.userData = userData;
     },
     methods: {
         saveToken() {},
     },
 };
</script>
