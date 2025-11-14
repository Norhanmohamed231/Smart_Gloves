from flask import Flask, request, send_file, jsonify
from flask_cors import CORS   
from utils.text_to_speech import generate_speech
from utils.speech_to_text import recognize_speech
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "🎉 Assistive AI Server is Running!"


@app.route("/text-to-speech", methods=["POST"])
def text_to_speech():
    data = request.get_json()
    text = data.get("text", "")
    path = generate_speech(text)
    return send_file(path, mimetype="audio/mpeg")

@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    audio = request.files["audio"]
    file_path = "temp.wav"
    audio.save(file_path)
    text = recognize_speech(file_path)
    os.remove(file_path)
    return jsonify({"text": text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

