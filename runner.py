class ADKRunner:
    def __init__(self):
        self.workflow = []
        self.context = {}

    def add_agent(self, agent):
        self.workflow.append(agent)

    def execute(self, initial_state):
        self.context = initial_state.copy()
        print("🚀 Starting ADK Runner Workflow...\n")
        
        for agent in self.workflow:
            print(f"🤖 Executing Agent: {agent['name']}")
            try:
                self.context = agent['run'](self.context)
                print(f"✅ {agent['name']} Completed.\n")
            except Exception as e:
                print(f"❌ Error in {agent['name']}: {e}")
                raise e
        
        print("🎉 Workflow Finished!")
        return self.context
