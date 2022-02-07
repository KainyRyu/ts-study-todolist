import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Table, Layout, Row, Button } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { getSessionItem } from '../../../lib/storage';

function renderSuccessType(isSuccess) {
  const tagColors = ['green', 'red'];
  const label = isSuccess ? '성공' : '실패';
  return <Tag color={tagColors[isSuccess ? 0 : 1]}>{label}</Tag>;
}

function TodoFinish() {
  const [todoList, setTodoList] = useState(getSessionItem('todo-finish') ?? []);
  const [selectedRowKeys, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '할 일',
      dataIndex: 'title'
    },
    {
      title: '달성 여부',
      dataIndex: 'isSuccess',
      align: 'center',
      render: renderSuccessType
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      ellipsis: { showTitle: false }
    },
    {
      title: '완료일',
      dataIndex: 'finishedAt',
      ellipsis: { showTitle: false }
    }
  ];

  const handleTableChange = pagination => {
    const { current } = pagination;
    setCurrentPage(current);
  };

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Row align="middle" justify="space-between">
          <h1 className="text-[20px]">할 일 완료!!</h1>
          <div>
            <Button className="mr-2">
              <Link to="/todo/finish">Basic Mode</Link>
            </Button>
            <Button>
              <Link to="..">할 일 목록</Link>
            </Button>
          </div>
        </Row>
      </Header>
      <Content>
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
          onChange={handleTableChange}
          bordered={true}
        />
      </Content>
    </Layout>
  );
}

export default TodoFinish;
