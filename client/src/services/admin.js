import axios from "axios";

const token = "fg0tmt2UqbrBQ6MEWQvS0PRM9spXv1cVQpgibvT7";
const baseUrl = "http://localhost:5000/admin";
const apiUrl =
  "https://quizapi.io/api/v1/questions?apiKey=fg0tmt2UqbrBQ6MEWQvS0PRM9spXv1cVQpgibvT7&limit=10";

export default {
  getQuizzes: function () {
    return axios.get(baseUrl + "/quizzes");
  },
  createQuiz: function (path, data) {
    return axios.post(baseUrl + path, data);
  },
  searchQuestions: function (category) {
    return axios.get(apiUrl + "&category=" + category);
  },
  deleteQuiz: function (quizId) {
    return axios.delete(baseUrl + "/" + quizId);
  },
  getQuiz: function (quizId) {
    return axios.get(baseUrl + "/" + quizId);
  },
  updateQuestion: function (questionId, data) {
    return axios.patch(baseUrl + "/question/" + questionId, data);
  },
  deleteQuestion: function (questionId) {
    return axios.delete(baseUrl + "/question/" + questionId);
  },
  addQuestion:function(quiz_id,data){
      return axios.post(baseUrl+'/question/'+quiz_id,data);
  },
  updateQuiz: function (quizId, data) {
    return axios.patch(baseUrl + "/" + quizId, data);
  },
};
