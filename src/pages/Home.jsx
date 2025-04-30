import React, { useContext, useEffect, useState } from 'react';
import '../styles/Home.css'
import FieldContainer from '../components/FieldContainer';
import Preview from '../components/Preview';
import { DownloadBtn } from "../utils/DownloadBtn.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import StyleContainer from '../components/StyleContainer.jsx';
import { CoverLetterContext } from '../context/CoverLetterContext.jsx';
import Warning from '../layout/Warning.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { getCoverLetterById, saveCoverLetter, updateCoverLetter } from '../services/coverLetterService.js';
import { AlertContext } from '../context/AlertContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';


function Home() {
    const [openEditor, setOpenEditor] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [styleMenuOpen, setStyleMenuOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const { setAlert, setAlertMessage } = useContext(AlertContext);
    const { coverLetter, setCoverLetter, isContentFilled } = useContext(CoverLetterContext);
    const navigate = useNavigate();
    const { id } = useParams();

    // Use fetch from dashboard
    useEffect(() => {
        if (!id) return;

        const fetchResume = async () => {
            try {
                const data = await getCoverLetterById(id);
                setCoverLetter(data);
            } catch (error) {
                console.error("Failed to fetch resume:", error);
            }
        };

        fetchResume();
    }, [id, user]);

    if (loading) return (
        <div className="site-loader">
            <div className="loader"></div>
        </div>
    );

    //Handle editor toggle
    const toggleMenu = () => {
        setStyleMenuOpen((prev) => !prev);
    };

    //Save coverLetter in database
    const handleSaveCoverLetter = () => {

        if (!coverLetter._id) {
            if (!user) {
                setShowWarning("login")
            } else {
                setShowWarning("save")
            }
        } else {
            setShowWarning("update");
        }
    };

    //Handle existing coverLetter
    const confirmSaveNew = () => {
        setShowWarning(false);
        saveCoverLetter({ coverLetterData: coverLetter.coverLetterData, style: coverLetter.style }, setCoverLetter, setAlert, setAlertMessage);
    };

    const confirmUpdate = () => {
        setShowWarning(false);
        updateCoverLetter(coverLetter._id, { coverLetterData: coverLetter.coverLetterData, style: coverLetter.style }, setCoverLetter, setAlert, setAlertMessage);
    };

    return (
        <div className='home'>
            <Preview setOpenEditor={setOpenEditor} />
            <FieldContainer openEditor={openEditor} setOpenEditor={setOpenEditor} />
            <StyleContainer styleMenuOpen={styleMenuOpen} />
            <div
                className="menu-icon-container"
                id={styleMenuOpen ? "menu-icon-open" : "menu-icon-close"}
            >
                <FontAwesomeIcon
                    icon={styleMenuOpen ? faXmark : faPalette}
                    className="menu-icon"
                    onClick={toggleMenu}
                    title="Style Customization"
                />
                <FontAwesomeIcon
                    icon={faSave}
                    className='menu-icon'
                    onClick={handleSaveCoverLetter}
                />
                <DownloadBtn />
            </div>
            {showWarning === "save" && (
                <Warning
                    warnText="Do you want to save?"
                    actionTextOne="Save"
                    cancelText="Cancel"
                    actionOne={confirmSaveNew}
                    noAction={() => setShowWarning(false)}
                />
            )}
            {showWarning === "update" && (
                <Warning
                    warnText="Do you want to Save a new copy or Update the existing one?"
                    actionTextOne="Save New"
                    actionTextTwo="Update"
                    actionOne={confirmSaveNew}
                    actionTwo={confirmUpdate}
                    noAction={() => setShowWarning(false)}
                />
            )}
            {showWarning === "login" && (
                <Warning
                    warnText="Login to save your progress"
                    actionTextOne="Login"
                    cancelText="Cancel"
                    actionOne={() => navigate("/login", { state: { from: location.pathname } })}
                    noAction={() => setShowWarning(false)}
                />
            )}
            {isContentFilled &&
                <Warning
                    warnText="Oops! Page limit reached"
                    cancelText="Close"
                />
            }
        </div>
    );
}

export default Home;
