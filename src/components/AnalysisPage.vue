<template>
    <div class="container">
        <ContainerHeader :title="title"></ContainerHeader>
        <div class="analysis-tabs">
            <AnalysisTab v-for="(item,index) in chartData" :key="index"
                         @changeSelectedTabIndex="changeSelectedTabIndex"
                         :tabTitle="item.metricName"
                         :percent="item.fluctuate"
                         :number="item.total"
                         :index="index"
                         :isActive="index==selected">
            </AnalysisTab>
        </div>
        <PageView @renderCharts="renderCharts"></PageView>

    </div>
</template>

<script>
    import AnalysisTab from '../components/AnalysisTab'
    import PageView from '../components/PageView'
    import ContainerHeader from '../components/ContainerHeader'

    export default {
        name: "AnalysisPage",
        components: {AnalysisTab, PageView, ContainerHeader},
        data() {
            return {
                chart: null,
                selected: 0,
                title: "访问分析",
                chartData: [],
            }
        },
        methods: {
            changeSelectedTabIndex: function (index) {
                this.selected = index;
                this.chart.showLoading();
                this.chart.mergeOptions(this.chartData[index].options);
                this.chart.hideLoading();

            },
            renderCharts: function(chart, chartData) {
                this.chartData = chartData;
                this.chart = chart;
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        .analysis-tabs {
            display: flex;
            flex: 1 1 auto;
        }

        .echarts {
            width: 790px;
            height: 400px;
            margin-left: 10px;
            margin-top: 50px;
        }
    }
</style>
