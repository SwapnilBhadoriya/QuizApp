<template>

    <div class="container text-white">

        <div v-if="show === 'Quizzes'">
            <h1>All Quizzes </h1>
            <div class="quiz container-fluid rounded border border-secondary m-2 p-2" v-for="quiz in quizzes"
                :key="quiz.id">
                <h2>{{ quiz.name }}</h2>
                <p>{{ quiz.description }}</p>
                <button class="btn btn-dark" @click="activateQuiz(quiz)">Start Quiz</button>

            </div>
        </div>

        <div v-if="show === 'Quiz'" class="quiz-container container-fluid">

            <h1>{{ currentQuiz.name }}</h1>
            <button @click="show = 'Quizzes'; answers = [];" class="btn btn-dark rounded m-2">Quit Quiz</button>
            <div v-for="question, index in questions" class="question-container m-2">
                <h3>{{ index + 1 }}. {{ question.question }}</h3>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option1" v-model="answers[index]"
                        :id="'option1'+index">
                    <label class="form-check-label" :for="'option1'+index">{{ question.option1 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option2" v-model="answers[index]"
                        :id="'option2'+index">
                    <label class="form-check-label" :for="'option2'+index">{{ question.option2 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option3" v-model="answers[index]"
                        :id="'option3'+index">
                    <label class="form-check-label" :for="'option3'+index">{{ question.option3 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option4" v-model="answers[index]"
                        :id="'option4'+index">
                    <label class="form-check-label" :for="'option4'+index">{{ question.option4 }}</label>
                </div>
                <button v-if="answers[index] !== ''" @click="removeSelection(index)"  class="btn btn-secondary">Remove
                    Selection</button>
            </div>
            <button @click="getResult(currentQuiz.id)" class="btn btn-success m-3">Submit</button>


        </div>
        <!-- Result Container -->
        <div v-if="show === 'Result'" class="container">
            <h2>Quiz Results </h2>
            <h3 class="text-bg-info p-1 rounded">Quiz Name : {{ result.quiz.name }}</h3>
            <p>Your score is : {{ result.score }}</p>
            <p>Percentage : {{ result.percentage }}%</p>
            <button @click="show = 'Quizzes'" class="btn btn-dark rounded">Back To Quizzes</button>
        </div>
    </div>

</template>

<script>
import user from '../services/user'

import Question from '@/components/question.vue';
export default {
    created: function () {
        user.getQuizzes().then((response) => {
            this.quizzes = response.data.quizzes;
        }).catch((error) => {
            console.log(error);
        });
    },
    methods: {
        getResult: async function (quizId) {
            try {
                user.getAnswers(quizId).then((response) => {
                    const correctAnswers = response.data.answers;
                    console.log(correctAnswers);
                    let correct = 0;
                    let incorrect = 0;
                    let score = 0;
                    for (let i = 0; i < this.questions.length; i++) {
                        if (this.answers[i] === correctAnswers[i].correct_option) {
                            score++;
                        }
                    }
                    this.result.score = score + '/' + this.questions.length;
                    this.result.percentage = ((score / this.questions.length) * 100).toFixed(1);
                    let copy = { ...this.currentQuiz };
                    this.result.quiz = copy;

                    this.show = 'Result';
                    this.questions = [];
                    this.answers = [];
                })
            } catch (error) {
                console.log('Error in fetching the results .')
            }

        },
        activateQuiz: function (quiz) {
            this.show = 'Quiz';
            this.currentQuiz = quiz
            user.getQuizQuestions(quiz.id).then((response) => {
                this.questions = response.data.questions;
                this.questions.forEach(element => {
                    this.answers.push('');
                });
            })
        },
        removeSelection: function (index) {
            this.answers[index] = '';
        }
    },
    data: function () {
        return {
            currentQuiz: '',
            show: 'Quizzes',
            quizzes: [],
            questions: [],
            answers: [],
            result: { score: '' }
        };
    },
    components: { Question }
}

</script>

<style scoped>
.quiz {
    max-width: 70%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: gray;
    cursor: pointer;
    color: black;
}

.quiz:hover {
    background: black;
    color: mediumaquamarine;
}
</style>