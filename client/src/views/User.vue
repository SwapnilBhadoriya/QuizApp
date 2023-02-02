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
            <div v-for="question, index in questions" class="question-container m-2">
                <h3>{{ index + 1 }}. {{ question.question }}</h3>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option1" v-model="answers[index]"
                        :id="'question-{{ index }}-option1'">
                    <label class="form-check-label" :for="'question-{{ index }}-option1'">{{ question.option1 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option2" v-model="answers[index]"
                        :id="'question-{{ index }}-option2'">
                    <label class="form-check-label" :for="'question-{{ index }}-option2'">{{ question.option2 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option3" v-model="answers[index]"
                        :id="'question-{{ index }}-option3'">
                    <label class="form-check-label" :for="'question-{{ index }}-option3'">{{ question.option3 }}</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" :value="question.option4" v-model="answers[index]"
                        :id="'question-{{ index }}-option4'">
                    <label class="form-check-label" :for="'question-{{ index }}-option4'">{{ question.option4 }}</label>
                </div>
                <button @click="removeSelection(index)" v-if="answers[index] !== ''" class="btn btn-secondary">Remove
                    Selection</button>
            </div>
            <button @click="getResult(currentQuiz.id)" class="btn btn-success">Submit</button>


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