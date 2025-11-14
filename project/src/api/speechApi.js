export async function convertTextToSpeech(text) {
  const response = await fetch("http://127.0.0.1:5000/text-to-speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}

export const convertSpeechToText = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    const response = await fetch("http://127.0.0.1:5000/speech-to-text", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.text || "لم يتم التعرف على الصوت";
  } catch (error) {
    console.error("Error during speech-to-text:", error);
    return " خطأ في الاتصال بالسيرفر";
  }
};
