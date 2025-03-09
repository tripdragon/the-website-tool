import { useInspectorStore } from "./useInspectorStore";

export default function SelectedElement() {
  const selectedElement = useInspectorStore((state) => state.selectedElement);

  if (!selectedElement) return <p>No element selected.</p>;

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
      <h3>Selected Element:</h3>
      <p>
        <strong>Tag:</strong> {selectedElement.tagName.toLowerCase()}
      </p>
      <p>
        <strong>Class:</strong> {selectedElement.className || "None"}
      </p>
    </div>
  );
}
