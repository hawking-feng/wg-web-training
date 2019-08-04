<template>
    <div class="legend-text">{{number}}</div>
</template>

<script>
    export default {
        name: "LegendText",
        props: {
            number: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped lang="scss">
    .legend-text {
        height: 10px;
        display: flex;
        flex-direction: column;
        font-family: DINOT;
        font-size: 12px;
        letter-spacing: -0.29px;
        text-align: center;
        color: #737373;

        &:first-child {
            margin-right: 10px;
        }

        &:last-child {
            margin-left: -10px;
        }
    }
</style>
