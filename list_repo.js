import { Octokit } from "octokit";

const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const {
  repos: { listForAuthenticatedUser },
} = octakit.rest;

function _makeGroupByOwner(data) {
  const result = {};

  data.forEach((repo) => {
    const owner = repo.owner.login;

    if (result[owner] === null) {
      result[owner] = [];
    }

    result[owner].push(repo.name);
  });

  return result;
}

export async function listRepoRemote() {
  const { data } = await listForAuthenticatedUser({
    username: "iamspdarsan",
    type: "all",
    per_page: 100,
  });

  return _makeGroupByOwner(data);
}

export function listRepoLocal() {
  const { data } = JSON.parse(readFileSync("out.json", { encoding: "utf8" }));

  return _makeGroupByOwner(data);
}

export function dumpToLocal() {
  listRepoRemote()
    .then((content) => {
      writeFileSync("out.json", JSON.stringify(content, null, 2), {
        encoding: "utf8",
      });
    })
    .catch(console.error);
}
