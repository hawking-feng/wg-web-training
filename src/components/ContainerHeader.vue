<template>
    <div class="title">{{title}}</div>
</template>

<script>
    export default {
        name: "ContainerHeader",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .title {
        width: 100%;
        height: 60px;
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        display: flex;
        align-items: center;
        padding-left: 24px;
    }
</style>
