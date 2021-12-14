import { gql, useQuery } from '@apollo/client';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';

const QUERY_PRODUCTS = gql`
  query getallproducts {
    products {
      _id
      category
      date_posted
      description
      title
    }
  }
`;

function Home():JSX.Element {
  console.log("Loading Home");
  const { loading, error, data } = useQuery(QUERY_PRODUCTS);
  if (loading) {
    console.log("Submitting....")
    return (<p>Submitting...</p>);
  }
  if (error) {
    console.log("Submission error!"+error.message);
    return (<p>Submission error! ${error.message}</p>);
  }

  if(data) console.log(data);

  // const deletePost = (id: string) => {
  //   // const accessToken = await getIdTokenClaims();
  //   await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/product/delete?postID=${id}`, {
  //     method: "delete",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "authorization": `Bearer ${accessToken.__raw}`
  //     })
  //   });
  //   _removePostFromView(id);
  //   history.push('/');
  // }

  // const _removePostFromView = (id: string) => {
  //   const index = posts.findIndex((post: { _id: string; }) => post._id === id);
  //   posts.splice(index, 1);
  // }

  return (
    <section className="product-area section">
    <div className="container">
      <div className="row">
        {data && data.products.map((product: { title: React.ReactNode; _id: any; author: any; }) => (
          <div className="col-lg-4 col-md-6" key={product._id}>
          <div className="card h-100">
            <div className="single-post post-style-1">

              <div className="product-image">
                <img src={require('../assets/laptop_coffee.jpeg')} alt="Product" />
              </div>

              <span className="avatar">
                <img src={require('../assets/lavax.png')} alt="Profile" />
              </span>

              <div className="product-info">

                <h4 className="title">
                  <span>
                    <b>{product.title}</b>
                  </span>
                </h4>
              </div>
            </div>

            <ul className="post-footer">
              <li>
                <Link to={`/post/${product._id}`} className="btn btn-sm btn-outline-secondary">View</Link>
              </li>
              <li>
                {
                  // isAuthenticated && (user.name === product.author) &&
                  <Link to={`/edit/${product._id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                }
              </li>
              {/* <li>
                {
                  // isAuthenticated && (user.name === product.author) &&
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => deletePost(post._id)}>Delete</button>
                }
              </li> */}
            </ul>
          </div>
        </div>
        ))}
      </div>
    </div>
    <Pagination count={10}/>
  </section>
  )
}

export default Home;