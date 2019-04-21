import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message,Row,Col } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './TeamBuyCreatTableForm.less';

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

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
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

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveChange() {
    const { onChange } = this.props;
    const { data } = this.state;
    onChange(data);
  }

  saveRow(e, key) {
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

  render() {
    const columns = [
      {
        title: '组团人数',
        dataIndex: 'num',
        key: 'num',
        width: '15%',
        render: (text, record) => {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChange(e, 'num', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              onKeyUp={() => this.saveChange()}
              placeholder="成员姓名"
            />
          );
        },
      },
      {
        title: 'VIP年价格(android)',
        dataIndex: 'yearVIPandroid',
        key: 'yearVIPandroid',
        width: '20%',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'yearVIPandroid', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              onKeyUp={() => this.saveChange()}
              placeholder="工号"
            />
          );
        },
      },
      {
        title: 'VIP年价(ios)',
        dataIndex: 'yearVIPios',
        key: 'yearVIPios',
        width: '20%',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'yearVIPios', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="所属部门"
            />
          );
        },
      },
      {
        title: 'VIP月价(android)',
        dataIndex: 'monthVIPandroid',
        key: 'monthVIPandroid',
        width: '20%',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'monthVIPandroid', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              onKeyUp={() => this.saveChange()}
              placeholder="工号"
            />
          );
        },
      },
      {
        title: 'VIP月价(ios)',
        dataIndex: 'monthVIPios',
        key: 'monthVIPios',
        width: '20%',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'monthVIPios', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="所属部门"
            />
          );
        },
      },
      {
        title: '操作',
        key: 'action',
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
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default TableForm;
