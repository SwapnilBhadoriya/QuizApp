<template>
    <div class="message container-sm w-50 p-3 text-white fw-bold text-center" :class="success ? 'bg-success' : 'bg-danger'">{{ message }}</div>
</template>

<script>
export default {
    props: ['message', 'success'],
}
</script>
<style>
.message {
    position: fixed;
    top: 50px;
    left: 50px;
    right: 50px;

}
</style>