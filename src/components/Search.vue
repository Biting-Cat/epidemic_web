<template>
  <div class="death-container">
    <div class=searchinput>
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select">
        <el-select v-model="select" slot="append" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
      </el-input>
    </div>
    <div class="search-chart" ref="search_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      // allData: null,
      timevalue: null,
      timerId: null, // 定时器

      input3: '',
      select: ''
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
    getData() {
      // 接口地址,在main.js里面可以调基准地址
      // const { data: ret } = await this.$http.get('/searchstateline'+'name')
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
    background-color: whitesmoke;
  }
</style>
