export async function askLlama(prompt: string) {
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Together API error: ${error}`);
  }

  const result = await response.json();
  console.log("result :",result);
  console.log("message:", JSON.stringify(result.choices[0].message, null, 2));

  return result.choices[0].message.content;
  
}
