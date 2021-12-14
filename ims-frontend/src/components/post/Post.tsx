import { gql, useQuery } from '@apollo/client';
import React from 'react';

const QUERY_PRODUCT = gql`
  query getproduct($postId: String!) {
    product(_id:$postId) {
      category
      title
      date_posted
      description
    }
  }
`;

function Post(props: { match: { params: { postId: any; }; }; }) {
  const postId = props.match.params.postId;

  const { loading, error, data } = useQuery(QUERY_PRODUCT, {
    variables: { postId: postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  if(data) {
    console.log(data);
  }

  return (
      <section className="post-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-1 col-md-0" />
          <div className="col-lg-10 col-md-12">
            {data && 
              <div className="main-post">
                <div className="post-top-area">
                  <h5 className="pre-title">Nest React Inventory/Product Management System</h5>
                  <h3 className="title">
                    <span>
                      <b>{data.product.title}</b>
                    </span>
                  </h3>

                  <p className="para">
                    {data.product.description}
                  </p>
                </div>
              </div>              
            }
          </div>

        </div>
      </div>
    </section>
  );
}

export default Post;