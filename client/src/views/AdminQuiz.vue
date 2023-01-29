<template>

    <div class="container">
        <h2 class="fw-bold text-secondary">Quiz Details :</h2>
        <div class="container-fluid d-flex flex-column">
            <label class="form-label p-1 text-white" for="">Quiz Title : <input type="text"
                    class="form-control m-1" v-model="quizTitle"></label>
            <label class="form-label p-1 text-white" for="">Quiz Description : <input type="text"
                    class="form-control m-1" v-model="quizDescription"></label>
            <button class="btn btn-success w-50 m-1 d-block m-auto" @click="createQuiz">Create Quiz</button>
        </div>


        <div class="text-center m-2">
            <button class="btn btn-secondary m-1" @click="show = 'search'">Search and add Question</button>
            <button class="btn btn-secondary m-1" @click="show = 'custom'">Add a custom Question.</button>
            <button class="btn btn-secondary m-1" @click="show = 'preview'">Quiz Preview</button>
        </div>


        <!-- Search and Add -->
        <div v-if="show === 'search'" class="container-md">
            <input type="text" class="form-control" placeholder="search">
        </div>


        <!-- Custom question Box -->
        <div v-if="show === 'custom'" class="container-md m-3 text-center text-white">
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


            <button @click="addToQuiz" class="btn btn-dark">Add to Quiz </button>

        </div>


        <!-- Preview Questions -->
        <div v-if="show === 'preview'">
            <div v-if="questions.length == 0">
                <p class="fw-bold text-white text-center">No Questions added in the quiz .</p>
            </div>
            <question v-for="question, index in questions" :key="'q' + index" :questionText="question.questionText"
                :options="question.options"></question>
        </div>

    </div>


</template>

<script>

import admin from '../services/admin';
import question from '../components/question.vue';
export default {
    components: {
        question
    },
    data: function () {

        return {
            show:'',
            questions: [],
            quizTitle: '',
            quizDescription: '',
            customQuestion: {
                questionText: '',
                options: ['', '', '', ''],
                correctAnswer: ''
            },

        }
    },
    computed: {
        quizDetails: function () {
            return { questions: this.questions, title: this.quizTitle, description: this.quizDescription };
        }
    },

    methods: {

        createQuiz: function () {
            try {
                admin.createQuiz('/create', this.quizDetails).then((response) => {
                    console.log(response.data);
                })

            } catch (error) {
                console.log(error);
            }

        },

        addToQuiz: function () {
            const { questionText, options, correctAnswer } = this.customQuestion;
            let flag = 0;
            for (let i = 0; i < options.length; i++) {
                if (options[i] === '') {
                    flag = 1;
                }
            }
            if (questionText !== '' && correctAnswer != '' && flag != 1) {
                alert('hello world')
                this.questions.push(this.customQuestion);
                console.log(this.customQuestion);
            }
            else {
                console.log('Empty fields are not allowed')
            }

        }
    }
}



</script>

<style scoped>

</style>