async function getSha(owner, repoName, filePath) {
  const { Octokit } = await import("@octokit/rest");

  const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    repos: { getContent },
  } = octakit.rest;

  const {
    data: { sha },
  } = await getContent({
    owner: owner,
    repo: repoName,
    path: filePath,
  });

  return sha;
}

module.exports = { getSha };
