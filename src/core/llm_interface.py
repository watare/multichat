import os
import requests

UNDERSTAND_API_URL = "https://understand.tech/api/v1/chat"
UNDERSTAND_API_KEY = os.getenv("UNDERSTAND_API_KEY")

class UnderstandTechLLM:
    def __init__(self, api_key=None):
        self.api_key = api_key or UNDERSTAND_API_KEY
        self.url = UNDERSTAND_API_URL

    def chat(self, prompt, model="gpt-4", temperature=0.7, language="fr-FR"):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "accept-language": language
        }
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature
        }
        print(f"[DEBUG] API KEY: {self.api_key}")
        print(f"[DEBUG] Payload: {payload}")
        print(f"[DEBUG] Headers: {headers}")
        response = requests.post(self.url, json=payload, headers=headers)
        print(f"[DEBUG] Response: {response.text}")
        response.raise_for_status()
        return response.json()
