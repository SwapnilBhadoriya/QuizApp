<template>

    <div class="container mt-5">
        <RouterLink to="/admin"><button class="btn btn-dark">Home</button></RouterLink>
        <h1 class="text-center text-primary">All Quizzes</h1>
        <table class="table table-dark border rounded table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(quiz, index) in quizzes" :key="quiz.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ quiz.name }}</td>
                    <td>{{ quiz.description }}</td>
                    <td>
                        <RouterLink :to="'/admin/manage/' + quiz.id"><button class="btn btn-primary m-1">View/Edit</button>
                        </RouterLink>
                        <button class="btn btn-danger m-1" @click="deleteQuiz(quiz.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import admin from '../services/admin'
export default {
    created: function () {
        this.getQuizzes();
    },
    methods: {
        getQuizzes: function () {
            admin.getQuizzes().then((response) => {
                this.quizzes = response.data.quizzes;
            }).catch((error) => {
                console.log('Error in fetching the quizzes');
            })
        },
        deleteQuiz: function (quizId) {
            admin.deleteQuiz(quizId).then((response) => {
                this.getQuizzes();
            })
        },
        editQuiz: function (quiz) {

        }
    },

    data: function () {
        return {
            quizzes: []
        }
    }
}
</script>

<style scoped>

</style>