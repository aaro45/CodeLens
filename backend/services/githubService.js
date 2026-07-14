const axios = require("axios");

const getPullRequest = async (owner, repo, pullNumber) => {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  };

  const pr = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`,
    { headers }
  );

  const filesRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
    { headers }
  );

  const files = await Promise.all(
  filesRes.data.map(async (file) => {
    let originalContent = "";
    let modifiedContent = "";

    try {
      const originalRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${file.filename}?ref=${pr.data.base.sha}`,
        { headers }
      );

      originalContent = Buffer.from(
        originalRes.data.content,
        "base64"
      ).toString("utf-8");
    } catch (e) {}

    try {
      const modifiedRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${file.filename}?ref=${pr.data.head.sha}`,
        { headers }
      );

      modifiedContent = Buffer.from(
        modifiedRes.data.content,
        "base64"
      ).toString("utf-8");
    } catch (e) {}

    return {
      filename: file.filename,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch || "",
      originalContent,
      modifiedContent,
    };
  })
);
console.log("========== FINAL FILES ==========");
console.log(files);
  return {
    title: pr.data.title,
    author: pr.data.user.login,
    state: pr.data.state,
    additions: pr.data.additions,
    deletions: pr.data.deletions,
    changedFiles: pr.data.changed_files,
    files,
  };
};

module.exports = { getPullRequest };