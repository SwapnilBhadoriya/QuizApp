<template>

    <div class=" text-bg-dark container-sm m-2 rounded-4">
        <div class="p-3 m-auto">
            <div class="fw-bold fs-5 text-wrap text-break p-2 border border-primary rounded">
                {{ questionText }}
            </div>

        </div>
        <div class="p-4">
            <div class="p-1 fw-bold m-1" v-for="option,index in options">{{index +' ' +option }}</div>
        </div>
    </div>




</template>

<script>
export default {
    props: ['questionText', 'options','answer'],
    data: function () {
        return {
        }
    }
}
</script>

<style>

</style>