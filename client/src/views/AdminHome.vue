

<template>
    <div>
        <h1>Admin Panel</h1>
        <div class="container-md d-flex flex-column">
            <RouterLink to="/admin/create"><button class="btn btn-primary m-1">Create a New Quiz</button></RouterLink>
            <RouterLink to="/admin/manage"><button class="btn btn-primary m-1">Manage Quizzes</button></RouterLink>
            <!-- <RouterLink><button class="btn btn-primary m-1">User Analytics</button></RouterLink> -->
        </div>
        <router-view></router-view>
    </div>
</template>