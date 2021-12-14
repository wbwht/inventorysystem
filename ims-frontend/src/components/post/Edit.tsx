// Work in progress
import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MUTATION_EDIT_PRODUCT = gql`
  mutation editProduct($_id: String!, $description: String, $category: String, $title: String) {
    updateProduct(payload:{_id:$_id, description:$description, category:$category, title:$title}) {
      _id
      author
      category
      date_posted
      description
      title
    }
  }
`;

const QUERY_PRODUCTS = gql`
query getprod($id: String!) {
  product(_id: $id) {
    _id
    author
    category
    description
    postedById
    title
  }
}
`;

function Edit(): JSX.Element {

  let { postId } : any = useParams();
  interface IValues {
    [key: string]: any;
  }

  const { data } = useQuery(QUERY_PRODUCTS, {
    variables: {id: postId}
  });
  if(data) console.log(data);

  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loadin, setLoading] = useState(false);

  const [updateProduct, { loading, error }] = useMutation(MUTATION_EDIT_PRODUCT);

  if (loading) return (<p>Submitting...</p>);
  if (error) return (<p>Submission error! ${error.message}</p>);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    console.log("Values: "+values.category);
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: values.title,
      description: values.description,
      category: values.category,
    }
    console.log("Form data: "+formData+" Id: "+postId);
    await updateProduct({ variables: { _id: postId, title: values.title, description: values.description, category: values.category  } });
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
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value })
  }

  return (
    <div className={'page-wrapper'}>
    {data &&
      <div className={"col-md-12 form-wrapper"}>
        <h2> Edit Post  </h2>

        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The post has been edited successfully!
                        </div>
        )}
        <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
          <div className="form-group col-md-12">
            <label htmlFor="title"> Title </label>
            <input type="text" id="title" defaultValue={data.product.title} onChange={(e) => handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="description"> Description </label>
            <input type="text" id="description" defaultValue={data.product.description} onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="body"> Category </label>
            <input type="text" id="category" defaultValue={data.product.category} onChange={(e) => handleInputChanges(e)} name="category" className="form-control" placeholder="Enter category" />
          </div>

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Edit Post
            </button>
            {loading &&
              <span className="fa fa-circle-o-notch fa-spin" />
            }
          </div>
        </form>
      </div>
    }
  </div>
  )
}

export default Edit;