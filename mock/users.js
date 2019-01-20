import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const PAGE_SIZE = 5;

let users = Mock.mock({
  'list|10-100': [{
    'id|+1': 1,
    'name': '@cname',
    'email': '@email',
    'phone': /1(3|5|8)[0-9]{9}/,
    'createTime': '@date',
    'status': /(0|1)/
  }]
}).list;

const proxy = {
  'GET /api/users': (req, res) => {
    console.log('GET: ', req.query);
    let { query: { page, limit } } = req;
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    limit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : PAGE_SIZE;

    const data = users.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + limit);
    res.json({
      code: 200,
      data: {
        list: data,
        page: {
          total: users.length,
          current: page
        }
      }
    });
  },
  'POST /api/users': (req, res) => {
    console.log('create', req.body);
    let { user } = req.body;
    let date = new Date();

    user.id = users.length;
    user.status = 1;
    user.createTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    users.unshift(user);
    res.json({
      code: 200,
      data: user
    });
  },
  'GET /api/users/:id': (req, res) => {
    console.log('query an user: ', req.params.id);
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id, 10)) || {};
    res.json({
      code: 200,
      data: user
    });
  },
  'PUT /api/users/:id': (req, res) => {
    console.log('update', req.body, req.params);
    const id = parseInt(req.params.id, 10);
    const user = req.body;
    users.map(u => {
      return u.id === id ? Object.assign(u, user) : u;
    });
    res.json({
      code: 200
    });
  },
  'DELETE /api/users/:id': (req, res) => {
    console.log('delete', req.params);
    let { id } = req.params;
    id = parseInt(id, 10);
    users = users.filter(u => u.id !== id);
    res.json({
      code: 200
    });
  }
}

export default delay(proxy, 300);
