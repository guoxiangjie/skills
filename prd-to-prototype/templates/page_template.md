# 页面组件模板

## 基础页面模板

```jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './style.module.css';

const PageName = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取数据
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Card loading={loading}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
            返回
          </Button>
          {/* 页面内容 */}
        </Space>
      </Card>
    </div>
  );
};

export default PageName;
```

## 表单页面模板

```jsx
import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { Save, RotateCcw } from 'lucide-react';

const FormPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log('提交数据：', values);
      message.success('提交成功');
    } catch (error) {
      message.error('提交失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div className="page-container">
      <Card title="表单标题">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="field1" label="字段1" rules={[{ required: true, message: '请输入字段1' }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="field2" label="字段2" rules={[{ required: true, message: '请输入字段2' }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} icon={<Save size={16} />}>
                提交
              </Button>
              <Button onClick={handleReset} icon={<RotateCcw size={16} />}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FormPage;
```

## 列表页面模板

```jsx
import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Input, Select, message } from 'antd';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const ListPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取数据
      setData([]);
      setPagination({ ...pagination, total: 0 });
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: '列1', dataIndex: 'field1', key: 'field1' },
    { title: '列2', dataIndex: 'field2', key: 'field2' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<Edit size={14} />}>
            编辑
          </Button>
          <Button type="link" danger icon={<Trash2 size={14} />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space>
            <Input placeholder="搜索关键词" />
            <Select placeholder="状态" style={{ width: 120 }} />
            <Button type="primary" icon={<Search size={16} />}>
              查询
            </Button>
            <Button type="primary" icon={<Plus size={16} />}>
              新增
            </Button>
          </Space>
          <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={(pag) => setPagination(pag)}
            rowKey="id"
          />
        </Space>
      </Card>
    </div>
  );
};

export default ListPage;
```

## 图表页面模板

```jsx
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Select } from 'antd';
import { Line, Column, Pie } from '@ant-design/charts';
import { Calendar } from 'lucide-react';

const ChartPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取数据
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const lineConfig = {
    data,
    xField: 'date',
    yField: 'value',
    point: { size: 4, shape: 'circle' },
    label: { style: { fill: '#aaa' } },
  };

  const columnConfig = {
    data,
    xField: 'category',
    yField: 'value',
    label: { position: 'top' },
  };

  const pieConfig = {
    data,
    angleField: 'value',
    colorField: 'category',
    label: { type: 'inner', offset: '-30%' },
  };

  return (
    <div className="page-container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space>
            <DatePicker picker="range" />
            <Select placeholder="数据类型" style={{ width: 120 }} />
            <Button type="primary" icon={<Calendar size={16} />}>
              查询
            </Button>
          </Space>
        </Card>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="折线图" loading={loading}>
              <Line {...lineConfig} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="柱状图" loading={loading}>
              <Column {...columnConfig} />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="饼图" loading={loading}>
              <Pie {...pieConfig} />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default ChartPage;
```

## 详情页面模板

```jsx
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取数据
      setData({});
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Card loading={loading}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space>
            <Button icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Button type="primary" icon={<Edit size={16} />}>
              编辑
            </Button>
            <Button danger icon={<Trash2 size={16} />}>
              删除
            </Button>
          </Space>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="字段1">{data.field1}</Descriptions.Item>
            <Descriptions.Item label="字段2">{data.field2}</Descriptions.Item>
            <Descriptions.Item label="字段3" span={2}>
              {data.field3}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </div>
  );
};

export default DetailPage;
```
