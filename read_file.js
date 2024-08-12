async function loadFile(owner, repoName, filePath) {
  const { Octokit } = await import("@octokit/rest");

  const octakit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    repos: { getContent },
  } = octakit.rest;

  try {
    const {
      data: { content, sha },
    } = await getContent({
      owner: owner,
      repo: repoName,
      path: filePath,
    });

    return [content, sha];
  } catch {
    return [Buffer.from("").toString("base64"), null];
  }
}

module.exports = { loadFile };
