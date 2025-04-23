import React, { useContext, useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateCoverLetter } from "../../utils/handleUpdate";
import { CoverLetterContext } from "../../context/CoverLetterContext";

function ContentTab({ setOpenEditor }) {
  const { coverLetter, setCoverLetter } = useContext(CoverLetterContext);
  const { coverLetterData } = coverLetter || {};
  const quillRef = useRef(null);
  const dummyRef = useRef(null);

  const [editorContent, setEditorContent] = useState(coverLetterData?.content || "");
  const [isPageLimitReached, setIsPageLimitReached] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (dummyRef.current) {
        const header = document.querySelector(".cl-header");
        const headerHeight = header.offsetHeight;
        const dummyHeight = dummyRef.current.offsetHeight;
        const totalHeight = headerHeight + dummyHeight
        setIsPageLimitReached(totalHeight > 1500);
      }
    };

    checkHeight();

    const observer = new ResizeObserver(checkHeight);
    if (dummyRef.current) observer.observe(dummyRef.current);

    return () => observer.disconnect();
  }, [editorContent]);

  const clearContent = () => {
    setEditorContent("");
  };

  const handleOkClick = () => {
    if (!isPageLimitReached) {
      updateCoverLetter(setCoverLetter, {
        field: "content",
        value: editorContent,
      });
      setOpenEditor("");
    }
  };

  return (
    <div className="editor-container flex-center">
      <div className="tab-panel quill-field flex-center">
        <h3>Content</h3>

        <ReactQuill
          ref={quillRef}
          placeholder="Write Your Content Here"
          value={editorContent}
          onChange={setEditorContent}
          theme="snow"
          className="form-quill"
        />

        {isPageLimitReached && (
          <p className="limit-warning">Page limit reached. Content won't be saved until reduced.</p>
        )}

        <div className="btn-container">
          <button type="button" className="btn" onClick={clearContent}>Clear</button>
          <button type="button" className="btn close" onClick={handleOkClick}>OK</button>
        </div>
      </div>

      {/* Dummy div to measure height */}
      <div
        ref={dummyRef}
        className="dummy-measurer"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      />
    </div>
  );
}

export default ContentTab;
