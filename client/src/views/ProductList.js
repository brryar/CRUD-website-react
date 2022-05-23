import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductById, editProductById, deleteProduct } from "../store/actions";
import Swal from "sweetalert2";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [modal, setModal] = useState(false);
  const [prodId, setProdID] = useState(1);
  const [product, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    unit_of_measurement: "roll",
  });

  const modalHandler = (id) => {
    setModal(true);
    setProdID(id);
  };

  const resetModal = () => {
    setModal(false);
  };

  const editDataProduct = (event) => {
    const { value, name } = event.target;
    const newInput = {
      ...product,
    };
    newInput[name] = value;
    setNewProduct(newInput);
  };

  const editProductHandler = (id) => {
    dispatch(editProductById(product, prodId))
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((_) => {
        Swal.fire("Success!", "Edit success.", "success");
        setModal(false);
        dispatch(fetchProducts());
      })
      .catch((error) => {
        Swal.fire("error!");
      });
  };

  const doDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
          .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then((_) => {
            Swal.fire("Deleted!", "Product deleted.", "success");
            dispatch(fetchProducts());
          })
          .catch((error) => {
            Swal.fire("Error!");
          });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductById(prodId))
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setNewProduct(data);
      })
      .catch((error) => {
        Swal.fire("error!");
      });
  }, [dispatch, prodId]);

  return (
    <>
      <div className="container mt-5">
        <h5>Products List</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Code</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Description</th>
              <th scope="col">Product Price</th>
              <th scope="col">UOM</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.product_code}</td>
                <td>{product.product_name}</td>
                <td>{product.product_description}</td>
                <td>{product.product_price}</td>
                <td>{product.unit_of_measurement}</td>
                <td>
                  <button onClick={() => modalHandler(product.id)} type="button" className="btn btn-primary">
                    Edit
                  </button>
                  <button onClick={() => doDelete(product.id)} type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="p-5 shadow-lg" style={{ width: "600px", height: "450px", backgroundColor: "white", position: "absolute", top: "20%", left: "40%" }}>
          <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Edit Product</h3>
              <h3 onClick={() => resetModal()} style={{ cursor: "pointer" }}>
                X
              </h3>
            </div>
            <div className="form-group">
              <label>Product Name</label>
              <input onChange={editDataProduct} value={product.product_name} name="product_name" type="text" className="form-control" id="product_name" />
            </div>
            <div className="form-group">
              <label>Product Description</label>
              <input onChange={editDataProduct} value={product.product_description} name="product_description" type="text" className="form-control" id="product_description" />
            </div>
            <div className="form-group">
              <label>Product Price</label>
              <input onChange={editDataProduct} value={product.product_price} name="product_price" type="number" className="form-control" id="product_price" />
            </div>
            <div className="form-group">
              <label>Unit of Measurement</label>
              <select onChange={editDataProduct} value={product.unit_of_measurement} name="unit_of_measurement" className="form-select form-select-md mb-3" aria-label=".form-select-md example">
                <option value="roll">roll</option>
                <option value="sheet">sheet</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
            <button onClick={() => editProductHandler(product.id)} type="button" className="btn btn-danger">
              Done
            </button>
          </form>
        </div>
      )}
    </>
  );
}
