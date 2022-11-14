import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modal = document.querySelector('#rootModal');

const Modal = ({ closeModal, largeImage }) => {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeModal]);

  const onClose = e => {
    e.preventDefault();

    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={onClose} className="Overlay">
      <div className="Modal">
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modal
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default Modal;
