import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import socket from "../socket";

function Join() {
  const { sessionId } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    socket.emit("join-session", sessionId);

    socket.on("participant-count", (count) => {
      setParticipants(count);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("session-ended", () => {
      alert("Session Ended By Agent");
      navigate("/");
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      socket.off("receive-message");
      socket.off("participant-count");
      socket.off("session-ended");
    };
  }, [sessionId, navigate]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("chat-message", {
      sessionId,
      message,
    });

    setMessage("");
  };

  const endSession = () => {
    socket.emit("end-session", sessionId);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Customer Support Session</h1>

      <h3>Session ID</h3>
      <p>{sessionId}</p>

      <h3>Participants: {participants}</h3>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="500"
        style={{
          border: "2px solid white",
          borderRadius: "10px",
        }}
      />

      <br />
      <br />

      <button onClick={endSession}>
        End Session
      </button>

      <hr />

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <hr />

      <h2>Chat</h2>

      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}

export default Join;