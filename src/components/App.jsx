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
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const getSearchQuery = newQuery =>
    searchQuery !== newQuery ? setSearchQuery(newQuery) : '';

  const filterImages = images =>
    images.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchImagesAPI(searchQuery, page)
      .then(imgArray => {
        isLoadToggle();

        const filteredImg = filterImages(imgArray);

        return filteredImg;
      })
      .then(filteredImgArray =>
        setImages(prev => [...prev, ...filteredImgArray])
      )
      .catch(error => setError(error))
      .finally(() => isLoadToggle());
  }, [page, searchQuery]);

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setIsModalOpen(true);
  };

  const onLoadMore = () => setPage(prev => prev + 1);

  const closeModal = () => setIsModalOpen(prev => !prev);

  const isLoadToggle = () => setIsLoad(prev => !prev);

  const barStyle = {
    margin: '0  auto',
  };

  return (
    <div className="App">
      <Searchbar onSubmit={getSearchQuery}>
        <Button type="submit" label="Search image" classNameButton="Button" />
      </Searchbar>
      {images.length > 0 && !isLoad && (
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
