import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userService = {
  getAll: (limit = 30, skip = 0) =>
    api.get(`/users?limit=${limit}&skip=${skip}`),
  getById: (id) => api.get(`/users/${id}`),
  search: (query) => api.get(`/users/search?q=${query}`),
  getUserPosts: (userId) => api.get(`/users/${userId}/posts`),
  getUserTodos: (userId) => api.get(`/users/${userId}/todos`),
};

export const postService = {
  getAll: (limit = 10, skip = 0) => {
    return api.get(`/posts?limit=${limit}&skip=${skip}`);
  },

  getById: (id) => {
    return api.get(`/posts/${id}`);
  },

  search: (query) => {
    return api.get(`/posts/search?q=${query}`);
  },

  getComments: (postId) => {
    return api.get(`/posts/${postId}/comments`);
  },

  getByTag: (tag) => {
    return api.get(`/posts/tag/${tag}`);
  },

  create: (data) => {
    return api.post("/posts/add", data);
  },

  update: (id, data) => {
    return api.put(`/posts/${id}`, data);
  },

  delete: (id) => {
    return api.delete(`/posts/${id}`);
  },
};

export const commentService = {
  getAll: (limit = 10, skip = 0) => {
    return api.get(`/comments?limit=${limit}&skip=${skip}`);
  },

  getByPostId: (postId) => {
    return api.get(`/posts/${postId}/comments`);
  },

  create: (data) => {
    return api.post("/comments/add", data);
  },
};

export const todoService = {
  getAll: (limit = 20, skip = 0) => {
    return api.get(`/todos?limit=${limit}&skip=${skip}`);
  },

  getById: (id) => {
    return api.get(`/todos/${id}`);
  },

  getByUserId: (userId) => {
    return api.get(`/users/${userId}/todos`);
  },

  create: (data) => {
    return api.post("/todos/add", data);
  },

  update: (id, data) => {
    return api.put(`/todos/${id}`, data);
  },
  delete: (id) => {
    return api.delete(`/todos/${id}`);
  },
};

export const authService = {
  login: (username, password) => {
    return api.post("/auth/login", {
      username,
      password,
    });
  },
};
