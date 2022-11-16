import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import Button from './Button/Button';
import fetchImagesAPI from './helps/fetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const [error, setError] = useState('');
  const [largeImage, setLargeImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const filterImages = images =>
    images.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

  const getSearchQuery = newQuery =>
    searchQuery !== newQuery ? setSearchQuery(newQuery) : '';

  const onLoadMore = () => setPage(prev => prev + 1);

  const closeModal = () => setIsModalOpen(prev => !prev);

  const isLoadToggle = () => setIsLoad(prev => !prev);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    isLoadToggle();

    fetchImagesAPI(searchQuery, page)
      .then(imgArray => {
        const filteredImg = filterImages(imgArray);

        return filteredImg;
      })
      .then(filteredImgArray => {
        setImages(prev => [...prev, ...filteredImgArray]);
      })
      .catch(err => {
        setError(err);
        console.log(error);
      })
      .finally(() => isLoadToggle());
  }, [error, page, searchQuery]);

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setIsModalOpen(true);
  };

  const barStyle = {
    margin: '0  auto',
  };

  return (
    <div className="App">
      <Searchbar onSubmit={getSearchQuery}>
        <Button type="submit" label="Search image" classNameButton="Button" />
      </Searchbar>

      {images.length > 0 && (
        <>
          <ImageGallery getLargeImage={getLargeImage} images={images} />
          {isLoad ? (
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={barStyle}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          ) : (
            <Button
              onLoadMore={onLoadMore}
              type="button"
              label="Load more"
              classNameButton="Button"
            />
          )}
        </>
      )}
      {isModalOpen && <Modal closeModal={closeModal} largeImage={largeImage} />}
    </div>
  );
};

export default App;
