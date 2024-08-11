const { listRepoRemote } = require("./list_repo");

const sodium = require("libsodium-wrappers");

async function encryptSecret(publicKey, secret) {
  await sodium.ready;

  const binkey = sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL);
  const binsec = sodium.from_string(secret);

  const encrypted = sodium.crypto_box_seal(binsec, binkey);

  return sodium.to_base64(encrypted, sodium.base64_variants.ORIGINAL);
}

async function addSecret(owner, repoName) {
  const { Octokit } = await import("@octokit/rest");
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const {
    actions: { createOrUpdateRepoSecret, getRepoPublicKey },
  } = octokit;

  const {
    data: { key_id, key },
  } = await getRepoPublicKey({ owner: owner, repo: repoName });

  const secretName = "META_UPDATE_KEY";
  const secret = await encryptSecret(key, process.env.META_UPDATE_KEY);

  createOrUpdateRepoSecret({
    owner: owner,
    repo: repoName,
    secret_name: secretName,
    encrypted_value: secret,
    key_id: key_id,
  });
}

async function main() {
  const groupedRepolists = await listRepoRemote();

  Object.keys(groupedRepolists).forEach((username) => {
    groupedRepolists[username].forEach((repoName) => {
      addSecret(username, repoName);
    });
  });
}

main();
