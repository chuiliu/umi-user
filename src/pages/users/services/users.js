import request from '@/utils/request';

export function getUsers({ page = 1, limit = 5}) {
  return request(`/api/users?page=${page}&limit=${limit}`);
};

export function addUser(user) {
  return request(`/api/users`, {
    method: 'POST',
    body: JSON.stringify(user)
  });
};

export function removeUser(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  });
};

export function queryUser(id) {
  return request(`/api/users/${id}`, {
    method: 'GET'
  });
};

export function updateUser(id, user) {
  return request(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user)
  });
};
