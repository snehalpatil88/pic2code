export default function UploadZone({ onImage, image, darkMode, loading }) {
  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => !loading && document.getElementById("file-in").click()}
      style={{
        border: `2px dashed ${darkMode ? "#444" : "#ccc"}`,
        borderRadius: 12, cursor: loading ? "wait" : "pointer",
        overflow: "hidden", position: "relative",
        background: darkMode ? "#1a1a1a" : "#f9f9f9",
        minHeight: 220,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
    >
      {image ? (
        <div style={{ width: "100%", position: "relative" }}>
          <img src={image} alt="Uploaded"
            style={{ width: "100%", maxHeight: 300, objectFit: "contain", display: "block" }} />
          {loading && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12
            }}>
              <div style={{
                width: 40, height: 40, border: "4px solid #7c3aed",
                borderTop: "4px solid transparent",
                borderRadius: "50%", animation: "spin 1s linear infinite"
              }} />
              <span style={{ color: "#fff", fontSize: 14 }}>Generating code...</span>
            </div>
          )}
          {!loading && (
            <div style={{
              position: "absolute", bottom: 8, right: 8,
              background: "rgba(0,0,0,0.6)", color: "#fff",
              fontSize: 11, padding: "4px 10px", borderRadius: 6
            }}>
              Click to change
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
          <p style={{ margin: 0, fontSize: 16, color: darkMode ? "#888" : "#666" }}>
            Drop a UI screenshot here
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: darkMode ? "#555" : "#999" }}>
            or click to browse
          </p>
        </div>
      )}
      <input id="file-in" type="file" accept="image/*" hidden
        onChange={(e) => handleFile(e.target.files[0])} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}