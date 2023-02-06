import axios from "axios";

const baseUrl = "http://localhost:5000/user/";
const getToken = () => {
  return localStorage.getItem("token");
};
const headers = { Authorization: localStorage.getItem("token") };

export default {
  getQuizzes: function (user_id) {
    headers.Authorization = getToken();
    return axios.get(baseUrl + user_id + "/quizzes", { headers });
  },
  getQuizQuestions: function (user_id, quizId) {
    return axios.get(baseUrl + user_id + "/quizzes/" + quizId, { headers });
  },
  getAnswers: function (user_id, quizId) {
    return axios.get(baseUrl + user_id + "/result/" + quizId, { headers });
  },
};
