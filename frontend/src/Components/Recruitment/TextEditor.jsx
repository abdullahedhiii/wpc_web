import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "color",
  "background",
  "link",
  "image",
  "video",
];

const TextEditor = ({ content, setContent }) => {
  return (
    <div className="mt-4">
      <ReactQuill
        value={content} 
        onChange={setContent}  
        modules={modules}
        formats={formats}
        theme="snow"
        style={{
          minHeight: "100px", 
          overflowY: "auto",  
          width: "100%",
        }}
      />
    </div>
  );
};

export default TextEditor;
