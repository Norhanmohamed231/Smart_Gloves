import React, { useState } from "react";
import { convertTextToSpeech } from "../api/speechApi";

function Blind() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    setLoading(true);
    await convertTextToSpeech(text);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      

      <div style={styles.card}>
        
        <h1 style={styles.title}>Text to Speech</h1>

        
        <div style={styles.iconContainer}>
          <div style={styles.iconCircle}>
            <i className="fa-solid fa-volume-high" style={styles.icon}></i>
          </div>
        </div>

        
        <textarea
          rows="4"
          cols="50"
          placeholder="ًWrite text here.."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textArea}
        />

        
        <button
          onClick={handleSpeak}
          disabled={loading || !text}
          style={{
            ...styles.btn,
            backgroundColor: loading ? "#b300b3" : "#8000ff",fontSize:22
          }}
        >
          <i
            className={`fa-solid ${
              loading ? "fa-hourglass-half" : "fa-volume-up"
            }`}
            style={{ marginRight: 8 ,padding:6,fontSize:18}}
          ></i>
          {loading ? "جاري التحويل..." : "استمع"}
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
    width: "430px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
  title: {
    color: "#5a189a",
    fontSize: "26px",
    marginBottom: "25px",
  },
  iconContainer: {
    marginBottom: "30px",
  },
  iconCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8000ff, #b266ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    boxShadow: "0 0 20px rgba(128, 0, 255, 0.4)",
  },
  icon: {
    color: "white",
    fontSize: "36px",
  },
  textArea: {
     width: "90%",
    borderRadius: "12px",
    border: "2px solid #d8b4fe",
    padding: "15px",
    paddingLeft:"20px",
    fontSize: "22px",
    outline: "none",
    resize: "none",
    backgroundColor: "#f3e8ff",
    color: "#4a0072",
    marginBottom: "25px",
    boxShadow: "inset 0 0 10px rgba(128,0,255,0.15)",
  },
  btn: {
    color: "white",
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Blind;

