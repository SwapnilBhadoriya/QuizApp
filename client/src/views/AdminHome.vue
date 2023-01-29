<template>
    <div>
        <h1>Admin Panel</h1>
        <RouterLink to="/admin/create"><button class="btn btn-primary m-1">Create a New Quiz</button></RouterLink>
        <button class="btn btn-primary m-1">Manage Quizzes</button>
        <button class="btn btn-primary m-1">User Analytics</button>
        <router-view></router-view>
    </div>
</template>