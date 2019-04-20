import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Col, Row } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

class TableForm extends PureComponent {
  index = 1;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  // 转换到可编辑的模式
  toggleEditable = (e, key) => {
    e.preventDefault();
    console.log('toggleEditable');

    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));

    newData.push({
      key: `${this.index}`,
      num: '',
      yearVIPandroid: '',
      yearVIPios: '',
      monthVIPandroid: '',
      monthVIPios: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key, text) {
    // if (e.key === 'Enter') {
    console.log('handleKeyPress', e, key, text);
    console.log('text', text);

    this.saveRow(e, key);
  }

  handleFieldChange(e, fieldName, key, text) {
    console.log('handleFieldChange', e, fieldName, key, text);

    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    // onfocus,onblur
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.workId || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  saveChange(key, name, text) {
    console.log('saveChange');

    const { onChange } = this.props;
    const { data } = this.state;
    const tempData = data;
    tempData[key][name] = text;

    this.setState({ data: tempData });

    onChange(data);
  }

  render() {
    const columns = [

      {
        title: '组团人数',
        dataIndex: 'num',
        key: 'num',
        width: '19%',
        render: (text, record) => {
          // 保存最新的值
          // this.saveChange(record.key, 'num', text);
          return (
            // <Input
            //   value={text}
            //   onChange={e => this.handleFieldChange(e, 'yearVIPandroid', record.key)}
            //   onKeyUp={()=> this.saveChange(record.key,'num',text)}
            //   placeholder="VIP年价(安卓)"
            // />
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'yearVIPandroid', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="VIP年价(安卓)"
            />

          );
        },
      },
      {
        title: 'VIP年价(Android)',
        dataIndex: 'yearVIPandroid',
        key: 'yearVIPandroid',
        width: '19%',
        render: (text, record) => {
          if (true) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'yearVIPandroid', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="VIP年价(安卓)"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'VIP年价(ios)',
        dataIndex: 'yearVIPios',
        key: 'yearVIPios',
        width: '19%',
        render: (text, record) => {
          if (true) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'yearVIPios', record.key, text)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="VIP年价(ios)"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'VIP月价(Android)',
        dataIndex: 'monthVIPandroid',
        key: 'monthVIPandroid',
        width: '19%',
        render: (text, record) => {
          if (true) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'monthVIPandroid', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="VIP月价(安卓)"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'VIP月价(ios)',
        dataIndex: 'monthVIPios',
        key: 'monthVIPios',
        width: '19%',
        render: (text, record) => {
          if (true) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'monthVIPios', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="VIP月价(ios)"
              />
            );
          }
          return text;
        },
      },
      {
        title: '  ',
        key: 'action',
        width: '5%',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.key === '0') {
            return (
              <span>
                <Button onClick={this.newMember} icon="plus" />
              </span>
            );
          }

          return <Button onClick={() => this.remove(record.key)} icon="minus" />;

          // if (record.editable) {
          //   return <Button onClick={e => this.saveRow(e, record.key)} icon="save" />;
          // }

          // if (record.editable) {
          //   if (record.isNew) {
          //     return (
          //       <span>
          //         <a onClick={e => this.saveRow(e, record.key)}>添加</a>
          //         <Divider type="vertical" />
          //         <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
          //           <a>删除</a>
          //         </Popconfirm>
          //       </span>
          //     );
          //   }
          //   return (
          //     <span>
          //       <a onClick={e => this.saveRow(e, record.key)}>保存</a>
          //       <Divider type="vertical" />
          //       <a onClick={e => this.cancel(e, record.key)}>取消</a>
          //     </span>
          //   );
          // }
          // return (
          //   <span>
          //     <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
          //     <Divider type="vertical" />
          //     <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
          //       <a>删除</a>
          //     </Popconfirm>
          //   </span>
          // );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Row>
          <Col offset={1}>
            <h3>创建团购:</h3>
          </Col>
          <Col offset={1} span={16}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName={record => (record.editable ? styles.editable : '')}
            />
            {/* <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMember}
              icon="plus"
            >
              新增团购
            </Button> */}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default TableForm;
