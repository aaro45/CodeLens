const axios = require("axios");

const getPullRequest = async (owner, repo, pullNumber) => {
    console.log({
        owner,
        repo,
        pullNumber,
        token: process.env.GITHUB_TOKEN ? "Loaded" : "Missing"
    });
    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    };

    const pr = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`,
        { headers }
    );

    const files = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
        { headers }
    );

    return {
        title: pr.data.title,
        author: pr.data.user.login,
        state: pr.data.state,
        additions: pr.data.additions,
        deletions: pr.data.deletions,
        changedFiles: pr.data.changed_files,
        files: files.data
    };
};

module.exports = { getPullRequest };