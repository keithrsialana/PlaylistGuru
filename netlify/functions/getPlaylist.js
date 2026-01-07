export async function handler(event) {
  try {
    const { mood } = JSON.parse(event.body || "{}");

    if (!mood) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing mood" }),
      };
    }

    const apiKey = process.env.OPENROUTER_API_TOKEN;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server misconfiguration" }),
      };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://playlistguru.netlify.app", // can be anything
        "X-Title": "Playlist Guru AI",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "user",
            content:
              `Your task is to create a playlist based on the following mood: ${mood}. ` +
              `Respond with a random list of 49 song titles and their respective artists ` +
              `that fit this mood, separated by semicolons. Format the response as ` +
              `'Song Title - Artist Name'. Do not include any additional text.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", errText);
      throw new Error("OpenRouter request failed");
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    const playlist = text
      .split(";")
      .map(song => song.trim())
      .filter(Boolean);

    return {
      statusCode: 200,
      body: JSON.stringify({ playlist }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate playlist" }),
    };
  }
}
