import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={() => onClick(largeImageURL)}
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onclick: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.func.isRequired,
  ]),
};
