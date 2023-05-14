import PropTypes from 'prop-types';
import {GalleryItem, GalleryImage} from 'components/ImageGalleryItem/ImageGalleryItem.styled'

export function ImageGalleryItem ({ image, onOpen }) {
    return (
        <GalleryItem>
            <GalleryImage 
               src={image.src} 
               alt={image.alt}
               onClick = {onOpen}/>
        </GalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      onOpen: PropTypes.func.isRequired,
}

