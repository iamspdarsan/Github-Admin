async function delFile(owner, repoName, filePath, latestSha) {
  const { Octokit } = await import("@octokit/rest");

  const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    repos: { deleteFile },
  } = octakit.rest;

  await deleteFile({
    owner: owner,
    repo: repoName,
    path: filePath,
    message: filePath + " deleted",
    sha: latestSha,
  });
}

module.exports = { delFile };
