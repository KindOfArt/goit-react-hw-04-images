import axios from 'axios';
import { Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    largeImage: null,
    isModalOpen: false,
    isload: false,
  };

  async componentDidUpdate(
    _,
    { searchQuery: prevSearchQuery, page: prevPage }
  ) {
    const { searchQuery: newSearchQuery, page: newPage } = this.state;

    if (prevSearchQuery !== newSearchQuery) {
      this.setState({ page: 1 });

      let images = await this.fetchImages(newSearchQuery, newPage);

      images = this.filterImages(images);

      this.setState({ images });
    }

    if (prevPage !== newPage) {
      let images = await this.fetchImages(newSearchQuery, newPage);

      images = this.filterImages(images);

      this.setState(({ images: prevImages }) => ({
        images: [...prevImages, ...images],
      }));
    }
  }

  getSearchQuery = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery });
    }
  };

  fetchImages = async (searchQuery, page) => {
    axios.defaults.baseURL = 'https://pixabay.com/api';

    const params = {
      key: '28415242-e0e8b03e245983e2ec7e6c358',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    };

    try {
      this.isloadToggle();

      const {
        data: { hits },
      } = await axios.get(`/?q=${searchQuery}&page=${page}`, {
        params,
      });

      return hits;
    } catch (error) {
      console.log(error);
    } finally {
      this.isloadToggle();
    }
  };

  filterImages = images => {
    return images.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
  };

  onLoadMore = () => {
    this.setState(({ page: prevPage }) => ({ page: prevPage + 1 }));
  };

  getLargeImage = largeImage => {
    this.setState({ largeImage, isModalOpen: true });
  };

  closeModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  isloadToggle = () => {
    this.setState(({ isload }) => ({ isload: !isload }));
  };

  render() {
    const { images, isModalOpen, isload } = this.state;

    const barStyle = {
      margin: '0  auto',
    };

    return (
      <div className="App">
        <Searchbar onSubmit={this.getSearchQuery}>
          <Button type="submit" label="Search image" classNameButton="Button" />
        </Searchbar>
        {images.length > 0 && (
          <>
            <ImageGallery
              getLargeImage={this.getLargeImage}
              images={this.state.images}
            />
            {isload ? (
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
                onLoadMore={this.onLoadMore}
                type="button"
                label="Load more"
                classNameButton="Button"
              />
            )}
          </>
        )}
        {isModalOpen && (
          <Modal
            closeModal={this.closeModal}
            largeImage={this.state.largeImage}
          />
        )}
      </div>
    );
  }
}
