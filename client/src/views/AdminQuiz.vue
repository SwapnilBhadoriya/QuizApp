<template>

    <div>

        <button>Create a New Quiz</button>
        <button>Search and add Question</button>
        <button>Add a custom Question.</button>
        <div class="container-md text-white">
            <div class="mb-3">
                <label for="questionText" class="form-label">Question :</label>
                <input type="email" class="form-control" id="exampleFormControlInput1"
                    placeholder="Type the question here" v-model="customQuestion.questionText">
            </div>

            <div class="container-sm">

                <div class="mb-3" v-for="option, index in customQuestion.options">
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
            <button @click="createQuiz" class="btn btn-dark">Create Quiz </button>
        </div>
    </div>


</template>

<script>

import admin from '../services/admin'
export default {
    data: function () {

        return {
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