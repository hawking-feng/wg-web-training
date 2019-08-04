<template>
    <div :class="['grid-block', getColorByValue(value)]"></div>
</template>

<script>
    export default {
        name: "GridBlock",
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        methods: {
            getColorByValue: function(value) {
                if(value >= 0 && value < 900) {
                    return 'color-1'
                } else if(value >= 900 && value < 1800) {
                    return 'color-2'
                } else if(value >= 1800 && value < 2700) {
                    return 'color-3'
                } else if (value >= 2700) {
                    return 'color-4'
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .grid-block {
        width: 100%;
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
