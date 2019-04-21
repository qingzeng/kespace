import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './partnerManageDetail.less';

@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  //tab页面切换
  onTabChange = key => {
    const { match } = this.props;
    console.log('match', match.url);
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children,
    } = this.props;

    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            分享收益记录 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
      {
        key: 'applications',
        tab: (
          <span>
            提现记录<span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];

    return (
      <GridContent>
        <Row gutter={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
            {currentUser && Object.keys(currentUser).length ? (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser.signature}</div>
                </div>
                <Row style={{ marginBottom: '20px' }}>
                  <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
                    手机号码：
                  </Col>
                  <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
                    openID：
                  </Col>
                  <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
                    注册时间：
                  </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                  <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
                    住所地址：
                  </Col>
                  <Col xs={12} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
                    兴趣爱好：
                  </Col>
                </Row>
                {/* <div className={styles.detail}>
                  <p>
                    <i className={styles.address} />
                    {currentUser.geographic.province.label}
                    {currentUser.geographic.city.label}
                  </p>
                </div> */}
              </div>
            ) : (
              'loading...'
            )}
          </Card>
        </Row>
        <Row gutter={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            //activeTabKey={location.pathname.replace(`${match.path}/`, '')}
            activeTabKey="market/partnerManageDetail/articles"
            onTabChange={this.onTabChange}
            loading={listLoading}
          >
            {children}
          </Card>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
