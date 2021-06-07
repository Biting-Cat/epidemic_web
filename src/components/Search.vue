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
      chartData: null,
      stateName: null,
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
      const { data: ret } = await this.$http.get('/searchstateline?state=New York')
      console.log(ret)
      this.chartData = ret
      const { data: res } = await this.$http.get('/allstate')
      this.restaurants = res.map(item => ({ value: item }))
      console.log(this.restaurants)
      this.updateChart()
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
    handleSelect(item) {
      console.log(item)
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
          data: ['邮件营销', '联盟广告']
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
          data: ['邮件营销', '联盟广告', '视频广告']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      this.chartInstance.setOption(initoption)
    },
    screenAdapter() {
      const titleFontSize = this.$refs.search_ref.offsetWidth / 100 * 3.6
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
.searchinput {
  width: 100%;
margin-top: .0125rem;
  }
  .search-chart{
    height: 90%;
    width: 100%;
    border: 0;
    overflow: hidden;
  }
 .input-with-select .el-input__inner{
    height: .630rem;
  }
</style>
