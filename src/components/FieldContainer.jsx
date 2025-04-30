import React from 'react'
import BasicTab from '../components/sectionsFields/BasicTab.jsx'
import ContentTab from '../components/sectionsFields/ContentTab.jsx'
import '../styles/FieldContainer.css'

function FieldContainer({ openEditor, setOpenEditor }) {

  return (
    <>
      {openEditor === "header" && <BasicTab setOpenEditor={setOpenEditor} />}
      {openEditor === "content" && <ContentTab setOpenEditor={setOpenEditor} />}
    </>
  )
}

export default FieldContainer;