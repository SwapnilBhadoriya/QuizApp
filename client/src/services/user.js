import axios from "axios";

const baseUrl = 'http://localhost:5000/user';


export default {
    getQuizzes:function(){
        return axios.get(baseUrl+'/quizzes');
    },
    getQuizQuestions:function(quizId){
        return axios.get(baseUrl+'/quizzes/'+quizId);
    },
    getAnswers:function(quizId){
        return axios.get(baseUrl+'/result/'+quizId);
    }
}