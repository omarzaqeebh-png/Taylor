// netlify/functions/chat.js
const fetch = require('node-fetch'); // قد تحتاج لتثبيتها أو استخدام السيرفر الافتراضي

exports.handler = async (event) => {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};