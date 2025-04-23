import React, { createContext, useEffect, useState } from "react";

export const CoverLetterContext = createContext();

function CoverLetterProvider({ children }) {
  const [isContentFilled, setIsContentFilled] = useState(false);
  const [coverLetter, setCoverLetter] = useState({
    coverLetterData: {
      name: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      gitHub: "",
      portfolio: "",
      blogs: "",
      date: "",
      receiver: "",
      sign: "",
      content: "Dear Mr./Ms.",
    },
    style: {
      theme: "#266CA9",
      fontName: "Arial",
      fontSize: "10",
      template: "Template1",
    },
    _id: null,
  });

  useEffect(() => {
    const savedCoverLetter = localStorage.getItem("coverLetter");
    if (savedCoverLetter) {
      setCoverLetter(JSON.parse(savedCoverLetter));
    }
  }, []);

  return (
    <CoverLetterContext.Provider
      value={{ coverLetter, setCoverLetter, isContentFilled, setIsContentFilled }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
}

export default CoverLetterProvider;
