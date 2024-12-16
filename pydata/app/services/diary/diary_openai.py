import openai
import app.utils.global_vars

def diary_translate(prompt):
    completion = app.utils.global_vars.openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "사용자가 입력한 문장을 영어로 번역해줘, 번역한 문장만 말해줘"},
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content

def diary_keyword(prompt):
    completion = app.utils.global_vars.openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Stable Diffusion is an AI art generation model similar to DALLE-2."},
{"role": "system", "content": "I'm going to put it in the prompt of the Stable Diffusion model"},
{"role": "system", "content": "Please let me know the answer that satisfies the rules below"},
{"role": "system", "content": "- Please don't transform the text you entered"},
{"role": "system", "content": "- Please extract it in a keyword format, not a sentence format"},
{"role": "system", "content": "- Extract the key words from the translation and distribute the words with commas"},
{"role": "system", "content": "- I'm going to put it in the prompt of the Stable Diffusion model, so change the format according to the prompt"},
{"role": "system", "content": "- Just write the keywords and let me know"},
{"role": "system", "content": "I want you to write me a list of detailed prompts exactly about the idea written after IDEA."},
{"role": "user", "content": "IDEA:" +  prompt}
        ]

    )
    return completion.choices[0].message.content


