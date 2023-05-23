import axios from "axios";

const baseUrl = "http://localhost:3001/posts";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPost) => {
  return axios.post(baseUrl, newPost);
};

const deletePost = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, changedPost) => {
  return axios.put(`${baseUrl}/${id}`, changedPost);
};

export default { getAll, create, deletePost, update };
