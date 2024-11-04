"use client";
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import classes from './pdfPopup.module.css';
const PdfPopup = ({ showPdfPopup, pdfUrl, closePdfPopup }) => {
  const handlePopupClose = () => {
    closePdfPopup(false)
  }
  return (
    <>
      <Modal show={showPdfPopup} onHide={handlePopupClose} size="lg">
        <Modal.Header>
          <button
            onClick={handlePopupClose}
            type="button"
            className={`z-50  ${classes?.header_pop_close}`}
            data-dismiss="modal"
            aria-label="Close"
          >
            <Image
              src="https://s3.ap-south-1.amazonaws.com/ilwebsite2.devinfinitylearn.in/loginPopUp/images/mobVer/closeIcon.svg"
              alt="cross"
              width={18}
              height={18}
            />
          </button>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'none !important' }}>
          <div>
            <iframe src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}"`} width="100%" height="600px"></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PdfPopup
