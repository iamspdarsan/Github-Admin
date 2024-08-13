const { listRepoRemote } = require("./list_repo");
const { readFileSync } = require("fs");
const { getSha } = require("./get_last_commit_sha");

async function addFile(owner, repoName, destPath, content, message, sha) {
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
    sha: sha,
  });
}

async function main() {
  const groupedRepolists = await listRepoRemote();

  const wftContent = readFileSync("wft.yaml", {
    encoding: "base64",
  });

  const destPath = ".github/workflows/consistent-desc.yaml";
  const commitMsg = "End-User meta workflow updated";

  Object.keys(groupedRepolists).forEach((username) => {
    groupedRepolists[username].forEach(async (repoName) => {
      const sha = await getSha(username, repoName, destPath);

      addFile(username, repoName, destPath, wftContent, commitMsg, sha);
    });
  });
}

main();
