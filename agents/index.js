const { GoogleGenerativeAI } = require("@google/generative-ai");
const { tone_formatter_tool, email_structure_tool } = require("../tools.js");

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

async function generateText(prompt) {
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
            const result = await model.generateContent(prompt);
            return result.response.text().trim();
        } catch (error) {
            console.error("   [⚠️ AI Generation Error, falling back to mock]:", error.message);
            return getMockResponse(prompt);
        }
    } else {
        return getMockResponse(prompt);
    }
}

function getMockResponse(prompt) {
    if (prompt.includes("Analyze the context")) {
        return "The company is struggling with their current outreach. They need a solution to improve engagement immediately.";
    }
    if (prompt.includes("write a 2-sentence value proposition")) {
        return "Our solution automates your outreach, targeting specific pain points directly. This results in significantly higher engagement and conversion rates.";
    }
    if (prompt.includes("Write a short sales email body")) {
        return "We noticed your team is dealing with a low outbound response rate. Our solution automates your outreach, targeting specific pain points directly. This results in significantly higher engagement and conversion rates. We would love to show you how.";
    }
    return "[Mock AI Response]";
}

const ContextAnalyzerAgent = {
    name: "Context Analyzer Agent",
    run: async (state) => {
        console.log(`   -> Analyzing context for company: ${state.company}, problem: ${state.problem}`);

        const analysisPrompt = `Analyze the context for a sales outreach. Company: ${state.company}. Problem they are facing: ${state.problem}. Briefly summarize the pain point.`;
        const analysis = await generateText(analysisPrompt);

        return { ...state, contextAnalysis: analysis };
    }
};

const ValuePropositionAgent = {
    name: "Value Proposition Agent",
    run: async (state) => {
        console.log(`   -> Crafting value proposition based on context.`);

        const vpPrompt = `Based on this context: "${state.contextAnalysis}", write a 2-sentence value proposition on how our software can help them.`;
        const vp = await generateText(vpPrompt);

        return { ...state, valueProposition: vp };
    }
};

const EmailWriterAgent = {
    name: "Email Writer Agent",
    run: async (state) => {
        console.log(`   -> Writing the final email with Tone: ${state.tone}`);

        const emailPrompt = `Write a short sales email body (without greetings or sign-offs) using this value proposition: "${state.valueProposition}".`;
        const emailBody = await generateText(emailPrompt);

        // Use custom tools
        const structuredEmail = email_structure_tool(
            `Quick question about your workflow at ${state.company}`,
            emailBody,
            "Are you free for a quick 5-min chat next Tuesday?"
        );

        const finalEmail = tone_formatter_tool(structuredEmail, state.tone || "Professional");

        return { ...state, finalEmail: finalEmail };
    }
};

module.exports = {
    ContextAnalyzerAgent,
    ValuePropositionAgent,
    EmailWriterAgent
};
