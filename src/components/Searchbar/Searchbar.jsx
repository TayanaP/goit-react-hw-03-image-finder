import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { SearchbarContainer, SearchForm, SearchField, SearchButton, SearchButton_label } from './Searchbar.styled';

const schema = yup.object().shape({
    name: yup
      .string().required()
  });

const initialValues = {
    name: '',
  };

export function Searchbar({handleFormSubmit}) {
    const handleSubmit = (values, { resetForm }) => {
        handleFormSubmit(values.name.trim());
        resetForm();
    };

    return (
        <SearchbarContainer>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                <SearchForm autoComplete="off">
                    <SearchButton type="submit">
                        <SearchButton_label>Search</SearchButton_label>
                    </SearchButton>

                    <SearchField
                        type="text"
                        autocomplete="off"
                        // autofocus
                        placeholder="Search images and photos" />
                    <ErrorMessage name="name" component="div" />
                </SearchForm>
            </Formik>
        </SearchbarContainer>
    );
}

Searchbar.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
  };

