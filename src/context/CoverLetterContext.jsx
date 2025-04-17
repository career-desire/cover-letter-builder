import React from 'react'
import { createContext, useState } from "react";

export const CoverLetterContext = createContext();

function CoverLetterProvider({ children }) {
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
            content: "Dear Mr./Ms.",
            sign: "",
            sample: "Hello World"
        },
        style: {
            theme: "#266CA9",
            fontName: "Arial",
            fontSize: "10",
            template: "Template1"
        },
        _id: null,
    });

    return (
        <CoverLetterContext.Provider value={{ coverLetter, setCoverLetter }} >
            {children}
        </CoverLetterContext.Provider>
    )
}

export default CoverLetterProvider