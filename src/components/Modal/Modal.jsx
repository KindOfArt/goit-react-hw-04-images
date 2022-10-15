import PropTypes from 'prop-types';

import { Component } from 'react';
import { createPortal } from 'react-dom';

const modal = document.querySelector('#rootModal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onClose = e => {
    e.preventDefault();

    const { closeModal } = this.props;

    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  onEscPress = e => {
    const { closeModal } = this.props;

    if (e.code === 'Escape') {
      closeModal();
    }
  };

  render() {
    const { largeImage } = this.props;

    return createPortal(
      <div onClick={this.onClose} className="Overlay">
        <div className="Modal">
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modal
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
