import speech_recognition as sr
from pydub import AudioSegment
import os

def recognize_speech(file_path):
    recognizer = sr.Recognizer()
    wav_path = "converted.wav"

    try:
        
        sound = AudioSegment.from_file(file_path)
        sound.export(wav_path, format="wav")
    except Exception as e:
        return f" خطأ أثناء تحويل الملف إلى WAV: {e}"

    try:
        
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language="ar-SA")
        os.remove(wav_path)
        return text
    except sr.UnknownValueError:
        return " لم يتم التعرف على الكلام (الصوت غير واضح)"
    except sr.RequestError:
        return " خطأ في الاتصال بخدمة التعرف"
    except Exception as e:
        return f" خطأ أثناء التعرف: {e}"
