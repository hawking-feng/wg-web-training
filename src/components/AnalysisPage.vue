<template>
    <div class="container">
        <ContainerHeader :title="title"></ContainerHeader>
        <div class="analysis-tabs">
            <AnalysisTab v-for="(item,index) in tabsData" :key="index"
                         @changeSelectedTabIndex="changeSelectedTabIndex"
                         :tabTitle="item.tablTitle"
                         :percent="item.percent"
                         :number="item.number"
                         :index="index"
                         :isActive="index==selected">
            </AnalysisTab>
        </div>
        <PageView></PageView>

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
                selected: 0,
                title: "访问分析",
                tabsData:[{
                    tablTitle: "总访问量",
                    percent: 15,
                    number: '204,138'
                },{
                    tablTitle: "总访客数",
                    percent: 15,
                    number: '9,624'
                },{
                    tablTitle: "总访问时长",
                    percent: -8,
                    number: '8时34分22秒'
                },]
            }
        },
        methods: {
            changeSelectedTabIndex: function (index) {
                this.selected = index;
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
