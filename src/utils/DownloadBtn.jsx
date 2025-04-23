"use client";
import { motion, useAnimation } from "framer-motion";
import jsPDF from "jspdf";
import { useContext, useState } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

const arrowVariants = {
  normal: { y: 0 },
  animate: {
    y: 2,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const loadFont = async (url) => {
  try {
    const response = await fetch(url);
    const fontBuffer = await response.arrayBuffer();
    return btoa(
      new Uint8Array(fontBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  } catch (error) {
    console.error("Failed to load font:", url, error);
    return null;
  }
};

const DownloadBtn = () => {
  const controls = useAnimation();
  const [isDownloading, setIsDownloading] = useState(false);
  const { coverLetter } = useContext(CoverLetterContext);
  const { style } = coverLetter;
  const { fontName } = style;

  const downloadResumeAsPDF = async () => {
    const img = document.getElementsByClassName("watermark-img")[0];
    if (!img) {
      alert("Refresh and try again");
      return;
    }

    const imgAttri = img.getAttribute("src");
    img.style.display = "flex";

    if (imgAttri !== "/images/CD_Logo.png") {
      alert("Invalid watermark. Refresh and try again.");
      return;
    }

    setIsDownloading(true);

    const source = document.querySelector(".cover-letter");
    const name = coverLetter.coverLetterData.name;
    const pdf = new jsPDF("p", "pt", "a4", { pdfVersion: "2.0" });

    // Load all fonts concurrently
    const [fontBase64, boldFontBase64, italicFontBase64, boldItalicFontBase64] = await Promise.all([
      loadFont(`/fonts//${fontName}/${fontName}.ttf`),
      loadFont(`/fonts//${fontName}/${fontName}-Bold.ttf`),
      loadFont(`/fonts//${fontName}/${fontName}-Italic.ttf`),
      loadFont(`/fonts//${fontName}/${fontName}-BoldItalic.ttf`),
    ]);

    // Abort if font loading failed
    if (!fontBase64 || !boldFontBase64 || !italicFontBase64 || !boldItalicFontBase64) {
      alert("Error loading fonts. Please refresh and try again.");
      setIsDownloading(false);
      return;
    }

    // Register fonts with jsPDF
    pdf.addFileToVFS(`${fontName}.ttf`, fontBase64);
    pdf.addFont(`${fontName}.ttf`, fontName, "normal");
    pdf.addFileToVFS(`${fontName}-Bold.ttf`, boldFontBase64);
    pdf.addFont(`${fontName}-Bold.ttf`, fontName, "bold");
    pdf.addFileToVFS(`${fontName}-Italic.ttf`, italicFontBase64);
    pdf.addFont(`${fontName}-Italic.ttf`, fontName, "italic");
    pdf.addFileToVFS(`${fontName}-BoldItalic.ttf`, boldItalicFontBase64);
    pdf.addFont(`${fontName}-BoldItalic.ttf`, fontName, "bolditalic");

    // Generate PDF
    pdf.html(source, {
      callback: function (doc) {
        doc.save(name ? `${name}'s_cover_letter.pdf` : "cover_letter.pdf");
        setIsDownloading(false);
      },
      html2canvas: {
        dpi: 300,
        scale: 1,
        useCORS: true,
      },
      autoPaging: "text",
      margin: 30,
      tagHandlers: {
        STRONG: (el, renderer) => {
          renderer.pdf.setFont(fontName, "bold");
        },
        EM: (el, renderer) => {
          renderer.pdf.setFont(fontName, "italic");
        },
        "STRONG EM": (el, renderer) => {
          renderer.pdf.setFont(fontName, "bolditalic");
        },
        "EM STRONG": (el, renderer) => {
          renderer.pdf.setFont(fontName, "bolditalic");
        },
      },
    });
  };

  return (
    <div
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      onClick={downloadResumeAsPDF}
      className="download-btn menu-icon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g variants={arrowVariants} animate={controls}>
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </motion.g>
      </svg>
    </div>
  );
};

export { DownloadBtn };