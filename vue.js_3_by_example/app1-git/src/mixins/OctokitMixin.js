// https://octokit.github.io/rest.js/v21/
import { Octokit } from "https://esm.sh/@octokit/rest";


export const OctokitMixin = {
  methods: {
    createOctokitClient() {
      return new Octokit({
        auth: localStorage.getItem("github-token"),
      });
    }
  }
}
