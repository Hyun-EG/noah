// app/post/create/_components/Editor.tsx
"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// react-quill-new를 동적으로 import
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Editor = ({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  className = "",
}: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/post/admin/upload-image", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          if (data.url) {
            // DOM에서 직접 Quill 에디터 찾기
            const quillEditor = editorRef.current?.querySelector(
              ".ql-editor"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any;
            if (quillEditor) {
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const img = document.createElement("img");
                img.src = data.url;
                range.insertNode(img);
              }
            }
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    };
  };

  // Quill 에디터 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "code-block",
  ];

  return (
    <div ref={editorRef} className={`quill-editor ${className}`}>
      <ReactQuill
        className="h-64 mb-10 laptop:h-96 desktop:h-96"
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
