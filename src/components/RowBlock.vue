<template>
    <div class="row">
        <div class="blocks">
            <GridBlock :value="gridValue(x-1, y)" v-for="x in 7"></GridBlock>
        </div>
        <div class="timeline" v-html="getRowTimeline(y)"></div>
    </div>
</template>

<script>
    import GridBlock from '../components/GridBlock'

    export default {
        name: "RowBlock",
        components: {GridBlock,},
        props: {
            y: {
                type: Number,
                default: 0
            },
            values : {
                type: String,
                default: '{}'
            }
        },
        data(){
            return {
                timeLines: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
                            '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
            }
        },
        methods: {
            gridValue : function (x, y) {
                let dictValues = JSON.parse(this.values);
                return dictValues[x + "," + y]
            },

            getRowTimeline: function (y) {
                if(y % 2 == 0){
                    return this.timeLines[Math.floor(y/2)]
                }else{
                    return '&nbsp;'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .row {
        display: flex;

        .blocks {
            display: flex;
            min-height: 10px;
            margin-bottom: 5px;
            width: 88%;
            margin-right: 15px;
        }

        .timeline {
            font-size: 12px;
            color: #737373;
            align-items: center;
            min-height: 10px;
            margin-bottom: 5px;
        }
    }
</style>
