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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const product = useSelector(state => state.products)

  const getData = useCallback(async (id) => {
    try {
      await dispatch(fetchOneProduct(id)).unwrap().then(() => {
        form.setFieldsValue(product.list[0]);
      })
        .catch(err => {
          message.error(err?.message || `Product data failed to load`);
        })
    } catch (error) {
      message.error(error?.message || 'Failed to data')
    }
  }, [dispatch, form, product.list])

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
    event.preventDefault()
    
  };

  useEffect(() => {
    if (location.id) {
      getData(location.id)
    }
  }, [getData, location.id])

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h2>Detail Produk</h2>
          <p>Update data ini</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <h2>{product?.selected?.question}</h2>
            <form
              name="basic"
              onSubmit={onFinish}
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
              <Form.Item name="description">
                <Input name="description" onChange={handleChange} placeholder="Deskripsi" />
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
              <Form.Item name="image">
                {/* <Upload >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
                <input  name="image" type="file" onChange={(e)=>{
                  setFile(e.target.files[0])
                }} ></input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </Form.Item>
            </form>
          </Card>
        </Col>
        {/* <Col xs={6} sm={6} md={6} lg={6}>
          <Card>
            <img style={{width:"100%"}} src={product.list[0]?.picture}></img>
            <br></br>
            <br></br>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Upload Image
                </Button>
          </Card>
        </Col> */}
      </Row>
    </>
  )
}

export default DETAILPRODUCT