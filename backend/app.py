from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)
CORS(app)

PROMPT = """You are an expert frontend developer.
Analyze this UI screenshot and generate:
- Semantic HTML5
- Modern CSS (flexbox/grid)
- Vanilla JavaScript for interactions
Rules:
- Match colors, fonts, spacing as closely as possible
- Use placeholder images from https://placehold.co
- Output a single self-contained HTML file
- NO markdown fences, NO explanations"""

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.json
        image_b64 = data["image"].split(",")[1]
        image_bytes = base64.b64decode(image_b64)

        response = model.generate_content([
            PROMPT,
            {"mime_type": "image/png", "data": image_bytes}
        ])

        code = response.text
        if code.startswith("```"):
            code = "\n".join(code.split("\n")[1:-1])

        return jsonify({"code": code})
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)