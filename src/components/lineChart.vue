<script>/* eslint-disable */
  import { Line } from 'vue-chartjs'

  export default {

    extends: Line,
    props: {
      chartdata: {
        type: Object,
          default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    data(){
        return {
            chartdata1: {
                labels: ['ddd', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#FC2525',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    },{
                        label: 'Data Two',
                        backgroundColor: '#05CBE1',
                        data: [33, 55, 32, 10, 2, 12, 53]
                    },{
                        label: 'Data Two',
                        backgroundColor: '#000000',
                        data: [60, 35, 32, 60, 2, 12, 53]
                    }
                ]
            },
        }
    },
    mounted (){

      this.renderChart(this.chartdata1,this.options);

    }
  }
</script>
