import React, { useState } from "react";
import "../styles/Warning.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Warning({ warnText, actionTextOne, actionTextTwo = null, cancelText = null, actionOne, actionTwo = null, noAction = null }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="warning-container">
            <div className="warning slide-in-blurred-top" tabIndex={0} onClick={(e) => e.stopPropagation()}>
                <p>{warnText}</p>
                {noAction &&
                    <div className="close-btn" onClick={noAction}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                }
                <div className="warn-btns">
                    {cancelText && <button className="no-btn" onClick={() => { noAction && noAction(); handleClose(); }}>{cancelText}</button>}
                    {actionTextTwo && <button className="no-btn" onClick={() => { actionTwo(); handleClose(); }}>{actionTextTwo}</button>}
                    {actionTextOne && <button className="yes-btn" onClick={() => { actionOne(); handleClose(); }}>{actionTextOne}</button>}
                </div>
            </div>
        </div>
    );
}

export default Warning;
