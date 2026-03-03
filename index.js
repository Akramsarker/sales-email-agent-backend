require('dotenv').config();
const ADKRunner = require('./runner');
const { ContextAnalyzerAgent, ValuePropositionAgent, EmailWriterAgent } = require('./agents/index');

async function main() {
    console.log("=========================================");
    console.log("   Sales Email Generator (ADK Runner)    ");
    console.log("=========================================\n");

    const input = {
        company: "Shopify",
        problem: "Low outbound response rate",
        tone: "Professional"
    };

    console.log("📥 Given Input:");
    console.log(JSON.stringify(input, null, 2), "\n");

    const runner = new ADKRunner();

    // Fixed Workflow execution order
    runner.addAgent(ContextAnalyzerAgent);
    runner.addAgent(ValuePropositionAgent);
    runner.addAgent(EmailWriterAgent);

    const result = await runner.execute(input);

    console.log("\n=========================================");
    console.log("          FINAL GENERATED EMAIL          ");
    console.log("=========================================\n");
    console.log(result.finalEmail);
    console.log("\n=========================================\n");
}

main().catch(console.error);
