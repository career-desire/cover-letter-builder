// This component handle preview and zoom operations

import React, { useEffect, useRef, useState } from 'react';
import '../styles/Preview.css';
import { MagnifyingGlassMinus, MagnifyingGlassPlus } from "phosphor-react";
import Template1 from './templates/template1/Template1';

function Preview({ setOpenEditor }) {
    const [screenSize, setScreenSize] = useState(1);
    const [zoomLimit, setZoomLimit] = useState({ min: 0.4, max: 2 });
    const [fitScreenSize, setFitScreenSize] = useState(1);
    const [isFitScreen, setIsFitScreen] = useState(false);
    const resizeTimeoutRef = useRef(null);

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const handleZoomIn = () => {
        setScreenSize((prev) => clampValue(prev + 0.1, zoomLimit.min, zoomLimit.max));
    };

    const handleZoomOut = () => {
        setScreenSize((prev) => clampValue(prev - 0.1, zoomLimit.min, zoomLimit.max));
    };

    const updateZoomForWidth = () => {
        const width = window.innerWidth;
        let zoomConfig;

        if (width < 600) {
            zoomConfig = { scale: 0.6, max: 0.8 };
        } else if (width < 710) {
            zoomConfig = { scale: 0.7, max: 1 };
        } else if (width < 790) {
            zoomConfig = { scale: 0.8, max: 1.2 };
        } else if (width < 940) {
            zoomConfig = { scale: 0.9, max: 1.3 };
        } else if (width < 1070) {
            zoomConfig = { scale: 1, max: 1.6 };
        } else if (width < 1150) {
            zoomConfig = { scale: 1, max: 1.8 };
        } else {
            zoomConfig = { scale: 1.2, max: 2 };
        }

        setFitScreenSize(zoomConfig.scale);
        setZoomLimit({ min: Math.max(0.4, zoomConfig.scale * 0.5), max: zoomConfig.max });

        if (!isFitScreen) {
            setScreenSize(clampValue(zoomConfig.scale * 0.8, zoomLimit.min, zoomConfig.max));
        }
    };

    const handleFitScreen = () => {
        setScreenSize(isFitScreen ? fitScreenSize * 0.8 : fitScreenSize);
        setIsFitScreen(!isFitScreen);
    };

    useEffect(() => {
        updateZoomForWidth();

        const handleResize = () => {
            clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = setTimeout(updateZoomForWidth, 100);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(resizeTimeoutRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [isFitScreen]);

    return (
        <div className="preview-container">
            <div className="zoom-container">
                <div className="zoom-option" style={{ margin: "10px" }}>
                    <button onClick={handleZoomIn} disabled={screenSize >= zoomLimit.max}>
                        <MagnifyingGlassPlus size={30} />
                    </button>
                    <button onClick={handleFitScreen} className="fit-screen-btn">
                        {isFitScreen ? "Default" : "Fit"}
                    </button>
                    <button onClick={handleZoomOut} disabled={screenSize <= zoomLimit.min}>
                        <MagnifyingGlassMinus size={30} />
                    </button>
                </div>

                <div
                    className="zoom"
                    style={{
                        transform: `scale(${screenSize})`,
                        transition: "transform 0.2s ease-in-out",
                        transformOrigin: "top center",
                    }}
                >
                    <Template1 setOpenEditor={setOpenEditor} />
                </div>
            </div>
        </div>
    );
}

export default Preview;