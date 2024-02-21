import { defineStore } from 'pinia'
import axios from 'axios';
const EndPoint = process.env.API_ENDPOINT;
const USER = `${EndPoint}/users`;
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  getters: {
      getusers() {
        return this.users;
      },
  },
  
  actions: {
      async fetchUsersList(params) {
        return new Promise((resolve, reject) => {
          axios.get(USER, { params })
            .then((res) => {
              console.log(res);
              if (res.status) {
                this.users = res.data.users;
                resolve(res);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },

      async createUser(data) {
        return new Promise((resolve, reject) => {
          axios.post(USER, data)
            .then((res) => {
              if (res.data) {
                this.users.push(res.data);
                resolve(res);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
  
      async updateUser(id,data) {
        return new Promise((resolve, reject) => {
          axios.put(`${USER}/${id}`, data)
            .then((res) => {
              if (res.data) {
                this.users = this.users.map((user) => {
                  if (user.id === id) {
                    return res.data;
                  }
                  return user;
                });
                resolve(res);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
  
      async deleteUser(id) {
        return new Promise((resolve, reject) => {
          axios.delete(`${USER}/${id}`)
            .then((res) => {
              if (res.data) {
                resolve(res);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
  
      async fetchUser(id) {
        return new Promise((resolve, reject) => {
          axios.get(`${USER}/${id}`)
            .then((res) => {
              if (res.data) {
                resolve(res);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
  })
