<template>
  <div class="death-container" @dblclick="revertMap">
    <div class="death-chart" ref="Deathrate_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
// 按需导入州名对应文件的函数
import { getStateInfo } from '@/utils/map_utils'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      usaOption: null,
      mapdata: {}
    }
  },
  // mounted才能获取$ref
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 创建图表
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.Deathrate_ref)
      const ret = await axios.get('http://localhost:8999/static/map/USA.json')
      this.$echarts.registerMap('USA', ret.data, {
        Alaska: { // 把阿拉斯加移到美国主大陆左下方
          left: -131,
          top: 25,
          width: 15
        },
        Hawaii: {
          left: -110, // 夏威夷
          top: 28,
          width: 5
        },
        'Puerto Rico': { // 波多黎各
          left: -76,
          top: 26,
          width: 2
        }
      })
      const initoption = {
        title: {
          text: 'USA Population Estimates (2012)',
          subtext: 'Data from www.census.gov',
          sublink: 'http://www.census.gov/popest/data/datasets.html',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            var value = (params.value + '').split('.')
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            return params.seriesName + '<br/>' + params.name + ': ' + value
          }
        },
        visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['High', 'Low'], // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: true,
          // orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            restore: {}
          }
        },
        series: [
          {
            name: 'USA PopEstimates',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
              label: {
                show: true
              }
            },
            // 文本位置修正
            textFixed: {
              Alaska: [20, -20]
            },
            data: [
              { name: 'Alabama', value: 4822023 },
              { name: 'Alaska', value: 731449 },
              { name: 'Arizona', value: 6553255 },
              { name: 'Arkansas', value: 2949131 },
              { name: 'California', value: 38041430 },
              { name: 'Colorado', value: 5187582 },
              { name: 'Connecticut', value: 3590347 },
              { name: 'Delaware', value: 917092 },
              { name: 'District of Columbia', value: 632323 },
              { name: 'Florida', value: 19317568 },
              { name: 'Georgia', value: 9919945 },
              { name: 'Hawaii', value: 1392313 },
              { name: 'Idaho', value: 1595728 },
              { name: 'Illinois', value: 12875255 },
              { name: 'Indiana', value: 6537334 },
              { name: 'Iowa', value: 3074186 },
              { name: 'Kansas', value: 2885905 },
              { name: 'Kentucky', value: 4380415 },
              { name: 'Louisiana', value: 4601893 },
              { name: 'Maine', value: 1329192 },
              { name: 'Maryland', value: 5884563 },
              { name: 'Massachusetts', value: 6646144 },
              { name: 'Michigan', value: 9883360 },
              { name: 'Minnesota', value: 5379139 },
              { name: 'Mississippi', value: 2984926 },
              { name: 'Missouri', value: 6021988 },
              { name: 'Montana', value: 1005141 },
              { name: 'Nebraska', value: 1855525 },
              { name: 'Nevada', value: 2758931 },
              { name: 'New Hampshire', value: 1320718 },
              { name: 'New Jersey', value: 8864590 },
              { name: 'New Mexico', value: 2085538 },
              { name: 'New York', value: 19570261 },
              { name: 'North Carolina', value: 9752073 },
              { name: 'North Dakota', value: 699628 },
              { name: 'Ohio', value: 11544225 },
              { name: 'Oklahoma', value: 3814820 },
              { name: 'Oregon', value: 3899353 },
              { name: 'Pennsylvania', value: 12763536 },
              { name: 'Rhode Island', value: 1050292 },
              { name: 'South Carolina', value: 4723723 },
              { name: 'South Dakota', value: 833354 },
              { name: 'Tennessee', value: 6456243 },
              { name: 'Texas', value: 26059203 },
              { name: 'Utah', value: 2855287 },
              { name: 'Vermont', value: 626011 },
              { name: 'Virginia', value: 8185867 },
              { name: 'Washington', value: 6897012 },
              { name: 'West Virginia', value: 1855413 },
              { name: 'Wisconsin', value: 5726398 },
              { name: 'Wyoming', value: 576412 },
              { name: 'Puerto Rico', value: 3667084 }
            ]
          }
        ]
      }
      this.usaOption = initoption

      this.chartInstance.setOption(initoption)
      // 点击美国地图显示对应州的地址
      this.chartInstance.on('click', async(arg) => {
        const stateInfo = getStateInfo(arg.name)
        const statepath = await axios.get('http://localhost:8999/' + stateInfo.path)
        console.log(statepath)
        this.$echarts.registerMap(stateInfo.key, statepath.data)
        const changeOption = {
          title: {
            text: '双击空白部分回到主地图',
            left: 'right'
          },
          series: [{
            type: 'map',
            map: stateInfo.key,
            label: {
              show: true
            }
          }]
        }
        this.chartInstance.setOption(changeOption)
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
    updateChart() {},
    screenAdapter() {
      const titleFontSize = (this.$refs.Deathrate_ref.offsetWidth / 100) * 3.6
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
    revertMap() {
      // 由于option的各个部分可以互相覆盖的,只需要把改变的地方赋值回去就好了。
      const changeoption = {
        title: {
          text: 'USA Population Estimates (2012)',
          left: 'right'
        },
        series: [{
          name: 'USA PopEstimates',
          type: 'map',
          roam: true,
          map: 'USA',
          label: {
            show: false
          }
        }]
      }
      this.chartInstance.setOption(changeoption)
    }
  }
}
</script>

<style></style>
