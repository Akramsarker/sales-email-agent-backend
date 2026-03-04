import os
from dotenv import load_dotenv

load_dotenv()

from runner import ADKRunner
from agents import ContextAnalyzerAgent, ValuePropositionAgent, EmailWriterAgent
import json

def main():
    print("=========================================")
    print("   Sales Email Generator (ADK Runner)    ")
    print("=========================================\n")

    input_state = {
        "company": "Shopify",
        "problem": "Low outbound response rate",
        "tone": "Professional"
    }

    print("📥 Given Input:")
    print(json.dumps(input_state, indent=2))
    print("\n")

    runner = ADKRunner()
    
    # Fixed Workflow execution order
    runner.add_agent(ContextAnalyzerAgent)
    runner.add_agent(ValuePropositionAgent)
    runner.add_agent(EmailWriterAgent)

    result = runner.execute(input_state)
    
    print("\n=========================================")
    print("          FINAL GENERATED EMAIL          ")
    print("=========================================\n")
    print(result.get("finalEmail", ""))
    print("\n=========================================\n")

if __name__ == "__main__":
    main()
