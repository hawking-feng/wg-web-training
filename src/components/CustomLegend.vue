<template>
    <div class="legend-container">
        <div class="dimension">
            <div :class="['circle', 'circle-color-'+index]"></div>
            <span class="title">{{name}}</span>
            <div class="percent">
                <Icon type="md-arrow-dropup" class="increase" v-if="percent >= 0"/>
                <Icon type="md-arrow-dropdown" class="fall" v-else/>
                <span :class='[percent>=0?"increase":"fall"]'>{{percent}}%</span>
            </div>
        </div>
        <div class="total-number">{{totalNumber}}</div>
    </div>
</template>

<script>
    export default {
        name: "CustomLegend",
        props: {
            index: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: ''
            },
            percent: {
                type: Number,
                default: 0
            },
            totalNumber: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped lang="scss">
    .legend-container {
        width: 120px;

        .dimension {
            display: flex;
            align-items: center;

            .circle {
                height: 12px;
                width: 12px;
                border-radius: 50%;
                margin-bottom: -1px;
            }

            .circle-color-1 {
                background-color: #f5a623;
            }

            .circle-color-2 {
                background-color: #6fd148;
            }

            .circle-color-3 {
                background-color: #4892f6;
            }

            .title {
                margin-left: 6px;
                font-size: 14px;
                color: #333333;
            }

            .percent {
                margin-left: 12px;
                font-size: 12px;

                .increase {
                    color: #00BBBD;
                }

                .fall {
                    color: #F16565;
                }
            }
        }
        .total-number {
            font-size: 24px;
            font-weight: 500;
            color: #333333;
        }
    }
</style>
