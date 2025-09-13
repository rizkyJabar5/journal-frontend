import { Col, Row, message } from 'antd';
import React, { useState } from "react";
import { Button, Card, Form, Input } from 'antd';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneCategory, updateCategory, addCategory } from '@/store/features/category';
import { useNavigate, useLocation } from 'react-router-dom';

export const DetailCategory = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const category = useSelector(state => state.categories)
  const [type, setType] = useState('update')

  const getData = useCallback(async (id) => {
    try {
      await dispatch(fetchOneCategory(id)).unwrap().then(data => {
        form.setFieldsValue(data);
      })
        .catch(err => {
          message.error(err?.message || `Category data failed to load`);
        })
    } catch (error) {
      message.error(error?.message || 'Failed to data')
    }
  }, [dispatch])

  const onFinish = async (values) => {
    if (type === 'update') {
      dispatch(updateCategory({
        categoryId: values.id,
        categoryName: values.nameCategory,
        description: values.description
      })).unwrap()
      message.info("Category Updated!")
    } else {
      dispatch(addCategory({
        categoryName: values.nameCategory,
        description: values.description
      }))
      navigate('/app/categories')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (location.id) {
      getData(location.id)
    } else {
      setType('new')
    }
  }, [])

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h2>Detail Category</h2>
          <p>Update data ini</p>
        </Col>
      </Row>
      <Row>
        <Col xs={18} sm={18} md={18} lg={18}>
          <Card>
            <h2>{category?.selected?.nameCategory}</h2>
            <Form
              name="basic"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="nameCategory" label="Nama Category">
                <Input placeholder="Nama Category" />
              </Form.Item>
              {
                type === 'update' && <Form.Item name="publicKey" label="Category ID">
                  <Input placeholder="Category ID" />
                </Form.Item>
              }
              <Form.Item name="description" label="Deskripsi">
                <Input placeholder="Deskripsi" />
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

export default DetailCategory