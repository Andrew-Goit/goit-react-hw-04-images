import PropTypes from 'prop-types';
import '../Button/Button.css';

const Button = ({page, onClick}) => {
  let pageNumber = page;
  const handleClick = event => {
    pageNumber += 1;
    onClick(pageNumber);
  };

  return (
    <button type="button" className="loadMore" onClick={handleClick}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }