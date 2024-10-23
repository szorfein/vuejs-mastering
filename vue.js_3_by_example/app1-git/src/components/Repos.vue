<template>
    <h1>User repos</h1>
    <div v-for="r of repos" :key="r.id">
        <h2>{{ r.owner.login }}/{{ r.name }}</h2>
        <RepoIssues :owner="r.owner.login" :repo="r.name" />
    </div>
</template>

<script>
 import { OctokitMixin } from '../mixins/OctokitMixin'
 import RepoIssues from './Repo/Issues.vue'

 export default {
     name: "Repos",
     components: {
         RepoIssues
     },
     data() {
         return {
             repos: [],
         };
     },
     mixins: [OctokitMixin],
     async mounted() {
         const octokit = this.createOctokitClient();
         const { data: repos } = await octokit.request("/user/repos");
         this.repos = repos;
     },
 };
</script>
