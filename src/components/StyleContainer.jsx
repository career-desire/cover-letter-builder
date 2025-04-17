import React, { useContext } from "react";
import "../styles/StyleContainer.css"
// import Template1 from "/images/templates/Template1.jpg";
// import Template2 from "/images/templates/Template2.jpg";
// import Template3 from "/images/templates/Template3.jpg";
// import Template4 from "/images/templates/Template4.jpg";
// import Template5 from "/images/templates/Template5.jpg";
// import Template6 from "/images/templates/Template6.jpg";
// import Template7 from "/images/templates/Template7.jpg";
// import Template8 from "/images/templates/Template8.jpg";
import { CoverLetterContext } from "../context/CoverLetterContext";

function StyleContainer({ styleMenuOpen }) {
  const { coverLetter, setCoverLetter } = useContext(CoverLetterContext);
  const { theme, fontName, fontSize, template } = coverLetter.style;

  //Handling user style settings

  const handleThemeChange = (newTheme) => {
    setCoverLetter((prev) => ({
      ...prev,
      style: { ...prev.style, theme: newTheme },
    }));
  };

  const handleFontNameChange = (event) => {
    const newFontName = event.target.value;
    setCoverLetter((prev) => ({
      ...prev,
      style: { ...prev.style, fontName: newFontName },
    }));
  };

  const handleFontSizeChange = (event) => {
    const newFontSize = event.target.value;
    setCoverLetter((prev) => ({
      ...prev,
      style: { ...prev.style, fontSize: newFontSize },
    }));
  };

  const handleTemplateChange = (newTemplate) => {
    setCoverLetter((prev) => ({
      ...prev,
      style: { ...prev.style, template: newTemplate },
    }));
  };

  // const templateArray = [
  //   { id: "Template1", src: Template1, text: "Template 1" },
  //   { id: "Template2", src: Template2, text: "Template 2" },
  //   { id: "Template3", src: Template3, text: "Template 3" },
  //   { id: "Template4", src: Template4, text: "Template 4" },
  //   { id: "Template5", src: Template5, text: "Template 5" },
  //   { id: "Template6", src: Template6, text: "Template 6" },
  //   { id: "Template7", src: Template7, text: "Template 7" },
  //   { id: "Template8", src: Template8, text: "Template 8" },
  // ];

  return (
    <div
      className="style-container"
      id={styleMenuOpen ? "style-open" : "style-close"}
    >
      {/* Theme Section */}
      <div className="style-section">
        <header className="style-header">
          <h1>Theme</h1>
        </header>
        <div className="style-body" id="theme-container">
          <div
            className="theme-option cd-blue"
            onClick={() => handleThemeChange("#266CA9")}
            id={theme === "#266CA9" ? "active" : "inactive"}
          ></div>
          <div
            className="theme-option black"
            onClick={() => handleThemeChange("#000000")}
            id={theme === "#000000" ? "active" : "inactive"}
          ></div>
          <div
            className="theme-option green"
            onClick={() => handleThemeChange("#2E8B57")}
            id={theme === "#2E8B57" ? "active" : "inactive"}
          ></div>
          <div
            className="theme-option yellow"
            onClick={() => handleThemeChange("#DAA520")}
            id={theme === "#DAA520" ? "active" : "inactive"}
          ></div>
          <div
            className="theme-option red"
            onClick={() => handleThemeChange("#8B0000")}
            id={theme === "#8B0000" ? "active" : "inactive"}
          ></div>
          <input type="color" onChange={(e) => handleThemeChange(e.target.value)} />
        </div>
      </div>

      {/* Font Section */}
      <div className="style-section">
        <header className="style-header">
          <h1>Font</h1>
        </header>
        <div className="style-body">
          <label htmlFor="font-type">Font: </label>
          <select name="font-name" value={fontName} onChange={handleFontNameChange}>
            <option value="Arial">Arial</option>
            <option value="Calibri">Calibri</option>
            <option value="Roboto">Roboto</option>
            <option value="DMSans">DM Sans</option>
            <option value="Helvetica">Helvetica</option>
            <option value="OpenSans">Open Sans</option>
            <option value="Poppins">Poppins</option>
            <option value="NotoSans">Noto Sans</option>
            <option value="Montserrat">Montserrat</option>
            <option value="PlusJakartaSans">Plus Jakarta Sans</option>
          </select>
        </div>
        <div className="style-body">
          <label htmlFor="font-size">Font size: </label>
          <select name="font-size" value={fontSize} onChange={handleFontSizeChange}>
            <option value="8">8px</option>
            <option value="9">9px</option>
            <option value="10">10px</option>
            <option value="10.5">10.5px</option>
            <option value="11">11px</option>
            <option value="11.5">11.5px</option>
            <option value="12">12px</option>
            <option value="12.5">12.5px</option>
            <option value="13">13px</option>
            <option value="13.5">13.5px</option>
            <option value="14">14px</option>
            <option value="14.5">14.5px</option>
          </select>
        </div>
      </div>

      {/* Template Selection */}
      {/* <div className="style-section">
        <header className="style-header">
          <h1>Templates</h1>
        </header>
        <div className="style-body template-container">
          {templateArray.map((item, index) => (
            <div 
              className="template-div" 
              key={index}
            >
              <img
                src={item.src}
                alt={`${item.text} preview`}
                className="template-image"
                id={template === item.id ? "active" : "inactive"}
                onClick={() => handleTemplateChange(item.id)}
              />
              <p className="template-number">{item.text}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default StyleContainer;
