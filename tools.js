function tone_formatter_tool(text, tone) {
    console.log(`   [🔧 Tool Executed: tone_formatter_tool] Formatting tone as: ${tone}`);
    if (tone.toLowerCase() === 'professional') {
        return `Dear Prospect,\n\n${text}\n\nBest Regards,\nSales Team`;
    } else if (tone.toLowerCase() === 'friendly') {
        return `Hey there!\n\n${text}\n\nCheers,\nSales Team`;
    } else if (tone.toLowerCase() === 'urgent') {
        return `URGENT: Action Required\n\n${text}\n\nPlease reply ASAP.`;
    }
    return text;
}

function email_structure_tool(subject, body, cta) {
    console.log(`   [🔧 Tool Executed: email_structure_tool] Structuring email parts.`);
    return `Subject: ${subject}\n\n${body}\n\nCall to Action: ${cta}`;
}

module.exports = {
    tone_formatter_tool,
    email_structure_tool
};
