<template>
    <ECharts :options="defaultOptions" ref="chart"></ECharts>
</template>

<script>
    import ECharts from "vue-echarts";
    import "echarts";
    import {getPageViewData, lineChartDefaultOptions} from "./pageViewUtils";

    export default {
        name: "PageView",
        components: {ECharts},

        data: function () {
            return {
                defaultOptions: lineChartDefaultOptions,
            }
        },

        created() {
        },

        mounted() {
            this.fetchData();
        },

        methods: {
            fetchData: function () {
                this.$refs.chart.showLoading();

                getPageViewData()
                    .then(this.onFetchDataSuccess)
                    .catch(this.onFetchDataFailure);
            },
            onFetchDataFailure: function (error) {
                this.$refs.chart.hideLoading();
            },
            onFetchDataSuccess: function (chartsData) {
                // TODO: look here: data structure
                console.log('--------- look here: data structure ---------');
                console.log(chartsData);
                console.log('--------- look here: data structure ---------');

                this.$emit("renderCharts", this.$refs.chart, chartsData)

                this.$refs.chart.mergeOptions(chartsData[0].options);
                this.$refs.chart.hideLoading();

            }
        }
    }
</script>

<style scoped>

</style>
