import { Octokit } from "octokit";

const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const {
  actions: { createWorkflowDispatch },
} = octakit.rest;

export default function triggerWorkflow(
  owner,
  repoName,
  WFFileName = "lines-of-code.yaml"
) {
  return createWorkflowDispatch({
    owner: owner,
    repo: repoName,
    workflow_id: WFFileName,
    ref: "main",
  });
}
