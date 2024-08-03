async function main() {
  const groupedData = listRepoLocal();

  const ignoreList = [".github", "kinact", "fastimage", "bonse"];

  let actionCount = 0;

  for (const owner of Object.keys(groupedData)) {
    for (const repoName of groupedData[owner]) {
      if (!ignoreList.includes(repoName.toLowerCase())) {
        try {
          await triggerWorkflow(owner, repoName);

          actionCount += 1;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  console.log("Action triggerd on ", actionCount, "repos");
}
