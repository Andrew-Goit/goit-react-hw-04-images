import PropTypes from 'prop-types';
import '../ImageGalleryItem/ImageGalleryItem.css';

const ImageGalleryItem = props => {
  const { largeImageURL, previewURL, tags } = props.picture;

  const handleImgClick = evt => {
    props.onClick(largeImageURL);
  };

  return (
    <li className="photo-card">
      <div className="img-wrap">
        <img
          className="image"
          src={previewURL}
          alt={tags}
          onClick={handleImgClick}
        />
      </div>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  pictures: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};