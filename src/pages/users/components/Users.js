import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Link from 'umi/link';
import router from 'umi/router';
import { Button, Table, Pagination, Popconfirm, Divider } from 'antd';
import styles from './Users.less';

const PAGE_SIZE = 5;

function Users({ dispatch, list: dataSource, loading, total, current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/delete',
      payload: id
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }));
  }

  function handleEdit(user) {
    console.log('编辑：', user);
    dispatch({
      type: 'users/setEditUser',
      payload: user
    });
    router.push(`/users/${user.id}/edit`);
  }

  function handleCreate(user) {
    router.push('/users/add');
  }

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span className={styles.operation}>
        <a onClick={handleEdit.bind(this, record)}>编辑</a>
        {/* <Link to={`/users/${record.id}/edit`}>编辑</Link> */}
        <Divider type="vertical" />
        <Popconfirm title="确认删除?" onConfirm={deleteHandler.bind(null, record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    )
  }];

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.toolbar}>
          <Button type="primary" onClick={handleCreate.bind(null)}>新增用户</Button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className={styles.paginationWrapper}
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, current } = state.users;
  return {
    list,
    total,
    current,
    loading: state.loading.models.users
  };
}

export default connect(mapStateToProps)(Users);
