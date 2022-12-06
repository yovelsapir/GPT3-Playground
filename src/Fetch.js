const API_KEY = process.env.REACT_APP_API_KEY;

// Function calls on GPT3 API and returns the output response
export async function FetchCall(query, engine) {
  const settings = {
    prompt: query,
    temperature: 0.6,
    max_tokens: 3950,
    top_p: 1.0,
    frequency_penalty: 0.3,
    presence_penalty: 0.4,
  };
  const engines = {
    Davinci3: "text-davinci-003",
    Davinci: "text-davinci-002",
    Curie: "text-curie-001",
    Babbage: "text-babbage-001",
    Ada: "text-ada-001",
  };

  const res = await fetch(
    "https://api.openai.com/v1/engines/" + engines[engine] + "/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(settings),
    }
  );
  const data = await res.json();
  return data.choices[0].text;
}
