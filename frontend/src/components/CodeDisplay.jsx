import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeDisplay({ code, darkMode, tab, setTab, download }) {
  const copy = () => {
    navigator.clipboard.writeText(code);
  };

  const getDisplayCode = () => {
    if (tab === "css") {
      const match = code.match(/<style>([\s\S]*?)<\/style>/);
      return match ? match[1].trim() : "/* no CSS found */";
    }
    if (tab === "js") {
      const match = code.match(/<script>([\s\S]*?)<\/script>/);
      return match ? match[1].trim() : "// no JS found";
    }
    return code;
  };

  const getLang = () => {
    if (tab === "css") return "css";
    if (tab === "js") return "javascript";
    return "html";
  };

  const tabs = ["code", "css", "js"];

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${darkMode ? "#2a2a2a" : "#ddd"}`,
      overflow: "hidden",
      background: darkMode ? "#111" : "#fff"
    }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: `1px solid ${darkMode ? "#2a2a2a" : "#ddd"}`,
        background: darkMode ? "#1a1a1a" : "#f9f9f9"
      }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "4px 14px", borderRadius: 6, border: "none",
                cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: tab === t ? "#7c3aed" : "transparent",
                color: tab === t ? "#fff" : darkMode ? "#888" : "#555",
              }}
            >
              {t === "code" ? "HTML" : t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={copy} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12,
            border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
            background: "transparent", cursor: "pointer",
            color: darkMode ? "#ccc" : "#555"
          }}>
            📋 Copy
          </button>
          <button onClick={() => download("html")} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12,
            border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
            background: "transparent", cursor: "pointer",
            color: darkMode ? "#ccc" : "#555"
          }}>
            ⬇️ HTML
          </button>
          <button onClick={() => download("css")} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12,
            border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
            background: "transparent", cursor: "pointer",
            color: darkMode ? "#ccc" : "#555"
          }}>
            ⬇️ CSS
          </button>
          <button onClick={() => download("js")} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12,
            border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
            background: "transparent", cursor: "pointer",
            color: darkMode ? "#ccc" : "#555"
          }}>
            ⬇️ JS
          </button>
        </div>
      </div>

      {/* Code */}
      <div style={{ maxHeight: 450, overflowY: "auto" }}>
        <SyntaxHighlighter
          language={getLang()}
          style={darkMode ? vscDarkPlus : prism}
          showLineNumbers
          customStyle={{ margin: 0, borderRadius: 0, fontSize: 13 }}
        >
          {getDisplayCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}