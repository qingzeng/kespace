import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
  Divider,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import TableForm from './TableForm';
import styles from './MenberPrice.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  //   name: '仓库名',
  //   url: '仓库域名',
  //   owner: '仓库管理员',
  //   approver: '审批人',
  //   dateRange: '生效日期',
  //   type: '仓库类型',
  //   name2: '定金金额',
  //   url2: '团购时间',
  //   owner2: '尾款时间',
  //   approver2: '团购人数',
  //   dateRange2: '团购价格',
  //   menberLimit3: '砍价限定人数',
  //   bargainNum3: '砍价金额',

  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '定金金额',
  url2: '团购时间',
  owner2: '尾款时间',
  approver2: '团购人数',
  dateRange2: '团购价格',
  menberLimit3: '砍价限定人数',
  bargainNum3: '砍价金额',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      console.log('values', values);
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="会员价格设置"
        // content="高级表单常见于一次性输入和提交大批量数据的场景。"
        wrapperClassName={styles.advancedForm}
      >
        <Card className={styles.card} bordered={false}>
          <h3 style={{ marginTop: '20px' }}>基础价格</h3>
          <Divider />
          <Form layout="vertical" hideRequiredMark style={{ marginLeft: '10px' }}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="一个月的价格:">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入仓库名称' }],
                  })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="一年的价格:">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <h3 style={{ marginTop: '20px' }}>团队阶梯价格</h3>
          <Divider />
          <Form layout="vertical" hideRequiredMark style={{ marginLeft: '10px' }}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<DatePicker placeholder="请选择日期" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator('approver2', {
                    rules: [{ required: true, message: '请选择审批员' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <h3 style={{ marginTop: '20px' }}>砍价阶梯价格</h3>
          <Divider />
          <Form layout="vertical" hideRequiredMark style={{ marginLeft: '10px' }}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.menberLimit3}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.bargainNum3}>
                  {getFieldDecorator('url233', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedForm;
