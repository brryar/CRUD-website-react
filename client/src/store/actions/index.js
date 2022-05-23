import { FETCH_PRODUCTS } from "./actionType";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const fetchProducts = () => {
  return (dispatch, getState) => {
    fetch(`${baseUrl}/products`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: data,
        });
      })
      .catch((error) => {
        Swal.fire("error!");
      });
  };
};

export const fetchProductById = (id) => {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/${id}`);
  };
};

export const addProduct = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
};

export const editProductById = (payload, id) => {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
