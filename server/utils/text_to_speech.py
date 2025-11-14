from gtts import gTTS
import os

def generate_speech(text):
    file_path = "speech.mp3"
    if os.path.exists(file_path):
        os.remove(file_path)
    tts = gTTS(text=text, lang="ar")
    tts.save(file_path)
    return file_path
