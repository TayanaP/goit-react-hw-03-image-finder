import PropTypes from 'prop-types';
import {ButtonLoad } from 'components/Button/Button.styled'

export function Button ({LoadMore }) {
    return (
      <ButtonLoad type="button" onClick={LoadMore}>
        Load more
      </ButtonLoad>
    );
  };
  
  Button.propTypes = {
    LoadMore: PropTypes.func.isRequired,
  };