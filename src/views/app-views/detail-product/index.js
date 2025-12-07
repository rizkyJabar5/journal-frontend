import { Col, Row, message } from 'antd';
import React, { useState } from "react";
import { Button, Card, Form, Input } from 'antd';
import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProduct } from "redux/features/products"
import axios from 'axios';

export const DETAILPRODUCT = () => {
  const history = useHistory()
  const location = useLocation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState()
  const [selectedCategory] = useState({})
  const [inputs, setInputs] = useState({});
  const [product, setProduct] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const getData = useCallback(async (id) => {
    try {
      const data = await dispatch(fetchOneProduct(id)).unwrap()
      setProduct(data.data)
    } catch (error) {
      message.error(error?.message || 'Failed to load data');
    }
  }, [dispatch]);

  const onFinish = (event) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "*"
      }
    }
    let formData = new FormData();
    if (location.isAddNew) {
      formData.append('productName', inputs.productName);
      formData.append('categoryKey', selectedCategory);
      formData.append('description', inputs.description);
      formData.append('stock', inputs.stock);
      formData.append('price', inputs.price);
      formData.append('materialPrice', inputs.materialPrice);
      formData.append('material', inputs.material);
      formData.append('weight', parseFloat(inputs.weight));
      formData.append('image', file);
      axios.post("https://inventory-isad-staging-163448ff1a8b.herokuapp.com/api/v1/products/add-product", formData, config)
        .then(response => {
          message.success(response.data.message);
          history.push("/app/products")
        })
        .catch(error => {
          message.error(error.message)
          console.log(error);
        });
    } else {
      message.info("Coming Soon!")
    }
  };

  useEffect(() => {
    if (location.id) {
      getData(location.id);
    }
  }, [location.id, getData]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h2>Detail Produk {product?.productName}</h2>
          <p>Update data ini</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <h2>{product?.selected?.question}</h2>
            <Form
              form={form}
              name="basic"
              onSubmit={onFinish}
              onFinish={onFinish}
            >
              <Form.Item name="productName">
                <Input name="productName" onChange={handleChange} placeholder="Nama Produk" />
              </Form.Item>
              <Form.Item name="stock">
                <Input name="stock" onChange={handleChange} placeholder="Stok" />
              </Form.Item>
              <Form.Item name="price">
                <Input name="price" onChange={handleChange} placeholder="Price" />
              </Form.Item>
              <Form.Item name="weight">
                <Input name="weight" onChange={handleChange} placeholder="Berat Produk(Gram)" />
              </Form.Item>
              <Form.Item name="material">
                <Input name="material" onChange={handleChange} placeholder="Material Produk" />
              </Form.Item>
              <Form.Item name="materialPrice">
                <Input name="materialPrice" onChange={handleChange} placeholder="Harga Material(Rp/Kg)" />
              </Form.Item>
              {product?.picture ? (
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Card>
                    <img
                      src={product.picture}
                      alt="Product"
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  </Card>
                </Col>
              ) : (
                <div></div>
              )}
              <Form.Item name="image">
                <input
                  name="image"
                  placeholder="Image"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0])
                  }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DETAILPRODUCT