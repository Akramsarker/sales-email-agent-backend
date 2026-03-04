def tone_formatter_tool(text, tone):
    print(f"   [🔧 Tool Executed: tone_formatter_tool] Formatting tone as: {tone}")
    tone_lower = tone.lower()
    if tone_lower == 'professional':
        return f"Dear Prospect,\n\n{text}\n\nBest Regards,\nSales Team"
    elif tone_lower == 'friendly':
        return f"Hey there!\n\n{text}\n\nCheers,\nSales Team"
    elif tone_lower == 'urgent':
        return f"URGENT: Action Required\n\n{text}\n\nPlease reply ASAP."
    return text

def email_structure_tool(subject, body, cta):
    print("   [🔧 Tool Executed: email_structure_tool] Structuring email parts.")
    return f"Subject: {subject}\n\n{body}\n\nCall to Action: {cta}"
