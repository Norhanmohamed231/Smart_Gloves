import React, { useState, useRef } from "react";
import { convertSpeechToText } from "../api/speechApi";

function Deaf() {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/wav" });
      console.log(" حجم الصوت:", blob.size, "bytes");

      if (blob.size < 1000) {
        setText(" الصوت قصير جدًا أو لم يتم تسجيله.");
        return;
      }

      const textResult = await convertSpeechToText(blob);
      console.log(" النص الناتج:", textResult);
      setText(textResult);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const resetText = () => {
    setText("");
  };

  return (
    <div style={styles.container}>
      
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div style={styles.card}>
        
        <h1 style={styles.title}>Speech To Text</h1>

        
        <div style={styles.iconContainer}>
          <button
            onClick={recording ? stopRecording : startRecording}
            style={{
              ...styles.iconBtn,
              backgroundColor: recording ? "#b300b3" : "#8000ff",
              boxShadow: recording
                ? "0 0 25px #b300b3aa"
                : "0 0 15px #8000ffaa",
            }}
          >
            <i
              className={`fa-solid ${
                recording ? "fa-stop" : "fa-microphone"
              }`}
              style={styles.icon}
            ></i>
          </button>
        </div>

        
        <div style={styles.textBox}>
          <p style={styles.textDisplay}>
            {text || "start recording......."}
          </p>
        </div>

        
        <button onClick={resetText} style={styles.resetBtn}>
          <i className="fa-solid fa-rotate-right" style={{ marginRight: 8 }}></i>
          Reset Text Field
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #6a0dad, #c084fc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "50px 40px",
    textAlign: "center",
    width: "420px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
  title: {
    color: "#5a189a",
    fontSize: "26px",
    marginBottom: "30px",
  },
  iconContainer: {
    marginBottom: "30px",
  },
  iconBtn: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "none",
    color: "white",
    fontSize: "32px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  icon: {
    fontSize: "36px",
  },
  textBox: {
    backgroundColor: "#f3e8ff",
    padding: "20px",
    borderRadius: "12px",
    minHeight: "100px",
    marginBottom: "30px",
    boxShadow: "inset 0 0 10px rgba(128,0,255,0.2)",
  },
  textDisplay: {
    fontSize: "22px",
    color: "#4a0072",
    wordWrap: "break-word",
  },
  resetBtn: {
    backgroundColor: "#8000ff",
    color: "white",
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Deaf;


