// Function calls on GPT3 API and returns the output response
export async function FetchCall(query, engine) {
  const settings = {
    prompt: query,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const engines = {
    Curie: "text-curie-001",
    Davinci: "text-davinci-002",
    Babbage: "text-babbage-001",
    Ada: "text-ada-001",
  };

  require("dotenv").config();

  const res = await fetch(
    "https://api.openai.com/v1/engines/" + engines[engine] + "/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify(settings),
    }
  );
  const data = await res.json();
  return data.choices[0].text;
}
