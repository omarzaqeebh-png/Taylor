exports.handler = async function (event) {

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Read the API key from Netlify's environment (never exposed to browser)
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: "GROQ_API_KEY is not set in environment variables." } })
    };
  }

  // Parse the request body sent from your frontend
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: { message: "Invalid JSON body." } }) };
  }

  const { messages, model, max_tokens, temperature } = payload;

  // Forward the request to Groq — API key stays on the server
  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({ model, messages, max_tokens, temperature })
    });

    const data = await groqResponse.json();

    return {
      statusCode: groqResponse.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: { message: "Failed to reach Groq API: " + err.message } })
    };
  }
};
