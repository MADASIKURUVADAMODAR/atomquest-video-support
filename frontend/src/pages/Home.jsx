import { useState } from "react";
import axios from "axios";

function Home() {
  const [sessionId, setSessionId] = useState("");

  const createSession = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-session"
      );

      setSessionId(response.data.sessionId);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    const link = `http://localhost:5173/join/${sessionId}`;

    navigator.clipboard.writeText(link);

    alert("Invite Link Copied!");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>AtomQuest Video Support Platform</h1>

      <p>
        Create support sessions and invite customers
        through a secure session link.
      </p>

      <br />

      <button
        onClick={createSession}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        Create Session
      </button>

      <br />
      <br />

      {sessionId && (
        <>
          <h3>Session ID</h3>

          <p>{sessionId}</p>

          <h3>Invite Link</h3>

          <p>
            http://localhost:5173/join/{sessionId}
          </p>

          <button
            onClick={copyLink}
            style={{
              padding: "10px 20px",
            }}
          >
            Copy Invite Link
          </button>
        </>
      )}
    </div>
  );
}

export default Home;