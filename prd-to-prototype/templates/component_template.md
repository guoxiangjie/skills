# 通用组件模板

## 表单组件

### SearchForm.jsx

```jsx
// src/components/forms/SearchForm.jsx
import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { Search, RotateCcw } from 'lucide-react';

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <Form form={form}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="keyword">
            <Input placeholder="关键词" prefix={<Search size={14} />} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status">
            <Select placeholder="状态" allowClear>
              <Select.Option value="1">启用</Select.Option>
              <Select.Option value="0">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="date">
            <Input placeholder="日期" type="date" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleSearch} icon={<Search size={14} />}>
            查询
          </Button>
          <Button onClick={handleReset} icon={<RotateCcw size={14} />} style={{ marginLeft: 8 }}>
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
```

### FormBuilder.jsx

```jsx
// src/components/forms/FormBuilder.jsx
import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Switch } from 'antd';

const FormBuilder = ({ fields, form }) => {
  const renderField = (field) => {
    const { type, name, label, options, ...rest } = field;

    switch (type) {
      case 'input':
        return <Input placeholder={`请输入${label}`} {...rest} />;
      case 'textarea':
        return <Input.TextArea placeholder={`请输入${label}`} {...rest} />;
      case 'select':
        return (
          <Select placeholder={`请选择${label}`} {...rest}>
            {options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'date':
        return <DatePicker style={{ width: '100%' }} {...rest} />;
      case 'number':
        return <InputNumber style={{ width: '100%' }} {...rest} />;
      case 'switch':
        return <Switch {...rest} />;
      default:
        return <Input placeholder={`请输入${label}`} {...rest} />;
    }
  };

  return (
    <>
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          valuePropName={field.type === 'switch' ? 'checked' : 'value'}
        >
          {renderField(field)}
        </Form.Item>
      ))}
    </>
  );
};

export default FormBuilder;
```

## 列表组件

### DataTable.jsx

```jsx
// src/components/lists/DataTable.jsx
import React from 'react';
import { Table } from 'antd';

const DataTable = ({ loading, columns, data, pagination, onChange }) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={onChange}
      rowKey="id"
    />
  );
};

export default DataTable;
```

### CardList.jsx

```jsx
// src/components/lists/CardList.jsx
import React from 'react';
import { Card, Row, Col, Avatar, Tag, Space } from 'antd';
import { User, Calendar, Edit, Trash2 } from 'lucide-react';

const CardList = ({ data, onEdit, onDelete }) => {
  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col span={8} key={item.id}>
          <Card
            hoverable
            actions={[
              <Edit size={16} onClick={() => onEdit(item)} />,
              <Trash2 size={16} onClick={() => onDelete(item)} />,
            ]}
          >
            <Card.Meta
              avatar={<Avatar icon={<User size={20} />} />}
              title={item.title}
              description={item.description}
            />
            <div style={{ marginTop: 16 }}>
              <Space>
                <Tag color="blue">{item.status}</Tag>
                <span>
                  <Calendar size={12} style={{ marginRight: 4 }} />
                  {item.date}
                </span>
              </Space>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
```

## 图表组件

### LineChart.jsx

```jsx
// src/components/charts/LineChart.jsx
import React from 'react';
import { Line } from '@ant-design/charts';

const LineChart = ({ data, xField = 'date', yField = 'value' }) => {
  const config = {
    data,
    xField,
    yField,
    point: {
      size: 4,
      shape: 'circle',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    smooth: true,
  };

  return <Line {...config} />;
};

export default LineChart;
```

### ColumnChart.jsx

```jsx
// src/components/charts/ColumnChart.jsx
import React from 'react';
import { Column } from '@ant-design/charts';

const ColumnChart = ({ data, xField = 'category', yField = 'value' }) => {
  const config = {
    data,
    xField,
    yField,
    label: {
      position: 'top',
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  return <Column {...config} />;
};

export default ColumnChart;
```

### PieChart.jsx

```jsx
// src/components/charts/PieChart.jsx
import React from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = ({ data, angleField = 'value', colorField = 'category' }) => {
  const config = {
    data,
    angleField,
    colorField,
    label: {
      type: 'inner',
      offset: '-30%',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'pie-legend-active',
      },
    ],
  };

  return <Pie {...config} />;
};

export default PieChart;
```

## 工具函数

### request.js

```javascript
// src/utils/request.js
import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 错误处理
    if (error.response?.status === 401) {
      // 未授权，跳转登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;
```

### helpers.js

```javascript
// src/utils/helpers.js
import dayjs from 'dayjs';

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const formatNumber = (num) => {
  return num?.toLocaleString();
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

export const throttle = (fn, delay) => {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last > delay) {
      fn.apply(this, args);
      last = now;
    }
  };
};
```
