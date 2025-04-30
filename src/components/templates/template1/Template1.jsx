import React, { useContext } from 'react'
import { CoverLetterContext } from '../../../context/CoverLetterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from "dompurify";
import WaterMark from "/images/CD_Logo.png"
import "./Template1.css"
import { Link } from 'react-router-dom';

function Template1({ setOpenEditor }) {
    const { coverLetter } = useContext(CoverLetterContext);
    const coverLetterData = coverLetter.coverLetterData;
    const { fontName, fontSize, theme } = coverLetter.style;
    const { email, phone, linkedin, gitHub, portfolio, blogs } = coverLetterData

    return (
        <div className="cover-letter" style={{ fontFamily: fontName, fontSize: `${fontSize}px` }}>
            <header className="cl-header">
                <p
                    className="name"
                    style={{ color: theme, fontSize: `${Number(fontSize) + 12}px` }}
                >
                    {coverLetterData.name}
                </p>
                <p
                    className="job-title"
                    style={{ fontSize: `${Number(fontSize) + 6}px` }}
                >
                    {coverLetterData.jobTitle || ""}
                </p>
                {(email || phone || linkedin || gitHub || portfolio || blogs) &&
                    (<div className="link-container">
                        <p>{email}</p>
                        <p>{phone}</p>
                        <p>{linkedin}</p>
                        <p>{gitHub}</p>
                        <p>{portfolio}</p>
                        <p>{blogs}</p>
                    </div>)
                }
            </header>
            <section className="cl-body">
                {coverLetterData.date &&
                    <div className="date">{`Date: ${coverLetterData.date}`}</div>
                }
                {coverLetterData.receiver &&
                    <div className="receiver">{`Hiring Manager’s Name: ${coverLetterData.receiver}`}</div>
                }
                {coverLetterData.location &&
                    <div className="location">{`Address: ${coverLetterData.location}`}</div>
                }
                {coverLetterData.content !== "Dear Mr./Ms." ? (
                    <>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(coverLetterData.content),
                            }}
                            className="resume-quill-content"
                        />
                        {coverLetterData.name &&
                            <div className="sign">
                                <p>Sincerely,</p>
                                <p>{coverLetterData.name}</p>
                            </div>
                        }
                    </>
                ) : null}
                <img className="watermark-img" src={WaterMark} alt="Career desire watermark" />
                <div className='watermark-text-container'>
                    <p className='watermark-text'>Powered by </p>
                    <Link href="https://careerdesire.in/"><p>www.careerdesire.in</p></Link>
                </div>
            </section>
            <div className="editor flex-center">
                <div className="head-editor flex-center">
                    <div
                        className='flex-center'
                        style={{ gap: "10px", cursor: "pointer", padding: "10px" }}
                        onClick={() => setOpenEditor("header")}>
                        <FontAwesomeIcon icon={faPen} />
                        <h5>Edit Header</h5>
                    </div>
                </div>
                <div className="content-editor flex-center">
                    <div
                        className='flex-center'
                        style={{ gap: "10px", cursor: "pointer", padding: "10px" }}
                        onClick={() => setOpenEditor("content")}>
                        <FontAwesomeIcon icon={faPen} />
                        <h5>Edit Content</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template1