import React, { useContext } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import { updateCoverLetter } from "../../utils/handleUpdate";

function BasicTab({ setOpenEditor }) {
  const { coverLetter, setCoverLetter } = useContext(CoverLetterContext);
  const { coverLetterData } = coverLetter || {};

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "jobTitle", label: "Designation", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "linkedin", label: "Linkedin", type: "text" },
    { name: "gitHub", label: "Git Hub", type: "text" },
    { name: "portfolio", label: "Portfolio", type: "text" },
    { name: "blogs", label: "Blogs", type: "text" },
    { name: "receiver", label: "Receiver's Name", type: "text" },
    { name: "company", label: "Company's Name", type: "text" },
  ];

  return (
    <div className="editor-container flex-center">
      <div className="tab-panel flex-center">
        <h3>Basic Information</h3>
        {fields.map((field) => (
          <div className="floating-label-input" key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder=" "
              value={coverLetterData[field.name]}
              onChange={(e) =>
                updateCoverLetter(setCoverLetter, {
                  field: field.name,
                  value: e.target.value,
                })
              }
              className="form-input"
              required={field.required}
            />
            <label>{field.label}</label>
          </div>
        ))}
        <div className="floating-label-input">
          <input
            type="date"
            name="date"
            value={coverLetterData.date}
            onChange={(e) =>
              updateCoverLetter(setCoverLetter, {
                field: "date",
                value: e.target.value,
              })
            }
            className="form-input"
          />
        </div>
        <div className="btn-container">
          <button className="btn close" onClick={() => setOpenEditor("")}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicTab;
