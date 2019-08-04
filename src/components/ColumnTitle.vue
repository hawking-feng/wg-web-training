<template>

    <div class="weekday">{{day}}</div>
</template>

<script>
    export default {
        name: "ColumnTitle",
        props: {
            day: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped lang="scss">
    .weekday {
        width: 100%;
        flex-direction: column;
        text-align: center;

        &:not(:first-child) {
            margin-left: 5px;
        }
    }
</style>
