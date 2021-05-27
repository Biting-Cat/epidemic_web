<template>
  <div class="death-container">
    <div class="death-chart" ref="Deathrate_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      timerId: null // 定时器
    }
  },
  // mounted才能获取$ref
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
  },
  destroyed() {
    clearInterval(this.timerId)
  },
  methods: {
    // 创建图表
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.Deathrate_ref)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    getData() {
      // 接口地址,在main.js里面可以调基准地址
      // const { data: ret } = await this.$http.get('line')
      // console.log(ret)
      // this.allData = ret
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      // option的静态部分
      const initoption = {
        title: {
          text: '病死率'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['病死率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: this.allData.deaths
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            smooth: true,
            name: '病死率',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      this.chartInstance.setOption(initoption)
    },
    screenAdapter() {
      const titleFontSize = this.$refs.Deathrate_ref.offsetWidth / 100 * 3.6
      console.log(titleFontSize)
      const adapteroption = {
        title: {
          textstyle: {
            fontsize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          },
          series: {
            linewidth: titleFontSize
          }
        }
      }
      this.chartInstance.setOption(adapteroption)
      this.chartInstance.resize()
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.updateChart()
      }, 3000)
    }
  }
}
</script>

<style>
</style>
