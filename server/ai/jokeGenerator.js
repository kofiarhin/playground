const { Groq } = require("groq-sdk");

// Configurable model
const MODEL_NAME = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

/**
 * jokeGenerator
 * @param {Object} inputs
 * @param {string} [inputs.topic] - Optional topic for the joke (e.g., "JavaScript")
 * @returns {Promise<string>} Joke text
 */
const jokeGenerator = async (inputs = {}) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable");
  }

  const groq = new Groq({ apiKey });

  const topic = inputs.topic || "programming";

  const finalPrompt = `Tell me a short, funny joke about ${topic}. 
Only return the joke text, no explanations, no markdown, no extra formatting.`;

  try {
    const response = await groq.chat.completions.create({
      model: MODEL_NAME,
      messages: [{ role: "user", content: finalPrompt }],
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
      stream: false,
    });

    let raw = response?.choices?.[0]?.message?.content ?? "";
    return raw.trim();
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err);
    throw new Error(`jokeGenerator failed: ${err.message}`);
  }
};

module.exports = jokeGenerator;
