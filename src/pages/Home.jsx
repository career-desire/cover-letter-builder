import React, { useState } from 'react';
import '../styles/Home.css'
import FieldContainer from '../components/FieldContainer';
import Preview from '../components/Preview';
import { DownloadBtn } from "../utils/DownloadBtn.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faXmark } from '@fortawesome/free-solid-svg-icons';
import StyleContainer from '../components/StyleContainer.jsx';


function Home() {
    const [styleMenuOpen, setStyleMenuOpen] = useState(false);
    const [openEditor, setOpenEditor] = useState("");
    
    //Handle editor toggle
    const toggleMenu = () => {
        setStyleMenuOpen((prev) => !prev);
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
                <DownloadBtn />
                <FontAwesomeIcon
                    icon={styleMenuOpen ? faXmark : faPalette}
                    className="menu-icon"
                    onClick={toggleMenu}
                    title="Style Customization"
                />
            </div>
        </div>
    );
}

export default Home;
