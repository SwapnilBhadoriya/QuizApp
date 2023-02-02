<template>
    <div class="container-md">

        <RouterLink to="/admin/manage"><button class="btn btn-primary">Go Back</button></RouterLink>

        <!-- Quiz Details Section -->
        <div class="container-sm w-50 d-flex flex-column">
            <label class="form-label p-1 text-white" for="">Quiz Title : <input type="text" class="form-control m-1"
                    v-model="quiz.name"></label>
            <label class="form-label p-1 text-white" for="">Quiz Description : <input type="text"
                    class="form-control m-1" v-model="quiz.description"></label>
            <button class="btn btn-success w-50 m-1 d-block m-auto" @click="updateQuizdetails">Update</button>
        </div>


        <button @click="show = true" class="btn btn-dark">Add Question</button>
        <!-- Add Question Section -->
        <div v-if="show" class="container-md m-3 text-center text-white">
            <div class="m-1">
                <label for="questionText" class="form-label">Question :</label>
                <input type="email" class="form-control w-80" id="exampleFormControlInput1"
                    placeholder="Type the question here" v-model="customQuestion.questionText">
            </div>

            <div class="container-sm">

                <div class="m-1 d-flex align-items-center " v-for="option, index in customQuestion.options">
                    <label :for="'option' + index" class="form-label">Option :{{ index+ 1 }}</label>
                    <input class="form-control m-1 w-50" placeholder="Type the option here" :id="'option' + index"
                        type="text" v-model="customQuestion.options[index]">
                </div>
                <div>
                    <p>Select the correct Answer :</p>
                    <select class="form-select" aria-label="Default select example"
                        v-model="customQuestion.correctAnswer">

                        <option v-for="(answer, index) in customQuestion.options" :key="index" :value="answer">
                            {{ answer }}
                        </option>



                    </select>
                    <p class="fw-bold">Correct Answer : {{ customQuestion.correctAnswer }}</p>
                </div>
            </div>

            <button @click="show = false" class="btn btn-danger m-1">Close</button>
            <button @click="addQuestion" class="btn btn-dark m-1">Add to Quiz </button>

        </div>







        <!-- Questions -->
        <h2 style="color:palegreen">Questions :</h2>
        <div class="container-md text-center text-white" v-if="questions.length === 0">No questions in this quiz.</div>
        <div v-else v-for="customQuestion, number in questions">
            <div class="container-md w-75 m-3 text-white">
                <div class="m-1">
                    <label for="questionText" class="form-label">Question : {{ number+ 1}}</label>
                    <input type="text" class="form-control w-80" id="exampleFormControlInput1"
                        placeholder="Type the question here" v-model="customQuestion.question">
                </div>

                <div class="container-sm">

                    <div class="m-1 d-flex align-items-center ">
                        <label for="option1" class="form-label">Option :1</label>
                        <input class="form-control m-1 w-50" placeholder="Type the option here" id="option1" type="text"
                            v-model="customQuestion.option1">
                    </div>
                    <div class="m-1 d-flex align-items-center ">
                        <label for="option2" class="form-label">Option :2</label>
                        <input class="form-control m-1 w-50" placeholder="Type the option here" id="option2" type="text"
                            v-model="customQuestion.option2">
                    </div>
                    <div class="m-1 d-flex align-items-center ">
                        <label for="option3" class="form-label">Option :3</label>
                        <input class="form-control m-1 w-50" placeholder="Type the option here" id="option3" type="text"
                            v-model="customQuestion.option3">
                    </div>
                    <div class="m-1 d-flex align-items-center ">
                        <label for="option4" class="form-label">Option :4</label>
                        <input class="form-control m-1 w-50" placeholder="Type the option here" id="option4" type="text"
                            v-model="customQuestion.option4">
                    </div>


                    <div>
                        <p>Select the correct Answer :</p>
                        <select class="form-select" aria-label="Default select example"
                            v-model="customQuestion.correct_option">

                            <option :value="customQuestion.option1">
                                {{ customQuestion.option1 }}
                            </option>
                            <option :value="customQuestion.option2">
                                {{ customQuestion.option2 }}
                            </option>
                            <option :value="customQuestion.option3">
                                {{ customQuestion.option3 }}
                            </option>
                            <option :value="customQuestion.option4">
                                {{ customQuestion.option4 }}
                            </option>


                        </select>
                        <p class="fw-bold">Correct Answer : {{ customQuestion.correct_option }}</p>
                    </div>
                </div>


                <button @click="updateQuestion(number)" class="btn btn-dark m-1">Update Questtion</button>
                <button @click="deleteQuestion(number)" class="btn btn-danger m-1">Delete Questtion</button>

            </div>
        </div>
    </div>

</template>

<script>
import admin from '@/services/admin';
import user from '@/services/user';

export default {
    created: function () {
        this.fetchQuiz();
        this.fetchQuestions();

    },

    data: function () {
        return {
            show: false,
            quiz: { name: '', description: '' },
            questions: [],
            customQuestion: {
                questionText: '',
                options: ['', '', '', ''],
                correctAnswer: ''
            },
        }
    },
    methods: {
        deleteQuestion: function (index) {
            admin.deleteQuestion(this.questions[index].question_id).then((response) => {
                this.fetchQuestions();
            }).catch((error) => {
                console.log('Error in deleting the question', error)
            })

        },
        addQuestion: function () {
            const quizId = this.$route.params.quizId
            admin.addQuestion(quizId,this.customQuestion).then((response)=>{
                this.fetchQuestions()
            })
        },

        updateQuestion: function (index) {
            const question = { ...this.questions[index] };
            const data = {
                question: question.question,
                option1: question.option1,
                option2: question.option2,
                option3: question.option3,
                option4: question.option4,
                correct_option: question.correct_option
            }

            admin.updateQuestion(question.question_id, data).then((response) => {
                this.fetchQuestions();
            })
        },
        updateQuizdetails: function () {
            const quizId = this.$route.params.quizId
            admin.updateQuiz(quizId, this.quiz).then((response) => {
                this.fetchQuiz();
            }).catch((error) => {
                console.log('Error in updation of quiz details', error);
            })
        },
        fetchQuiz: function () {
            const quizId = this.$route.params.quizId
            admin.getQuiz(quizId).then((response) => {
                this.quiz = response.data.quiz[0];

            })
        },
        fetchQuestions: function () {
            const quizId = this.$route.params.quizId
            user.getQuizQuestions(quizId).then((response) => {
                this.questions = response.data.questions;
                for (let i = 0; i < this.questions.length; i++) {
                    const question = this.questions[i];
                    const options = [question.option1, question.option2, question.option3, question.option4];
                    this.questions[i].options = options;
                }
            })
        },
        saveChanges: function () {

        }
    }
}
</script>