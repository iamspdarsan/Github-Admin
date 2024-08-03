import { Octokit } from "octokit";

const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const {
  repos: { createOrUpdateFileContents },
} = octakit.rest;

export default function addFile(owner, repoName, destPath, content, message) {
  createOrUpdateFileContents({
    repo: repoName,
    owner: owner,
    path: destPath,
    content: content,
    message: message,
    committer: { name: "DARSAN", email: "hello@darsan.in" },
    author: { name: "DARSAN", email: "hello@darsan.in" },
  });
}
