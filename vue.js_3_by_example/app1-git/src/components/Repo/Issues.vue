<template>
    <h4>issues</h4>
    <div v-if="issues.length > 0">
        <button @click="showIssues = !showIssues">{{showIssues ? 'Hide' : 'Show'}} issues</button>
        <div v-if="showIssues">
            <div v-for="i of issues" :key="i.id">
                <h3>{{i.title}}</h3>
                <a :href="i.url">Go to issue</a>
            </div>
        </div>
    </div>
</template>

<script>
 import { OctokitMixin  } from '../../mixins/OctokitMixin'

 export default {
     name: "RepoIssues",
     props: {
         owner: {
             type: String,
             required: true,
         },
         repo: {
             type: String,
             required: true,
         },
     },
     mixins: [OctokitMixin],
     data() {
         return {
             issues: [],
             showIssues: false,
         };
     },
     methods: {
         async getRepoIssues(owner, repo) {
             if (typeof owner !== "string" || typeof repo !== "string") {
               return;
             }
             const octokit = this.createOctokitClient();
             const { data: issues } = await octokit.issues.listForRepo({
                 owner,
                 repo,
             });
             this.issues = issues;
         },
     },
     watch: {
         owner: {
             immediate: true,
             handler(val) {
                 this.getRepoIssues(val, this.repo);
             },
         },
         repo: {
             immediate: true,
             handler(val) {
                 this.getRepoIssues(this.issues, val);
             },
         },
     },
 };
</script>
