<div align="center">

# Github-Admin: Collection of GitHub CRUD Boilerplate Code

<p id="intro">Github-Admin is a streamlined collection of boilerplate code designed for performing CRUD operations on GitHub repositories. Utilizing the power of the @octokit/rest library, it simplifies tasks like creating, updating, and deleting repositories through the GitHub REST API, making repository management more efficient for developers.</p>

### Supported Platforms

[![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)]()
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)]()
[![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()

---

<p>

<span>
  <a href="https://github.com/darsan-in/Github-Admin/commits/main">
    <img src="https://img.shields.io/github/last-commit/darsan-in/Github-Admin?display_timestamp=committer&style=for-the-badge&label=Updated%20On" alt="GitHub last commit"/>
  </a>
</span>

<span>
  <a href="">
    <img src="https://img.shields.io/github/commit-activity/m/darsan-in/Github-Admin?style=for-the-badge&label=Commit%20Activity" alt="GitHub commit activity"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/darsan-in/Github-Admin?style=for-the-badge&label=License" alt="GitHub License"/>
  </a>
</span>

<span>
  <a href="https://github.com/darsan-in/Github-Admin/releases">
    <img src="https://img.shields.io/github/v/release/darsan-in/Github-Admin?include_prereleases&sort=date&display_name=tag&style=for-the-badge&label=Latest%20Version" alt="GitHub Release"/>
  </a>
</span>

</p>

<p>

<span>
  <a href="https://www.codefactor.io/repository/github/darsan-in/Github-Admin/issues/main">
    <img src="https://img.shields.io/codefactor/grade/github/darsan-in/Github-Admin?style=for-the-badge&label=Code%20Quality%20Grade" alt="CodeFactor Grade"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="">
    <img src="https://img.shields.io/github/stars/darsan-in/Github-Admin?style=for-the-badge&label=Stars" alt="GitHub Repo stars"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="https://github.com/sponsors/darsan-in">
    <img src="https://img.shields.io/github/sponsors/darsan-in?style=for-the-badge&label=Generous%20Sponsors" alt="GitHub Sponsors"/>
  </a>
</span>

</p>

---

</div>

## Table of Contents 📝

- [Features and Benefits](#features-and-benefits-)
- [Use Cases](#use-cases-)
- [Friendly request to users](#-friendly-request-to-users)

- [Installation - Step-by-Step Guide](#installation---step-by-step-guide-)
- [Usage](#usage)

- [License](#license-%EF%B8%8F)
- [Contributing to Our Project](#contributing-to-our-project-)

- [Contact Information](#contact-information)
- [Credits](#credits-)

## Features and Benefits ✨

- **Easy Repository Creation**: Quickly set up new repositories with minimal configuration.
- **Effortless Updates**: Seamlessly update repository details such as name, description, and visibility.
- **Repository Deletion**: Safely delete repositories you no longer need.
- **Listing Repositories**: Retrieve a comprehensive list of repositories associated with your GitHub account.
- **File Management**: Create, read, and delete files within a repository effortlessly.
- **Secret Management**: Securely manage and add secrets to repositories.
- **Workflow Automation**: Trigger workflows and manage permissions for GitHub Actions.

## Use Cases ✅

- **Automated Repository Management**: Integrate Github-Admin into CI/CD pipelines to automate repository setup and teardown.
- **Project Bootstrapping**: Quickly create and configure repositories for new projects.
- **Repository Cleanup**: Automate the deletion of obsolete or unused repositories.
- **Bulk Updates**: Efficiently apply updates to multiple repositories in one go.
- **GitHub Organization Management**: Manage repositories within GitHub organizations with ease.
- **Custom Tools Development**: Use Github-Admin as a foundation for building custom GitHub management tools.

---

### 🙏🏻 Friendly Request to Users

Every star on this repository is a sign of encouragement, a vote of confidence, and a reminder that our work is making a difference. If this project has brought value to you, even in the smallest way, **please consider showing your support by giving it a star.** ⭐

_"Star" button located at the top-right of the page, near the repository name._

Your star isn’t just a digital icon—it’s a beacon that tells us we're on the right path, that our efforts are appreciated, and that this work matters. It fuels our passion and drives us to keep improving, building, and sharing.

If you believe in what we’re doing, **please share this project with others who might find it helpful.** Together, we can create something truly meaningful.

Thank you for being part of this journey. Your support means the world to us. 🌍💖

---

## Installation - Step-by-Step Guide 🪜

- **Step 1:** Clone this repo.

```bash
git clone https://github.com/darsan-in/Github-Admin.git
```

- **Step 2:** Install Node JS if not installed already. Follow this page https://nodejs.org/en/download/package-manager/current

- **Step 3:** Create [personal access token](https://github.com/settings/tokens) and save it in system environment variable as `GITHUB_TOKEN`.

- **Step 4:** Open terminal execute this command

```bash
npm install
```

- **Step 5:** Now you can run program of your choice.

## Usage

- **Triggering action On all repository simultaneously.**

```js
async function main() {
  const repoNames = listRepoRemote();

  const ignoreList = [".github"];

  let actionCount = 0;

  for (const owner of Object.keys(repoMeta)) {
    for (const repoName of repoMeta[owner]) {
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
```

- **Add secret to all your repository simultaneously.**

```js
async function main() {
  const groupedRepolists = await listRepoRemote();

  Object.keys(groupedRepolists).forEach((username) => {
    groupedRepolists[username].forEach((repoName) => {
      addSecret(username, repoName);
    });
  });
}

main();
```

## License ©️

This project is licensed under the [Apache License 2.0](LICENSE).

## Contributing to Our Project 🤝

We’re always open to contributions and fixing issues—your help makes this project better for everyone.

If you encounter any errors or issues, please don’t hesitate to [raise an issue](../../issues/new). This ensures we can address problems quickly and improve the project.

For those who want to contribute, we kindly ask you to review our [Contribution Guidelines](CONTRIBUTING) before getting started. This helps ensure that all contributions align with the project's direction and comply with our existing [license](LICENSE).

We deeply appreciate everyone who contributes or raises issues—your efforts are crucial to building a stronger community. Together, we can create something truly impactful.

Thank you for being part of this journey!

## Contact Information

For any questions, please reach out via hello@darsan.in or [LinkedIn](https://www.linkedin.com/in/darsan-in/).

## Credits 🙏🏻

Special thanks to [Keegan Campbell](https://github.com/kfcampbell), [Nick Floyd](https://github.com/nickfloyd), [Gregor Martynus](https://github.com/gr2m) and all maintainers of @octokit/rest for their contributions to the underlying foundation library.

---

<p align="center">

<span>
<a href="https://www.linkedin.com/in/darsan-in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/linkedin.png" alt="Darsan at Linkedin"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.youtube.com/@darsan-in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/youtube.png" alt="Darsan at Youtube"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.facebook.com/darsan.in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/facebook.png" alt="Darsan at Facebook"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.npmjs.com/~darsan.in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/npm.png" alt="Darsan at NPM"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://github.com/darsan-in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/github.png" alt="Darsan at Github"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://huggingface.co/darsan"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/hf.png" alt="Darsan at Huggingface"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.reddit.com/user/iamspdarsan/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/reddit.png" alt="Darsan at Reddit"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://darsan.in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/website.png" alt="Darsan Website"></a>
</span>

<p>

---

#### Topics

<ul id="keywords">
<li>github</li>
<li>repository management</li>
<li>crud operations</li>
<li>octokit</li>
<li>rest api</li>
<li>github api</li>
<li>ci/cd pipelines</li>
<li>github actions</li>
<li>automated workflows</li>
<li>team management</li>
<li>access control</li>
<li>permissions</li>
<li>github repositories</li>
<li>github rest api</li>
</ul>
