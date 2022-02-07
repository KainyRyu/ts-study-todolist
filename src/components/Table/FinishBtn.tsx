import React, { useRef } from 'react';
import { Popconfirm, Button, Form, Select, Space } from 'antd';
import { getSessionItem, setSessionItem } from '../../lib/storage';
import dayjs from 'dayjs';

export default function FinishBtn({ row, onDelete }) {
  const isFirstRenderRef = useRef(false);
  const [form] = Form.useForm();

  const handleTodoFinish = values => {
    const prevData = getSessionItem('todo-finish') ?? [];
    const { isSuccess } = values;
    const finishedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      id: prevData.length,
      title: row.title,
      createdAt: row.createdAt,
      finishedAt,
      isSuccess
    };

    setSessionItem('todo-finish', [...prevData, data]);
    onDelete(row.id);
    form.setFieldsValue({ isSuccess: true });
  };

  if (!isFirstRenderRef.current) {
    isFirstRenderRef.current = true;
    form.setFieldsValue({ isSuccess: true });
  }

  return (
    <Form form={form} onFinish={handleTodoFinish}>
      <Space align="center">
        <Form.Item name="isSuccess" noStyle>
          <Select style={{ marginRight: '5px' }}>
            <Select.Option key="success" value={true}>
              성공
            </Select.Option>
            <Select.Option key="fail" value={false}>
              실패
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item noStyle>
          <Popconfirm
            title="완료 하시겠습니까?"
            onConfirm={() => {
              form.submit();
            }}
          >
            <Button type="primary" block={true}>
              완료
            </Button>
          </Popconfirm>
        </Form.Item>
      </Space>
    </Form>
  );
}
