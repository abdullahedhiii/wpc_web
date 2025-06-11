import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

// Custom styles to be injected into the head
const customStyles = `
  .ql-toolbar.ql-snow {
    border-radius: 8px 8px 0 0;
    border: 1px solid #FCD34D !important;
    background: #FFFBEB;
    padding: 12px;
  }

  .ql-container.ql-snow {
    border-radius: 0 0 8px 8px;
    border: 1px solid #FCD34D !important;
    border-top: none !important;
    background: #FFFFFF;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  .ql-editor {
    font-size: 16px;
    line-height: 1.6;
    padding: 16px;
    max-height: 400px;
    overflow-y: auto;
  }

  .ql-editor:focus {
    box-shadow: 0 0 0 2px #FEF3C7;
  }

  .ql-toolbar button {
    margin: 0 2px;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .ql-toolbar button:hover {
    background-color: #FEF3C7;
  }

  .ql-toolbar button.ql-active,
  .ql-toolbar button:focus {
    background-color: #F59E0B;
    color: white;
  }

  .ql-toolbar button.ql-active .ql-stroke,
  .ql-toolbar button:focus .ql-stroke {
    stroke: white !important;
  }

  .ql-toolbar button.ql-active .ql-fill,
  .ql-toolbar button:focus .ql-fill {
    fill: white !important;
  }

  .ql-formats {
    margin-right: 12px !important;
  }

  .ql-tooltip {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #FCD34D !important;
  }

  .ql-tooltip input[type="text"] {
    border-radius: 4px;
    border: 1px solid #FCD34D;
    padding: 4px 8px;
  }

  .ql-tooltip a.ql-action,
  .ql-tooltip a.ql-remove {
    color: #D97706;
    font-weight: 500;
  }

  .ql-tooltip a.ql-action:hover,
  .ql-tooltip a.ql-remove:hover {
    text-decoration: underline;
  }
`;

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
  // "image",
  // "video",
];

const TextEditor = ({ content, setContent, label }) => {
  const quillRef = React.useRef(null);

  React.useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      editor
        .getModule("clipboard")
        .addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          // Block pasted images
          delta.ops = delta.ops.filter((op) => {
            if (op.insert && op.insert.image) {
              toast.error("Image pasting is disabled!");
              return false;
            }
            return true;
          });
          return delta;
        });
    }
  }, []);

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-2"
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
          className="rounded-lg transition-all duration-200 hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-yellow-200"
          style={{ 
            height: "400px",
            display: "flex",
            flexDirection: "column"
          }}
        />

        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {content?.length || 0} characters
        </div>
      </div>
    </motion.div>
  );
};

export default TextEditor;
