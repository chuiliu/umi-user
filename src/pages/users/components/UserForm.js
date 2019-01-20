import { Component } from 'react';
import { Form, Input } from 'antd';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './UserForm.less';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
        router.push('/users');
      }
    });
  }

  handleCancel = () => {
    // router.goBack();
    router.push('/users');
    this.props.onCancel && this.props.onCancel();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name = '', email = '', phone = '' } = this.props.data;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 }
    };

    return (
      <div className={styles.wrapper}>
        <Form horizontal="true" onSubmit={this.handleSubmit}>
          <Form.Item
            label="用户名"
            {...formItemLayout}
          >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写用户名!'}],
                initialValue: name
              })(<Input />)
            }
          </Form.Item>
          <Form.Item
            label="邮箱"
            {...formItemLayout}
          >
            {
              getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请填写邮箱!' },
                  { type: 'email', message: '邮箱格式有误!' }
                ],
                initialValue: email
              })(<Input />)
            }
          </Form.Item>
          <Form.Item
            label="手机号"
            {...formItemLayout}
          >
            {
              getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请填写手机号!' },
                  { pattern: /^1(3|5|8)[0-9]{9}$/, message: '手机号格式有误!' }
                ],
                initialValue: phone
              })(<Input />)
            }
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 4, offset: 2 }}
          >
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={this.handleCancel}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(UserForm);
