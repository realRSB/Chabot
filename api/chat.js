// api/chat.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { message } = req.body;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a supportive and empathetic therapist helping the user process their thoughts." },
            { role: "user", content: message }
          ],
        }),
      });
  
      const data = await response.json();
      const reply = data.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (err) {
      res.status(500).json({ error: "Failed to connect to OpenAI" });
    }
  }
  