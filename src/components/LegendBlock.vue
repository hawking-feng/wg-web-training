<template>
    <div :class="['legend-block', 'color-'+index]"></div>
</template>

<script>
    export default {
        name: "LegendBlock",
        props: {
            index: {
                type: Number,
                default: 1
            }
        },
    }
</script>

<style scoped lang="scss">
    .legend-block {
        width: 100%;
        height: 10px;
        flex-direction: column;

        &:not(:first-child) {
            margin-left: 5px;
        }
    }
    .color-1 {
        opacity: 0.3;
        background-color: #44a5f5;
    }
    .color-2 {
        opacity: 0.8;
        background-color: #44a5f5;
    }
    .color-3 {
        background-color: #4892f6;
    }
    .color-4 {
        opacity: 0.9;
        background-color: #2e5ec5;
    }
</style>
