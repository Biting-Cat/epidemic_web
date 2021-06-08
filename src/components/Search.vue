<template>
  <div class="death-container">
    <div class=searchinput>
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    </div>
    <div class="search-chart" ref="search_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      // 图表的基本数据
      chartData: null,
      stateName: 'New York',
      timevalue: null,
      restaurants: [],
      state: '',
      timerId: null// 定时器
    }
  },
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
      this.chartInstance = this.$echarts.init(this.$refs.search_ref)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    async getData() {
      // 接口地址,在main.js里面可以调基准地址
      const { data: res } = await this.$http.get('allstate')
      this.restaurants = res.map(item => ({ value: item }))
      // console.log(this.restaurants)
      this.defaultchart()
      this.startInterval()
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    async handleSelect(item) {
      // console.log(item)
      this.stateName = item.value
      const statePath = 'searchstateline?state=' + this.stateName
      // console.log(statePath)
      const { data: ret } = await this.$http.get(statePath)
      this.chartData = ret
      // console.log(this.chartData)
      this.updateChart()
    },
    async defaultchart() {
      const statePath = 'searchstateline?state=New YorK'
      const { data: ret } = await this.$http.get(statePath)
      const defaultcfrList = ret.cfrlist.map((item) => {
        return (item * 100).toFixed(2)
      })
      const defaultOption = {
        title: {
          text: '州病死率'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a}: {c}%<br>日期：{b} '
        },
        legend: {
          data: ['州病死率']
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
          data: ret.dateList
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          }
        },
        series: [
          {
            smooth: true,
            name: '病死率',
            type: 'line',
            data: defaultcfrList
          }
        ]
      }
      this.chartInstance.setOption(defaultOption)
    },
    updateChart() {
      if (this.chartData.cfrlist !== '') {
        const cfrList = this.chartData.cfrlist.map((item) => {
          return (item * 100).toFixed(2)
        })
        // option的静态部分
        const changeoption = {
          xAxis: {
            type: 'category',
            data: this.chartData.dateList
          },
          series: [
            {
              smooth: true,
              name: '病死率',
              type: 'line',
              data: cfrList
            }
          ]
        }
        this.chartInstance.setOption(changeoption)
      } else {
        console.log('please choose a state')
      }
    },
    screenAdapter() {
      const titleFontSize = this.$refs.search_ref.offsetWidth / 100 * 3.6
      // console.log(titleFontSize)
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
.searchinput {
  width: 100%;
margin-top: .0125rem;
  }
  .search-chart {
    height: 90%;
    width: 100%;
    border: 0;
    overflow: hidden;
  }
 .inline-input  {
    width: 100%;
  }
</style>
