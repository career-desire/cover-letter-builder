import React, { useContext, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateCoverLetter } from "../../utils/handleUpdate";
import { CoverLetterContext } from "../../context/CoverLetterContext";

function ContentTab({ setOpenEditor }) {
  const { coverLetter, setCoverLetter } = useContext(CoverLetterContext);
  const { coverLetterData } = coverLetter || {};
  const quillRef = useRef(null);

  return (
    <div className="editor-container flex-center">
      <div className="tab-panel quill-field flex-center">
      <h3>Content</h3>
        <ReactQuill
          ref={quillRef}
          type="text"
          name="content"
          placeholder="Write Your Content Here"
          value={coverLetterData?.content || ""}
          onChange={(content) =>
            updateCoverLetter(setCoverLetter, {
              field: "content",
              value: content,
            })
          }
          theme="snow"
          className="form-quill"
        />
        <button
          type="button"
          className="btn"
          onClick={() => {
            updateCoverLetter(setCoverLetter, {
              field: "content",
              value: "",
            });
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
                <button className="close" onClick={() => setOpenEditor("")}><FontAwesomeIcon icon={faXmark}/></button>
      </div>
    </div>
  );
}

export default ContentTab;
