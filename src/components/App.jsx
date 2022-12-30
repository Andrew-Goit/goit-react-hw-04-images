
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import fetchPictures from './fetchPicturesApi';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
});

export const App =() => {
  // state = {
  //   pictures: [],
  //   isLoading: false,
  //   showModal: false,
  //   loadMore: false,
  //   error: null,
  //   searchQuery: '',
  //   pageNumber: 1,
  //   modalURL: '',
  // };
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalURL, setModalURL] = useState('');
   // const [error, setError] = useState(null);

  // async componentDidUpdate(_, prevState) {
  //   if (
  //     this.state.searchQuery !== prevState.searchQuery ||
  //     this.state.pageNumber !== prevState.pageNumber
  //   ) {
  //     this.setState({ isLoading: true });
  //     try {
  //       const pictures = await fetchPictures(
  //         searchQuery,
  //         pageNumber
  //       );
  //       this.setState({ loadMore: true });
  //       if (pictures.length === 0) {
  //         Notiflix.Notify.failure(
  //           'Sorry, there are no images matching your search query. Please try again.'
  //         );
  //         this.setState({ loadMore: false });
  //       }
  //       if (pictures.length < 12) {
  //         this.setState({ loadMore: false });
  //       }
  //       this.setState({
  //         pictures: [...this.state.pictures, ...pictures],
  //       });
  //     } catch (error) {
  //       this.setState({ error });
  //       console.log(error);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    const findPictures = fetchPictures(searchQuery, pageNumber);
    setLoadMore(true);

    findPictures
      .then(res => {
        if (res.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setLoadMore(false);
          setIsLoading(false);
        }
        if (res.length < 12) {
          setLoadMore(false);
          setIsLoading(false);
        }
        setPictures(prevPictures => [...prevPictures, ...res]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, pageNumber]);

  const formSubmitHandler = query => {
    setSearchQuery(query);
    setPageNumber(1);
    setPictures([]);
    setLoadMore(false);
  };

  const imageClickHandler = url => {
    setModalURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  // loadMoreHandler = pageNumber => {
  //   this.setState({ pageNumber });
  // };

  
  return (
    <div>
      <SearchBar onSubmit={formSubmitHandler} />
      <div className="gallery-wrap">
        <ImageGallery>
          {pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              picture={picture}
              onClick={imageClickHandler}
            ></ImageGalleryItem>
          ))}
        </ImageGallery>
        {loadMore && (
          <Button
            onClick={setPageNumber}
            page={pageNumber}
          ></Button>
        )}
      </div>
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalURL} alt={pictures.tags} />
        </Modal>
      )}
    </div>
  );
}
