const { getPullRequest } = require("../services/githubService");

const fetchPullRequest = async (req, res) => {
    try {
        const { prUrl } = req.body;

        if (!prUrl)
            return res.status(400).json({
                success: false,
                message: "PR URL is required"
            });

        const match = prUrl.match(
            /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
        );

        if (!match)
            return res.status(400).json({
                success: false,
                message: "Invalid GitHub PR URL"
            });

        const [, owner, repo, pullNumber] = match;

        const data = await getPullRequest(owner, repo, pullNumber);
        console.log("========== FILES FROM SERVICE ==========");
        console.log(data);
        console.log("========== SENDING TO FRONTEND ==========");
        console.log({
            totalFiles: data.length,
            firstFile: data[0],
        });

        res.json({
            success: true,
            data
        });
    } catch (err) { 
    console.log("GitHub Error:");
    console.log(err.response?.status);
    console.log(err.response?.data);

    res.status(500).json({
        success: false,
        message: err.response?.data?.message || err.message
    });
}
};

module.exports = { fetchPullRequest };