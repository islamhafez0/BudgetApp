import React from 'react'
import  ReactDOM  from 'react-dom'
import './modal.css'
const Modal = ({ visible, children, closeModal }) => {
    if(!visible) {
        return null
    }
  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal' onClick={(e) => e.stopPropagation() }>
        { children }
      </div>
    </div>,
    document.querySelector("#modals")
  )
}

export default Modal