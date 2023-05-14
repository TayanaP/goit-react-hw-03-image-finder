import { Component } from 'react';
import { fetchImages } from 'components/API/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    name: '',
    images: [],
    page: 1,
    isLoading: false,
    showLoadMore: false,
    showModal: false,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ 
        isLoading: true, 
        showLoadMore: false });
      fetchImages(name, page)
        .then(({ total_results, photos}) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            showLoadMore: page < Math.ceil(total_results/ 12),
          }));
        })
        .catch(() => this.setState({ error: true }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleFormSubmit = name => {
    this.setState({ name, page: 1, images: [], showLoadMore: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpen = (src, alt) => {
    this.setState({ showModal: { src, alt } });
  };

  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, showLoadMore, isLoading, images } = this.state;
    return (
      <div>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onOpen={this.onOpen} />

        {showLoadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}

        <Loader visible={isLoading} />

        {showModal && (
          <Modal
            src={showModal.src}
            alt={showModal.alt}
            onClose={this.onClose}
          />
        )}
      </div>
    );
  }
}