import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  Card,
  Radio,
  Icon,
  Popover,
  Upload,
  message,
} from 'antd';
import { withRouter } from 'react-router-dom';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import FooterToolbar from '@/components/FooterToolbar';
import TableForm from './TeamBuyCreatTableForm';
// import TableForm from './TeamBuyCreatTableTest';
import styles from './TeamBuyCreat.less';


const FormItem = Form.Item;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;


const tableData = [
  {
    key: '0',
    num: '50',
    yearVIPandroid: '70',
    yearVIPios: '100',
    monthVIPandroid: '70',
    monthVIPios: '100',
  },
];

// const tableData = [
//   {
//     key: '1',
//     workId: '00001',
//     name: 'John Brown',
//     department: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     workId: '00002',
//     name: 'Jim Green',
//     department: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     workId: '00003',
//     name: 'Joe Black',
//     department: 'Sidney No. 1 Lake Park',
//   },
// ];

const fieldLabels = {
  activeName: '活动名称',
  activeAddress: '活动地址',
  activePicture: '活动图片',
  activeTime: '活动时间',
  totalLimit: '总限制数',
  dayLimit: '每日限制数',
  Duration: '持续时间',
  yearVIPpayAndroid: '年费VIP预付价格(安卓)',
  yearVIPpayios: '年费VIP预付价格(ios)',
  monthVIPpayAndroid: '月费VIP预付金额(安卓)',
  monthVIPpayios: '月费VIP预付金额(ios)',
  permissCoupon: '是否可使用优惠卷',
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    loading: false,
    imageUrl: '',
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      console.log('value', values);
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

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

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator},
    } = this.props;
    const { history } = this.props;

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


    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl;

    return (
      <PageHeaderWrapper title="创建团购">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
            {...formItemLayout}
          >
            <FormItem label={<FormattedMessage id="couponCommen.activeName" />}>
              {getFieldDecorator('activeName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="couponCommen.activeAddress" />}>
              {getFieldDecorator('activeAddress', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>

            <FormItem label={<FormattedMessage id="couponCommen.totalLimit" />}>
              {getFieldDecorator('totalLimit', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="couponCommen.dayLimit" />}>
              {getFieldDecorator('dayLimit', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.Duration" />}>
              {getFieldDecorator('Duration', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.yearVIPpayAndroid" />}>
              {getFieldDecorator('yearVIPpayAndroid', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.yearVIPpayios" />}>
              {getFieldDecorator('yearVIPpayios', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.monthVIPpayAndroid" />}>
              {getFieldDecorator('monthVIPpayAndroid', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.monthVIPpayios" />}>
              {getFieldDecorator('monthVIPpayios', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="couponCommen.activeTime" />}>
              {getFieldDecorator('grade')(
                <span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
                    -
                  </span>
                  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </span>
              )}
            </FormItem>
            <FormItem label={<FormattedMessage id="couponCommen.activePicture" />}>
              {getFieldDecorator('activePicture', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="/upload.do"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: '104px', height: '104px' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem label={<FormattedMessage id="teamBuy.permissCoupon" />}>
              {getFieldDecorator('permissCoupon', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Card>
        {/* 加入表单项 */}

        <Card bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <Card bordered={false}>
          <Row>
            <Col span={8} offset={6}>
              {this.getErrorInfo()}
              <Button type="primary" onClick={this.validate} loading={submitting}>
                提交
              </Button>
              <Button type="primary" style={{ marginLeft: '20px' }}>
                返回
              </Button>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default withRouter(BasicForms);
