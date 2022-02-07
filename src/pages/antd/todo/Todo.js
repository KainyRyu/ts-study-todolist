import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Popconfirm, Button, Row, Col, Form, Input, Layout } from 'antd';
import dayjs from 'dayjs';
import {
  getSessionItem,
  setSessionItem,
  removeSessionItem
} from '../../../lib/storage';
import FinishBtn from '../../../components/Table/FinishBtn';

const { Content, Header } = Layout;

const INIT_TODO_LIST = [
  { id: 0, title: '출근 하기', createdAt: '2022-01-01 00:00:01' },
  { id: 1, title: '퇴근 하기', createdAt: '2022-01-01 00:00:01' }
];

function Todo() {
  const [todoList, setTodoList] = useState(
    getSessionItem('todo') ?? INIT_TODO_LIST
  );
  const [selectedRowKeys, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();

  //할 일 등록
  const handleTodoSubmit = data => {
    const { title } = data;
    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    setTodoList(prev => [...prev, { id: todoList.length, title, createdAt }]);
    form.setFieldsValue({ title: '' });
    setCurrentPage(1);
  };

  // 할 일 삭제
  const handleTodoDelete = id => {
    setTodoList(prev =>
      prev
        .filter(item => item.id !== id)
        .map((item, idx) => {
          item.id = idx;
          return item;
        })
    );
  };

  const handleSelectedDeleteBtn = () => {
    setTodoList(prev =>
      prev
        .filter(item => !selectedRowKeys.includes(item.id))
        .map((item, idx) => {
          item.id = idx;
          return item;
        })
    );
    setSelectedRows([]);
    setCurrentPage(1);
  };

  const handleAllDeleteBtn = () => {
    setTodoList([]);
    setSelectedRows([]);
    setCurrentPage(1);
  };

  const handleTableChange = pagination => {
    const { current } = pagination;
    setCurrentPage(current);
  };

  const columns = [
    {
      width: '5%',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      width: '40%',
      title: '할 일',
      dataIndex: 'title'
    },
    {
      width: '15%',
      title: '생성일',
      dataIndex: 'createdAt',
      ellipsis: { showTitle: false }
    },
    {
      width: '25%',
      title: '완료',
      align: 'center',
      render: (_, row) => <FinishBtn row={row} onDelete={handleTodoDelete} />
    },
    {
      width: '10%',
      title: '삭제',
      dataIndex: 'id',
      align: 'center',
      render: id => {
        return (
          <Popconfirm
            title="삭제 하시겠습니까?"
            onConfirm={() => handleTodoDelete(id)}
          >
            <Button danger={true}>삭제</Button>
          </Popconfirm>
        );
      }
    }
  ];

  useEffect(() => {
    if (todoList.length === 0) {
      removeSessionItem('todo');
    } else {
      setSessionItem('todo', todoList);
    }
  }, [todoList]);

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Row align="middle" justify="space-between">
          <h1 className="text-[20px]">할 일 목록!!</h1>
          <div>
            <Button className="mr-2">
              <Link to="/todo">Basic Mode</Link>
            </Button>
            <Button>
              <Link to="finish">완료 목록</Link>
            </Button>
          </div>
        </Row>
      </Header>
      <Content>
        <Form
          style={{ paddingTop: '15px', marginLeft: '15px' }}
          form={form}
          onFinish={handleTodoSubmit}
        >
          <Form.Item label="할 일">
            <Row grid={[8, 8]}>
              <Col span={10}>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: '할 일을 입력해주세요!'
                    }
                  ]}
                  validateTrigger={['onSubmit']}
                  noStyle
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item noStyle>
                  <Button type="primary" htmlType="submit">
                    저장
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item style={{ marginBottom: '10px' }}>
            <Row justify="end" style={{ padding: '0px 10px' }}>
              <Popconfirm
                title="선택한 할 일들을 삭제 하시겠습니까?"
                onConfirm={handleSelectedDeleteBtn}
                disabled={selectedRowKeys.length <= 0}
              >
                <Button
                  type="primary"
                  style={{ marginRight: '5px' }}
                  disabled={selectedRowKeys.length <= 0}
                >
                  선택 삭제
                </Button>
              </Popconfirm>
              <Popconfirm
                title="전체 삭제 하시겠습니까?"
                onConfirm={handleAllDeleteBtn}
              >
                <Button type="danger">전체 삭제</Button>
              </Popconfirm>
            </Row>
          </Form.Item>
        </Form>
        <Table
          dataSource={todoList}
          columns={columns}
          rowKey={record => record.id}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRows }}
          pagination={{
            current: currentPage,
            pageSize: 10,
            position: ['bottomCenter']
          }}
          bordered={true}
          onChange={handleTableChange}
        />
      </Content>
    </Layout>
  );
}

export default Todo;
