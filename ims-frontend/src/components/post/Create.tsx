import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const MUTATION_ADD_PRODUCT = gql`
  mutation createProduct($title: String!, $description: String, $category: String, $author: String!) {
    createProduct(payload:{title:$title, description:$description, category:$category, author:$author}) {
      title
    }
  }
`;

function Create() : JSX.Element {
  interface IValues {
    [key: string]: any;
  }

  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loadin, setLoading] = useState<boolean>(false);

  const [addProduct, { data, loading, error, reset }] = useMutation(MUTATION_ADD_PRODUCT);

  if (loading) return (<p>Submitting...</p>);
  if (error) return (<p>Submission error! ${error.message}</p>);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: values.title,
      description: values.description,
      body: values.body,
    }
  
    addProduct({ variables: { title: values.title, description: values.description, content: values.body } });
    const submitSuccess = error ? false : true;
    setSubmitSuccess(submitSuccess);
    setValues({...values, formData});
    setLoading(false);   
    values.value = '';
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <div>
    <div className={"col-md-12 form-wrapper"}>
      <h2> Create Post </h2>
      {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Fill the form below to create a new post
                </div>
      )}

      {submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was successfully submitted!
                        </div>
      )}

      <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
        <div className="form-group col-md-12">
          <label htmlFor="title"> Title </label>
          <input type="text" id="title" onChange={(e) => handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="description"> Description </label>
          <input type="text" id="description" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="body"> Category </label>
          <input type="text" id="body" onChange={(e) => handleInputChanges(e)} name="body" className="form-control" placeholder="Enter content" />
        </div>

        <div className="form-group col-md-4 pull-right">
          <button className="btn btn-success" type="submit">
            Create Post
          </button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
        </div>
      </form>
    </div>
  </div>
  );
}

export default withRouter(Create)