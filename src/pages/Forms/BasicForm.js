import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, Divider} from 'antd';

const data = [
  {
    phoneId: '1',
    city: 'John Brown',
    school: 32,
    member: 'New York No. 1 Lake Park',
    logintime: 'New York No. 1 Lake Park',
    lasttime: 'New York No. 1 Lake Park',
    partner: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
];

const columns = [
  {
    title: 'openID/手机号',
    dataIndex: 'phoneId',
    key: 'phoneId',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '学校',
    dataIndex: 'school',
    key: 'school',
  },
  {
    title: '会员',
    dataIndex: 'member',
    key: 'member',
  },
  {
    title: '注册时间',
    dataIndex: 'logintime',
    key: 'logintime',
  },
  {
    title: '上次登陆时间',
    dataIndex: 'lasttime',
    key: 'lasttime',
  },
  {
    title: '合伙人归属',
    dataIndex: 'partner',
    key: 'partner',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'tags',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];

const field = [
  '选择区域',
  '选择学校',
  '选择学校',
  '请选择日期',
  '请选择日期',
  '是否会员',
  'ID搜索',
  'ID搜索',
  '用户等级',
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class AdvancedSearchForm extends React.Component {
  state = {
    expand: true,
    itemNum: 9,
  };

  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < field.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={field[i]}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} {...formItemLayout}>
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;
