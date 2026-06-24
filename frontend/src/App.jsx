import { useState } from "react";
import axios from "axios";
import UploadZone from "./components/UploadZone";
import CodeDisplay from "./components/CodeDisplay";
import PreviewPanel from "./components/PreviewPanel";

export default function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [tab, setTab] = useState("code");
  const [framework, setFramework] = useState("vanilla");
  const [error, setError] = useState("");

  const generate = async (base64Image) => {
    setImage(base64Image);
    setLoading(true);
    setError("");
    setCode("");
    try {
      const res = await axios.post("https://pic2code.onrender.com/generate", {
        image: base64Image,
        framework,
      });
      setCode(res.data.code);
      setHistory((prev) => [
        { image: base64Image, code: res.data.code, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4),
      ]);
      setTab("code");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const download = (type) => {
    let content = code;
    let filename = "generated.html";
    let mime = "text/html";
    if (type === "css") {
      const match = code.match(/<style>([\s\S]*?)<\/style>/);
      content = match ? match[1] : "/* no CSS found */";
      filename = "generated.css"; mime = "text/css";
    } else if (type === "js") {
      const match = code.match(/<script>([\s\S]*?)<\/script>/);
      content = match ? match[1] : "// no JS found";
      filename = "generated.js"; mime = "text/javascript";
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type: mime }));
    a.download = filename;
    a.click();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#0f0f0f" : "#f5f5f5",
      color: darkMode ? "#fff" : "#111",
      fontFamily: "sans-serif",
      transition: "all 0.3s"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: `1px solid ${darkMode ? "#2a2a2a" : "#ddd"}`,
        background: darkMode ? "#111" : "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🖼️</span>
          <span style={{ fontSize: 22, fontWeight: 700 }}>Pic2Code</span>
          <span style={{
            fontSize: 11, padding: "2px 8px", borderRadius: 20,
            background: "#7c3aed", color: "#fff", fontWeight: 600
          }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "6px 14px", borderRadius: 8,
              border: "1px solid #444", cursor: "pointer",
              background: darkMode ? "#1a1a1a" : "#fff",
              color: darkMode ? "#fff" : "#111", fontSize: 13
            }}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: code ? "1fr 1fr" : "1fr", gap: 24, marginBottom: 24 }}>
          <div>
            <UploadZone onImage={generate} image={image} darkMode={darkMode} loading={loading} />
            {error && (
              <div style={{
                marginTop: 12, padding: "12px 16px", borderRadius: 8,
                background: "#2a0a0a", border: "1px solid #f87171",
                color: "#f87171", fontSize: 13
              }}>
                ❌ {error}
              </div>
            )}
          </div>
          {code && <PreviewPanel code={code} darkMode={darkMode} />}
        </div>

        {code && (
          <CodeDisplay
            code={code}
            darkMode={darkMode}
            tab={tab}
            setTab={setTab}
            download={download}
          />
        )}

        {history.length > 1 && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Recent generations</p>
            <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
              {history.slice(1).map((h, i) => (
                <div
                  key={i}
                  onClick={() => { setCode(h.code); setImage(h.image); }}
                  style={{
                    cursor: "pointer", borderRadius: 8, overflow: "hidden",
                    border: "1px solid #333", minWidth: 120, flexShrink: 0
                  }}
                >
                  <img src={h.image} alt="" style={{ width: 120, height: 80, objectFit: "cover" }} />
                  <div style={{ padding: "4px 8px", fontSize: 11, color: "#888", background: darkMode ? "#1a1a1a" : "#f0f0f0" }}>
                    {h.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}