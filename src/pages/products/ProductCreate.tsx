import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("products", {
      title,
      description,
      image,
      price,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/products" />;
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create Product</h1>
      </div>
      <form onSubmit={submit}>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            id="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            id="Description"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Image" className="form-label">
            Image
          </label>
          <input
            id="Image"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Price" className="form-label">
            Price
          </label>
          <input
            id="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductCreate;
