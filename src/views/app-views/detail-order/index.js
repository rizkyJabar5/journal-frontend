import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Table, TimePicker } from 'antd';
import React, { useState } from "react";

import axios from 'axios';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAllCustomer } from "redux/features/customers";
import { fetchOneOrder } from "redux/features/orders";
import { fetchAllProduct } from "redux/features/products";

const { Option } = Select;

const rules = [
  {
    required: true,
    message: 'Wajib memasukkan data!',
  },
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const DETAILPRODUCT = () => {
  const history = useHistory()
  const location = useLocation();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [allCustomers, setAllCustomers] = useState([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [selectedProduct, setSelectedProduct] = useState({})
  const [penerima, setPenerima] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState([])
  const [orderStatus, setOrderStatus] = useState("")
  const [allProducts, setAllProducts] = useState([])

  const handleOrderStatus = (value) => {
    setOrderStatus(value)
  }

  function onChangeDate(value) {
    console.log(moment(value).format('DD-MM-YYYY'))
    setDate(moment(value).format('DD-MM-YYYY'))
  }

  function onChangeTime(value) {
    setTime(value)
  }

  function onOk(value) {
    console.log(moment(value).format('HH:mm'))
    setTime(moment(value).format('HH:mm'))
  }

  const handleChangeCustomer = (customerId) => {
    const selected = allCustomers.find(c => c.customerId === customerId);
    setSelectedCustomer(customerId);

    if (selected) {
      form.setFieldsValue({
        alamatPenerima: selected.address?.street,
        city: selected.address?.city,
        zip: selected.address?.zip,
        namaPenerima: selected.customerName,
        // add more if you want
      });

      setPenerima(prev => ({
        ...prev,
        alamatPenerima: selected.address?.street,
        city: selected.address?.city,
        zip: selected.address?.zip,
        namaPenerima: selected.customerName,
      }));
    }
  };


  function showModal() {
    setIsOpen(true);
  }

  const addProduct = (event) => {
    event.preventDefault();

    if (!selectedProduct?.productId || quantity <= 0) {
      message.error("Choose product and quantity");
      return;
    }

    const finalProduct = {
      ...selectedProduct,
      quantity,
      totalPrice: selectedProduct.price * quantity
    };

    setSelectedProducts(prev => [...prev, finalProduct]);
    setIsOpen(false);
  };


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value)
  }

  const handleChangeProduct = async (value) => {
    const selected = allProducts.find(product => product.productId === value) || {}
    setSelectedProduct({
      ...selected,
      quantity: quantity
    })
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products)

  const getCustomers = useCallback(async () => {
    try {
      const doc = await dispatch(fetchAllCustomer()).unwrap();
      setAllCustomers(doc);
    } catch (error) {
      message.error(error?.message || "Failed to fetch customers");
    }
  }, [dispatch]);

  const getProducts = useCallback(async () => {
    try {
      const doc = await dispatch(fetchAllProduct()).unwrap();
      setAllProducts(doc);
    } catch (error) {
      message.error(error?.message || "Failed to fetch products");
    }
  }, [dispatch]);

  const getData = useCallback(async (id) => {
    try {
      const data = await dispatch(fetchOneOrder(id)).unwrap();
      form.setFieldsValue(data);       // <-- use returned API data, NOT product.list
    } catch (error) {
      message.error(error?.message || "Failed to load data");
    }
  }, [dispatch, form]);


  const onFinish = async (values) => {
    console.log({
      selectedCustomer,
      selectedProducts
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const createOrder = async () => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "*"
      }
    }

    await axios.post("https://inventory-isad-staging-163448ff1a8b.herokuapp.com/api/v1/orders/add-order", {
      "customerId": selectedCustomer,
      "detailProduct": selectedProducts,
      "paymentAmount": penerima.paymentAmount,
      "orderStatus": orderStatus,
      "recipientName": penerima.namaPenerima,
      "address": {
        "street": penerima.alamatPenerima,
        "city": penerima.city,
        // "province": penerima.province,
        // "country": penerima.country,
        "zip": penerima.zip
      },
      "dateDelivery": date,
      "timeDelivery": time
    }, config)
      .then(doc => {
        message.success(doc.data.message)
        history.push("/app/orders")
      }).catch(err => {
        const resp = err.response.data;

        if (resp.status === 400) {
          message.error(resp.message || "Masukkan data dengan benar");
          return;
        } else if (resp.status === 500) {
          message.error(resp.message || "Sorry, maybe server Error!");
          return;
        }
        message.error(resp.message)
      })

  }

  const changePenerima = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPenerima({
      ...penerima,
      [name]: value
    });
  }

  useEffect(() => {
    getCustomers()
    getProducts()
    if (location.id) {
      getData(location.id)
    }
  }, [location.id])


  const tableColumns = [
    { title: 'ID Produk', dataIndex: 'productId', key: 'productId' },
    { title: 'Nama', dataIndex: 'productName', key: 'productName' },
    { title: 'Harga', dataIndex: 'price', key: 'price' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Total Harga',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => value?.toLocaleString("id-ID")
    },
  ];

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Tambah Produk"
      >
        <h2 >Halo Tambahkan Produk</h2>
        <form onSubmit={addProduct}>
          <Select
            mode="single"
            style={{
              width: '100%',
              color: "#FFFFFF",
              backgroundImage: "#FFFFFF"
            }}
            name="barang"
            placeholder="Select Product"
            onChange={handleChangeProduct}
            optionLabelProp="label"
          >
            {allProducts?.map(doc => {
              return (
                <Option value={doc.productId} label={doc.productName}>
                  <div className="demo-option-label-item">
                    {doc.productName}
                  </div>
                </Option>
              )
            })}
          </Select>
          <br />
          <br />
          <Input name="quantity" rules={rules} style={{ width: "100%" }} onChange={handleChangeQuantity} placeholder="Jumlah" />
          <Input type='submit' style={{ width: "100%", color: "white", marginTop: "15px", backgroundColor: "green" }} value="Tambahkan" ></Input>
        </form>
        <Button style={{ backgroundColor: "red", color: "white", border: "red", width: "100%" }} onClick={() => { setIsOpen(false) }} >Cancel</Button>
      </Modal>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h2>Detail Orders</h2>
          <p>Update data ini</p>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title="Pilih Produk - Produk" >
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={selectedProducts}
              rowKey='productId'
              pagination={{
                pageSize: 10
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Button type="primary" onClick={showModal} style={{ width: "100%", marginTop: "10px" }}>
          Tambah Produk
        </Button>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={() => {
          setSelectedProducts([])
        }} style={{ width: "100%", color: "white", background: "red", marginTop: "10px", borderColor: "red" }}>
          Reset Produk
        </Button>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <h2>Info Pengiriman</h2>
            <p>Masukkan data pengiriman</p>
            <Form
              name="basic"
              form={form}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item name="orderStatus">
                <Select
                  mode="single"
                  style={{
                    width: '100%',
                    color: "#FFFFFF",
                    backgroundImage: "#FFFFFF",
                    marginTop: "7px"
                  }}
                  name="orderStatus"
                  placeholder="Order Status"
                  onChange={handleOrderStatus}
                  optionLabelProp="label"
                >
                  <Option value={'SENT'} label={'SENT'}>SENT</Option>
                  <Option value={'TAKEN'} label={'TAKEN'}>TAKEN</Option>
                </Select>
              </Form.Item>

              <Form.Item name="namaPengirim">
                <Select
                  mode="single"
                  placeholder="Pilih Customer"
                  onChange={handleChangeCustomer}
                  optionLabelProp="label"
                >
                  {allCustomers?.map(doc => {
                    return (
                      <Option value={doc.customerId} label={doc.customerName + " | " + doc.companyName} style={{
                        width: '100%',
                        background: "#FFF"
                      }}>
                        <div className="demo-option-label-item">
                          {doc.customerName} | {doc.companyName}
                        </div>
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="alamatPenerima">
                <Input rules={rules} onChange={changePenerima} name="alamatPenerima" style={{ width: "100%" }} placeholder="Alamat" />
              </Form.Item>
              <Form.Item name="city">
                <Input rules={rules} onChange={changePenerima} name="city" style={{ width: "100%" }} placeholder="Kota" />
              </Form.Item>
              {/* <Form.Item name="province">
                <Input rules={rules} onChange={changePenerima} name="province" style={{ width: "100%" }} placeholder="Provinsi" />
              </Form.Item>
              <Form.Item name="country">
                <Input rules={rules} onChange={changePenerima} name="country" style={{ width: "100%" }} placeholder="Negara" />
              </Form.Item> */}
              <Form.Item name="zip">
                <Input rules={rules} onChange={changePenerima} name="zip" style={{ width: "100%" }} placeholder="Kode Pos" />
              </Form.Item>
              <Form.Item name="tanggal">
                <div>
                  <DatePicker style={{ width: "100%" }} placeholder="Select Date" format={'DD-MM-YYYY'} onChange={onChangeDate} />
                  <br />
                </div>
              </Form.Item>
              <Form.Item name="jam">
                <div>
                  <TimePicker style={{ width: "100%" }} placeholder="Select Time" format={'HH:mm'} onChange={onChangeTime} onOk={onOk} onNow={onOk} />
                  <br />
                </div>
              </Form.Item>
              <h3>Info Pembayaran</h3>
              <p>Masukkan jumlah pembayaran</p>
              <Form.Item name="Biaya">
                <Input onChange={changePenerima} name="paymentAmount" style={{ width: "100%" }} placeholder="Biaya (IDR)" />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Button type="primary" onClick={createOrder} style={{ width: "100%" }}>
          Membuat Order
        </Button>
      </Row>
    </>
  )
}

export default DETAILPRODUCT