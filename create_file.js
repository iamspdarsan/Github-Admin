const { listRepoRemote } = require("./list_repo");
const { readFileSync } = require("fs");
const { loadFile } = require("./read_file");

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

  const cresteemRME = readFileSync("crm-rme.md", {
    encoding: "utf8",
  });

  const darsanRME = readFileSync("d-rme.md", {
    encoding: "utf8",
  });

  const destPath = "README.md";
  const commitMsg = "Readme template appended";

  Object.keys(groupedRepolists).forEach((username) => {
    groupedRepolists[username].forEach((repoName) => {
      loadFile(username, repoName, destPath)
        .then(([oldContent, sha]) => {
          const newContent = username === "cresteem" ? cresteemRME : darsanRME;

          const finalContent =
            newContent +
            "\n\n" +
            Buffer.from(oldContent, "base64").toString("utf8");

          addFile(
            username,
            repoName,
            destPath,
            Buffer.from(finalContent, "utf8").toString("base64"),
            commitMsg,
            sha
          );
        })
        .catch(console.error);
    });
  });
}

main();
