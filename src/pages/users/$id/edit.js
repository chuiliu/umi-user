import { Component } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import UserForm from '../components/UserForm';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, match : { params: { id } } } = this.props;
    console.log('mount', id);
    dispatch({
      type: 'users/queryUser',
      payload: { id }
    });
  }

  handleSubmit = (user) => {
    console.log('编辑提交', user);
    const { dispatch, match : { params: { id } } } = this.props;
    dispatch({
      type: 'users/update',
      payload: {
        id,
        user
      }
    });
  }

  render() {
    const { loading, user = {}} = this.props;
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="编辑用户" key="1">
          <UserForm data={user} onSubmit={this.handleSubmit} />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

function mapStateToProps(state) {
  const { editUser } = state.users;
  return {
    user: editUser,
    loading: state.loading.models.users
  }
}

export default connect(mapStateToProps)(EditUser);
