import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../store/actions";
import Swal from "sweetalert2";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    unit_of_measurement: "roll",
  });

  const newProductHandler = (event) => {
    const { value, name } = event.target;
    const newInput = {
      ...newProduct,
    };
    newInput[name] = value;
    setNewProduct(newInput);
  };

  const addNewProduct = (event) => {
    event.preventDefault();

    dispatch(addProduct(newProduct))
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((_) => {
        Swal.fire("Success Add Product!");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("error!");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={addNewProduct}>
          <div className="form-group">
            <label for="product_name">Product Name</label>
            <input value={newProduct.product_name} onChange={newProductHandler} name="product_name" type="text" className="form-control" id="product_name" placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label for="product_description">Product Description</label>
            <input value={newProduct.product_description} onChange={newProductHandler} name="product_description" type="text" className="form-control" id="product_description" placeholder="Enter product description" />
          </div>
          <div className="form-group">
            <label for="product_price">Product Price</label>
            <input value={newProduct.product_price} onChange={newProductHandler} name="product_price" type="number" className="form-control" id="product_price" placeholder="Enter product price" />
          </div>
          <div className="form-group">
            <label for="unit_of_measurement">Unit of Measurement</label>
            <select value={newProduct.unit_of_measurement} onChange={newProductHandler} name="unit_of_measurement" className="form-select form-select-md mb-3" aria-label=".form-select-md example">
              <option value="roll">roll</option>
              <option value="sheet">sheet</option>
              <option value="pcs">pcs</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
