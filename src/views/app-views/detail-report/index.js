import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReport } from "redux/features/reports";

export const DETAILPRODUCT = () => {

  const dispatch = useDispatch();
  const ticket = useSelector(state => state.ticket)


  const onFinish = async (values) => {
    dispatch(updateReport({
      id:ticket.selected._id,
      answer:values.jawaban
    })).unwrap()
    message.info("Answer Updated!")
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
              label="Nama"
              name="nama"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width:"100%"}}>
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