<template>
    <div class="container">
        <ContainerHeader :title="title"></ContainerHeader>
        <div class="heatmap">
            <div class="charts">
                <div class="column-titles">
                    <ColumnTitle v-for="day in weekdays" :day="day"></ColumnTitle>
                </div>
                <RowBlock v-for="y in 24" :y="y-1" :values="gridData"></RowBlock>
            </div>
            <div class="legend">
                <div class="color-group">
                    <LegendBlock v-for="n in 4" :index="n"></LegendBlock>
                </div>
                <div class="text-group">
                    <LegendText v-for="num in dataColorRange" :number="num"></LegendText>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import ContainerHeader from '../components/ContainerHeader'
    import LegendBlock from '../components/LegendBlock'
    import LegendText from '../components/LegendText'
    import Footer from '../components/Footer'
    import RowBlock from '../components/RowBlock'
    import ColumnTitle from '../components/ColumnTitle'

    import { fetchHeatMapData } from "./pageViewUtils";


    export default {
        name: "HeatMap",
        components: {ContainerHeader, LegendBlock, LegendText, Footer, RowBlock, ColumnTitle},
        data() {
            return {
                title: "平台访问量",
                dataColorRange: ['0', '900', '1,800', '2,700', '3,600'],
                weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                gridData: '{}'
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            fetchData: function(){
                fetchHeatMapData().then(res =>{
                    let result = {};
                    let rowsData = res.result.data[0].rows;
                    // 将原Array数据转成字典，key为坐标轴=（item[0], item[1]）, value用来计算颜色
                    for(let index in rowsData) {
                        let item = rowsData[index];
                        result[item[0]+","+item[1]] = item[2]
                    }

                    this.gridData = JSON.stringify(result)
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100%;

        .heatmap {
            border-top: 1px solid #ebeced;
            padding-left: 25px;

            .charts {
                margin-top: 15px;
                width: 80%;

                .column-titles {
                    width: 88%;
                    display: flex;
                    margin-bottom: 10px;
                }
            }

            .legend {
                margin-top: 17px;
                margin-bottom: 15px;
                width: 70%;
                height: 30px;

                .color-group {
                    height: 10px;
                    display: flex;
                }

                .text-group {
                    margin-top: 4px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
