import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { Button, Table, Modal, Form, Input, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'cName',
      key: 'name',
    },
    {
      title: 'Model',
      dataIndex: 'cModel',
      key: 'model',
    },
    {
      title: 'Price',
      dataIndex: 'cPrice',
      key: 'price',
    },
    {
      title: 'SKU',
      dataIndex: 'cSku',
      key: 'sku',
    },
    {
      title: 'state',
      dataIndex: 'isSold',
      key: 'sold',
      render: isSold => (
        <>
          {isSold > 0 ? <a>Sold</a> : <a>Sell</a>}
        </>
      )
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('/api/cars', values)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => {
        console.log(res.data.response);
        setDataSource(res.data.response);
      })
  });

  return (
    <div className='app'>
      <Row>
        <Col span={18} offset={3}>
          <Button type="primary" onClick={showModal}>Add Car</Button>
          <Modal title="Add new car" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="cName"
                rules={[{ required: true, message: 'Please input your carname!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Model"
                name="cModel"
                rules={[{ required: true, message: 'Please input your carmodel!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="price"
                name="cPrice"
                rules={[{ required: true, message: 'Please input your carprice!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SKU"
                name="cSku"
                rules={[{ required: true, message: 'Please input your carsku!' }]}
              >
                <Input />
              </Form.Item>
              <br></br>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add new car
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>

    </div>
  )
}

export default App;
