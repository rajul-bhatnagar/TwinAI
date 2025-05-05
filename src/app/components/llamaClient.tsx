import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN;

const client = new InferenceClient(HF_TOKEN);  

export async function askLlama(prompt:any) {
    const chatCompletion = await client.chatCompletion({
        provider: "together",
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        max_tokens: 500,
    });

    return chatCompletion.choices[0].message;
}
