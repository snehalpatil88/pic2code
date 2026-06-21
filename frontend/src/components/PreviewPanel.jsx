import { useState } from "react";

export default function PreviewPanel({ code, darkMode }) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${darkMode ? "#2a2a2a" : "#ddd"}`,
      overflow: "hidden",
      background: darkMode ? "#111" : "#fff"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: `1px solid ${darkMode ? "#2a2a2a" : "#ddd"}`,
        background: darkMode ? "#1a1a1a" : "#f9f9f9"
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: darkMode ? "#ccc" : "#555" }}>
          🔍 Live Preview
        </span>
        <button
          onClick={() => setFullscreen(!fullscreen)}
          style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12,
            border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
            background: "transparent", cursor: "pointer",
            color: darkMode ? "#ccc" : "#555"
          }}
        >
          {fullscreen ? "⊙ Exit" : "⛶ Fullscreen"}
        </button>
      </div>

      {/* iframe */}
      <div style={fullscreen ? {
        position: "fixed", top: 0, left: 0, width: "100vw",
        height: "100vh", zIndex: 1000, background: "#fff"
      } : {}}>
        {fullscreen && (
          <button
            onClick={() => setFullscreen(false)}
            style={{
              position: "fixed", top: 16, right: 16, zIndex: 1001,
              padding: "8px 16px", borderRadius: 8, background: "#7c3aed",
              color: "#fff", border: "none", cursor: "pointer", fontSize: 14
            }}
          >
            ✕ Close
          </button>
        )}
        <iframe
          srcDoc={code}
          sandbox="allow-scripts"
          style={{
            width: "100%",
            height: fullscreen ? "100vh" : 400,
            border: "none",
            display: "block"
          }}
          title="Live Preview"
        />
      </div>
    </div>
  );
}