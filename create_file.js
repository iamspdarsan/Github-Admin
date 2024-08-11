const { listRepoRemote } = require("./list_repo");
const { readFileSync } = require("fs");

async function addFile(owner, repoName, destPath, content, message) {
  const { Octokit } = await import("@octokit/rest");

  const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    repos: { createOrUpdateFileContents },
  } = octakit.rest;

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

async function main() {
  const groupedRepolists = await listRepoRemote();

  const content = readFileSync("consistent-desc.yaml", {
    encoding: "base64",
  });

  const destPath = ".github/workflows/consistent-desc.yaml";
  const commitMsg = "End-User meta WF added";

  Object.keys(groupedRepolists).forEach((username) => {
    groupedRepolists[username].forEach((repoName) => {
      addFile(username, repoName, destPath, content, commitMsg);
    });
  });
}

main();
