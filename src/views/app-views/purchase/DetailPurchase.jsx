import { Col, Row, message } from 'antd';
import React from "react";
import { Button, Card, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase } from "@/store/features/purchase"

export const DetailPurchase = () => {
    useDispatch();
    const ticket = useSelector(state => state.ticket)

  const onFinish = async (values) => {
    await addPurchase(values).then(() => {
      return message.success("Pembelian Ditambahkan!")
    })
      .catch((err) => {
        return message.error(err.message)
      })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // getData(location.id)
  }, [])

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
            <h2>{ticket?.selected?.question}</h2>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Supplier ID"
                name="supplierId"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Product Name"
                name="productName"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
              >
                <Input></Input>
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

export default DetailPurchase