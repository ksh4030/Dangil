from fastapi import HTTPException
from dotenv import load_dotenv
import app.utils.global_vars
import openai
import os
import uuid
import io

def create_image(emotion, prompt):
    # 모델 설정
    base = app.utils.global_vars.base
    s3 = app.utils.global_vars.s3
    # 이미지 타입
    types = ["childrens_book_illustration, ", "Aardman Animations Style page, ", "pixel art, 64 bit, ", "realistic, "]
    # Lora 타입
    lora_types = ["child", "animate", "pixel", "detail"]
    # 추론 횟수
    n_steps = 40
    # 부정 프롬프트
    negative_prompt = "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, b&w, watermark EasyNegative"
    
    # 생성된 이미지 저장
    images = []
    # S3에 저장된 이미지 URL
    images_url = []

    # 이미지 생성
    for i in range(4):
        base.set_adapters(lora_types[i])
        image = base(
            prompt=types[i] + emotion + prompt,
            #guidance_scale=7,
            negative_prompt=negative_prompt,
            num_inference_steps=n_steps,
        ).images[0]
        images.append(image)
    
    # 이미지 저장
    for image in images:
        # 경로 및 파일명 지정
        file_name = f"{str(uuid.uuid4())}.jpg"
        s3_key = f"temp/{file_name}"

        # Convert PIL Image to JPG
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        # S3 Image Upload
        try:
            s3.upload_fileobj(img_byte_arr, os.getenv("AWS_S3_BUCKET"), s3_key)
            images_url.append(os.getenv("AWS_S3_URL") + s3_key)
        except Exception as e:
            raise HTTPException(status_code = 500, detail=f"S3 upload failed: {str(e)}")
    return images_url

def diary_translate(content):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    client = openai.OpenAI(api_key=openai_api_key)
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Stable Diffusion is an AI art generation model similar to DALLE-2."},
{"role": "system", "content": "I'm going to put it in the prompt of the Stable Diffusion model"},
{"role": "system", "content": "Please let me know the answer that satisfies the rules below"},
{"role": "system", "content": "- Please don't transform the text you entered"},
{"role": "system", "content": "- Please translate Korean into English"},
{"role": "system", "content": "- Please extract it in a keyword format, not a sentence format"},
{"role": "system", "content": "- Extract the key words from the translation and distribute the words with commas"},
{"role": "system", "content": "- I'm going to put it in the prompt of the Stable Diffusion model, so change the format according to the prompt"},
{"role": "system", "content": "- Just write the keywords and let me know"},
{"role": "system", "content": "I want you to write me a list of detailed prompts exactly about the idea written after IDEA."},
{"role": "user", "content": "IDEA:" +  content}
        ]

    )
    return completion.choices[0].message.content

    
