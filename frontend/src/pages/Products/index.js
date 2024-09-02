import React, { useState, useEffect } from "react";
import "../../assets/css/products.css";
import axiosInstance from "../../helpers/axiosConfig.js";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/myProducts");
        if (response.status === 200) {
          setProducts(response.data.body);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="all-products-section">
      <h4 className="m-4 text-secondary w-100 text-center">Products</h4>
      {products.length === 0 && (
        <p className="text-center text-secondary">
          You have not created any products yet
        </p>
      )}
      <div className="products-container products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-details">
              <img
                className="rounded"
                height={75}
                width={75}
                src={product.image_url}
                style={{ objectFit: "cover" }}
                alt="product image"
              />
              <p className="mt-3">${product.price.toFixed(2)}</p>
              <p className="text-muted">{product.name}</p>
            </div>
            <div className="product-icons">
              <i className="bx bxs-t-shirt m-3"></i>
              <a
                href={product.external_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bx-link-external m-3"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
