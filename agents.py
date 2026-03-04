import os
import google.generativeai as genai
from tools import tone_formatter_tool, email_structure_tool

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

model_name = "models/gemini-3-flash-preview"

def generate_text(prompt):
    if api_key:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"   [⚠️ AI Generation Error, falling back to mock]: {e}")
            return get_mock_response(prompt)
    else:
        return get_mock_response(prompt)

def get_mock_response(prompt):
    if "Analyze the context" in prompt:
        return "The company is struggling with their current outreach. They need a solution to improve engagement immediately."
    if "write a 2-sentence value proposition" in prompt:
        return "Our solution automates your outreach, targeting specific pain points directly. This results in significantly higher engagement and conversion rates."
    if "Write a short sales email body" in prompt:
        return "We noticed your team is dealing with a low outbound response rate. Our solution automates your outreach, targeting specific pain points directly. This results in significantly higher engagement and conversion rates. We would love to show you how."
    return "[Mock AI Response]"

def run_context_analyzer(state):
    print(f"   -> Analyzing context for company: {state.get('company')}, problem: {state.get('problem')}")
    prompt = f"Analyze the context for a sales outreach. Company: {state.get('company')}. Problem they are facing: {state.get('problem')}. Briefly summarize the pain point."
    analysis = generate_text(prompt)
    state['contextAnalysis'] = analysis
    return state

ContextAnalyzerAgent = {
    "name": "Context Analyzer Agent",
    "run": run_context_analyzer
}

def run_value_proposition(state):
    print("   -> Crafting value proposition based on context.")
    prompt = f"Based on this context: \"{state.get('contextAnalysis')}\", write a 2-sentence value proposition on how our software can help them."
    vp = generate_text(prompt)
    state['valueProposition'] = vp
    return state

ValuePropositionAgent = {
    "name": "Value Proposition Agent",
    "run": run_value_proposition
}

def run_email_writer(state):
    print(f"   -> Writing the final email with Tone: {state.get('tone')}")
    prompt = f"Write a short sales email body (without greetings or sign-offs) using this value proposition: \"{state.get('valueProposition')}\"."
    email_body = generate_text(prompt)
    
    structured_email = email_structure_tool(
        f"Quick question about your workflow at {state.get('company')}",
        email_body,
        "Are you free for a quick 5-min chat next Tuesday?"
    )
    
    final_email = tone_formatter_tool(structured_email, state.get('tone', 'Professional'))
    state['finalEmail'] = final_email
    return state

EmailWriterAgent = {
    "name": "Email Writer Agent",
    "run": run_email_writer
}
