import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../firebase/config.js";
import { useParams } from "react-router-dom";
import "../../assets/css/createProduct.css";
import axiosInstance from "../../helpers/axiosConfig.js";

const CreateProduct = () => {
  const { postId } = useParams();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadFile(image);
      }

      const productData = {
        post_id: postId,
        name: productName,
        price,
        external_link: externalLink,
        image_url: imageUrl,
      };

      await postProduct(productData);

      // Reset form after successful submission
      setProductName("");
      setPrice("");
      setExternalLink("");
      setImage(null);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const postProduct = async (productData) => {
    try {
      const response = await axiosInstance.post(
        `/post/${productData.post_id}/product`,
        productData
      );

      if (response.status === 201) {
        setSuccess("Product created successfully!");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Error creating product. Please try again.");
    }
  };

  return (
    <>
      {!postId && (
        <Alert color="bg-soft-danger fw-medium main-error-alert  w-75 mx-auto mb-3">
          <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
          No post id found. Please go back and select a post to create a
          product.
        </Alert>
      )}

      <div className="create-product-card">
        {success && (
          <Alert className="bg-soft-success fw-medium main-success-alert w-75 mx-auto mb-3">
            <i className="uil uil-check-circle fs-5 align-middle me-1"></i>
            {success}
          </Alert>
        )}

        {error && (
          <Alert className="bg-soft-danger fw-medium main-error-alert">
            <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
            {error}
          </Alert>
        )}
        <h4 className="text-center text-secondary">Create Product</h4>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column justify-content-center"
        >
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="$"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="externalLink">Product Url</Label>
            <Input
              type="url"
              id="externalLink"
              placeholder="Enter product url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Product Image</Label>
            <div
              {...getRootProps({
                className: `dropzone ${isDragActive ? "active" : ""}`,
              })}
            >
              <Input {...getInputProps()} />
              <p className="dropzone-text">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag 'n' drop an image here, or click to select one"}
              </p>
              {image && (
                <p className="selected-file">Selected file: {image.name}</p>
              )}
            </div>
            {error && <p className="text-danger">{error}</p>}
          </FormGroup>
          <Button
            className="mt-2"
            color="secondary"
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Create Product"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;
