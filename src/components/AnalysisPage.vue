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
        <div class="dimensions">
            <CustomLegend v-for="(item, index) in legendData" :key="index"
                          :percent="item.fluctuate"
                          :name="item.name"
                          :index="index+1"
                          :totalNumber="item.summaryCount">
            </CustomLegend>
        </div>
        <div class="footer">
            <Dropdown trigger="click" class="dropdown-menu-range">
                <div class="select-title">今天<Icon type="ios-arrow-down"></Icon></div>
                <DropdownMenu slot="list">
                    <DropdownItem>今日</DropdownItem>
                    <DropdownItem>过去7天</DropdownItem>
                    <DropdownItem>过去30天</DropdownItem>
                    <DropdownItem>自定义</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <div class="show-more">
                查看更多
                <Icon type="ios-arrow-forward" />
            </div>
        </div>
    </div>
</template>

<script>
    import AnalysisTab from '../components/AnalysisTab'
    import PageView from '../components/PageView'
    import ContainerHeader from '../components/ContainerHeader'
    import CustomLegend from '../components/CustomLegend'

    export default {
        name: "AnalysisPage",
        components: {AnalysisTab, PageView, ContainerHeader, CustomLegend},
        data() {
            return {
                chart: null,
                selected: 0,
                title: "访问分析",
                chartData: [],
                legendData: [],
            }
        },
        methods: {
            changeSelectedTabIndex: function (index) {
                this.selected = index;
                this.chart.showLoading();
                this.chart.mergeOptions(this.chartData[index].options);
                this.chart.hideLoading();
                this.legendData=this.chartData[index].customLegends;

            },
            renderCharts: function(chart, chartData) {
                this.chartData = chartData;
                this.chart = chart;
                this.legendData = chartData[0].customLegends;
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

        .dimensions {
            width: 800px;
            height: 50px;
            margin-top: 30px;
            display: flex;
            justify-content: space-around;
        }

        .footer {
            width: 790px;
            margin-top: 30px;
            border-top: 1px solid #e8e8e8;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .dropdown-menu-range {
                font-size: 14px;
                color: #737373;

                .select-title {
                    margin: 15px 25px;
                }
            }

            .show-more {
                font-size: 14px;
                color: #00bbbd;
                cursor: pointer;
            }
        }
    }
</style>
