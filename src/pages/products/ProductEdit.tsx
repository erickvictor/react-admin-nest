import axios from "axios";
import { SyntheticEvent, useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products/${props.match.params.id}`);

      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
  }, [props.match.params.id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`products/${props.match.params.id}`, {
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

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
    }
    setImage(url);    
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Edit Product</h1>
      </div>
      <form onSubmit={submit}>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            id="Title"
            type="text"
            defaultValue={title}
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
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Image" className="form-label">
            Image
          </label>
          <div className="input-group">
            <input
              id="Image"
              type="text"
              defaultValue={image}
              onChange={(e) => setImage(e.target.value)}
              ref={ref}
              className="form-control"
            />
            <ImageUpload uploaded={updateImage} />
          </div>
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Price" className="form-label">
            Price
          </label>
          <input
            id="Price"
            type="number"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductEdit;
