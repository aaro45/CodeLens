const { GoogleGenerativeAI } = require("@google/generative-ai");

const Comparison = require("../models/Comparison");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const compareCode = async (req, res) => {
    try {
        const { code1, code2, language } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = `
You are a Senior Software Engineer conducting a professional code review.

Compare these two ${language} programs.

Original Code:
${code1}

Modified Code:
${code2}

Return ONLY plain text.

Do NOT use:
- Markdown
- **
- ###
- Tables
- Bullet symbols
- Backticks

Follow this exact format:

Summary:
(2-3 lines)

Similarity:
(Explain how similar they are.)

Better Version:
(State whether Original or Modified is better and why.)

Time Complexity:
Original:
Modified:

Space Complexity:
Original:
Modified:

Possible Bugs:
(List only real issues. If none, write "None".)

Optimization Suggestions:
(Concrete improvements.)

Code Quality:
(Comment on readability, naming, modularity and maintainability.)

Final Verdict:
(2-3 lines)

Keep the response concise (under 300 words).
`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();
        await Comparison.create({
            user: req.user.id,
            language,
            originalCode: code1,
            modifiedCode: code2,
            aiResponse: response,
        });

        res.json({
            success: true,
            response,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Gemini Error",
        });
    }
};

module.exports = {
    compareCode,
};