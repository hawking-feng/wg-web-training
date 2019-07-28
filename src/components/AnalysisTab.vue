<template>
    <div :class='[isActive ? "active" : "", "tab"]' @click="changeSelectTab(index)">
        <div class="title-container">
            <span class="title">{{tabTitle}}</span>
            <div class="percent">
                <Icon type="md-arrow-dropup" class="increase" v-if="percent > 0"/>
                <Icon type="md-arrow-dropdown" class="fall" v-else/>
                <span :class='[percent>0?"increase":"fall"]'>{{percent}}%</span>
            </div>
        </div>
        <div class="total-number">{{number}}</div>
    </div>
</template>

<script>
    export default {
        name: "AnalysisTab",
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            index: {
                type: Number,
                default: 0
            },
            percent: {
                type: Number,
                default: 0
            },
            number: {
                type: String,
                default: '0'
            },
            tabTitle: {
                type: String,
                default: ''
            }
        },
        methods: {
            changeSelectTab: function(index){
                this.$emit("changeSelectedTabIndex", index)
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab {
        width: 263px;
        height: 96px;
        padding-left: 24px;
        background-color: #f7f7f7;
        border-top: 1px solid #e8e8e8;

        &.active {
            background-color: #ffffff;
        }

        &:not(:last-child) {
            border-right: 1px solid #dfdfdf;
        }

        .title-container {
            display: flex;
            align-items: flex-end;
            height: 36px;

            .title {
                font-size: 14px;
                color: #333333;
            }

            .percent {
                padding-left: 12px;

                .increase {
                    color: #00BBBD;
                }

                .fall {
                    color: #F16565;
                }

                Icon {
                    align-items: center;
                }

                span {
                    font-size: 12px;
                }
            }

        }

        .total-number {
            font-size: 24px;
            font-weight: 500;
            color: #333333;
            display: flex;
            align-items: center;
            height: 60px;
        }
    }
</style>
