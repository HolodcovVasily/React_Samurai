import axios from "axios";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "1fada8e7-e857-42a7-8105-6cc545c89ee5",
  },
});

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(profileId) {
    console.warn("Obsolute methode. Please use profileAPI obj");
    return profileAPI.getProfile(profileId);
  },
};

export const profileAPI = {
  getProfile(profileId) {
    return instance.get(`profile/${profileId}`);
  },
  getStatus(profileId) {
    return instance.get(`profile/status/${profileId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
