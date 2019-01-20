import { Component } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import UserForm from './components/UserForm';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (user) => {
    const { dispatch } = this.props;
    console.log('新增提交');
    dispatch({
      type: 'users/create',
      payload: { user }
    });
  }

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="编辑用户" key="1">
          <UserForm data={{}} onSubmit={this.handleSubmit} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

export default connect()(CreateUser);
