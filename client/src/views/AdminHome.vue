

<template>
    <div class="container">
        <h1>Admin Panel</h1>
        <div class="container-md d-flex flex-column">
            <RouterLink to="/admin/create"><button class="btn btn-primary m-1">Create a New Quiz</button></RouterLink>
            <RouterLink to="/admin/manage"><button class="btn btn-primary m-1">Manage Quizzes</button></RouterLink>
            <button @click="logOut" class="w-25 btn btn-dark">Logout</button>
            <!-- <RouterLink><button class="btn btn-primary m-1">User Analytics</button></RouterLink> -->
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import admin from '@/services/admin';
export default{
    methods:{
        logOut:function(){
            admin.logOut();
        }
    }
}
</script>