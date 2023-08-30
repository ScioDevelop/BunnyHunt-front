import React, { useState } from 'react';
import React from 'react'

function ModalWindow() {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <div>
        {modalVisible && (
        <dialog className="modal" open>
          <div className="modal-content">
            <p>This is a modal window.</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default ModalWindow