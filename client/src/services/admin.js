import router from "@/router";
import axios from "axios";

const getheaders = function () {
  return { headers: { Authorisation: localStorage.getItem("token") } };
};
const baseUrl = "http://localhost:5000/admin";
const apiUrl =
  "https://quizapi.io/api/v1/questions?apiKey=fg0tmt2UqbrBQ6MEWQvS0PRM9spXv1cVQpgibvT7&limit=10";

export default {
  getQuizzes: function () {
    return axios.get(baseUrl + "/quizzes", getheaders());
  },
  createQuiz: function (path, data) {
    return axios.post(baseUrl + path, data, getheaders());
  },
  searchQuestions: function (category) {
    return axios.get(apiUrl + "&category=" + category, getheaders());
  },
  deleteQuiz: function (quizId) {
    return axios.delete(baseUrl + "/" + quizId, getheaders());
  },
  getQuiz: function (quizId) {
    return axios.get(baseUrl + "/" + quizId, getheaders());
  },
  updateQuestion: function (questionId, data) {
    return axios.patch(baseUrl + "/question/" + questionId, data, getheaders());
  },
  deleteQuestion: function (questionId) {
    return axios.delete(baseUrl + "/question/" + questionId, getheaders());
  },
  addQuestion: function (quiz_id, data) {
    return axios.post(baseUrl + "/question/" + quiz_id, data, getheaders());
  },
  updateQuiz: function (quizId, data) {
    return axios.patch(baseUrl + "/" + quizId, data, getheaders());
  },
  logOut: function () {
    localStorage.clear();
    router.push("/login");
  },
};
