class ADKRunner {
    constructor() {
        this.workflow = [];
        this.context = {};
    }

    addAgent(agent) {
        this.workflow.push(agent);
    }

    async execute(initialState) {
        this.context = { ...initialState };
        console.log("🚀 Starting ADK Runner Workflow...\n");
        
        for (const agent of this.workflow) {
            console.log(`🤖 Executing Agent: ${agent.name}`);
            try {
                this.context = await agent.run(this.context);
                console.log(`✅ ${agent.name} Completed.\n`);
            } catch (error) {
                console.error(`❌ Error in ${agent.name}:`, error);
                throw error;
            }
        }
        
        console.log("🎉 Workflow Finished!");
        return this.context;
    }
}

module.exports = ADKRunner;
