import { Octokit } from "octokit";

const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const {
  actions: { setGithubActionsDefaultWorkflowPermissionsRepository },
} = octakit.rest;

export default function setPermToWF(owner, repo, permission = "write") {
  return setGithubActionsDefaultWorkflowPermissionsRepository({
    owner: owner,
    repo: repo,
    default_workflow_permissions: permission,
  });
}
