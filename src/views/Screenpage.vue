<template>
  <div class="screen-container">
    <!-- 头部 -->
    <header>
      <h1>美国疫情信息查询及趋势预测</h1>
    </header>
    <!-- 页面主体盒子 -->
    <section class="mainbox">
      <!-- 左侧 -->
      <div class="column">
        <div class="panel bar">
          <div class="chart">
            <deathrate></deathrate>
          </div>
        </div>
        <div class="panel2">
          <div class="chart">
            <search></search>
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>{{ death }}</li>
              <ol>|</ol>
              <li>{{ cease }}</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>美国累计感染人数</li>
              <ol></ol>
              <li>美国累计死亡人数</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div id="map" class="chart">
            <usamap></usamap>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="column">
        <div class="panel3">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="address" label="地区" width="180">
            </el-table-column>
            <el-table-column prop="cease" label="累计感染" width="180">
            </el-table-column>
            <el-table-column prop="deaths" label="累计死亡"> </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '../../public/static/lib/flexible.js'
import Deathrate from '../components/Deathrate'
import Search from '../components/Search'
import Usamap from '../components/Usamap'
export default {
  components: {
    deathrate: Deathrate,
    search: Search,
    usamap: Usamap
  },
  data() {
    return {
      allData: null,
      death: 12323,
      cease: 12323,
      tableData: [
        {
          address: '佛罗里达',
          cease: '213',
          deaths: '12'
        },
        {
          address: '密歇根',
          cease: '334',
          deaths: '21'
        },
        {
          address: '纽约',
          cease: '113',
          deaths: '8'
        },
        {
          address: '华盛顿',
          cease: '43',
          deaths: '2'
        }
      ]
    }
  },
  mounted() {
    // window.addEventListener('resize', this.screenAdapter)
  },
  methods: {
    getData() {
      // 接口地址,在main.js里面可以调基准地址
      // const { data: ret } = await this.$http.get('total ')
      // console.log(ret)
      // this.allData = ret
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
.screen-container {
  margin: 0;
  line-height: 1.15;
  min-width: 1024px;
  max-width: 1920px;
}
header h1 {
  font-size: 0.475rem;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  margin: 0;
}
li {
  list-style: none;
}
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(../../public/static/font/DS-DIGIT.TTF);
}
header {
  height: 1.25rem;
  background-color: whitesmoke;
  background-size: 100% 100%;
  position: relative;
}
header h1 {
  font-size: 0.7rem;
  color: #f86551;
  line-height: 1rem;
  text-align: center;
  padding-right: 1.60rem;
}
.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0.125rem;
  padding-bottom: 0;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
}
.mainbox .panel {
  position: relative;
  height: 3.875rem;
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  background: whitesmoke;
}
.mainbox .panel .chart {
  height: 3rem;
}
.mainbox .panel2 {
  position: relative;
  height: 8rem;
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  background: whitesmoke;
}
.mainbox .panel3 {
  position: relative;
  height: 11.875rem;
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.25rem;
  background: whitesmoke;
}
.mainbox .panel2 .chart {
  height: 5rem;
}
.no {
  padding-top: 0.125rem;
  background: whitesmoke;
}
.no .no-hd {
  position: relative;
}

.no .no-hd ul {
  display: flex;
  padding: .20rem;
}
.no .no-hd ul li {
  flex: 1px;
  height: 1rem;
  font-size: 0.875rem;
  color: #f86551;
  text-align: center;
  font-family: electronicFont;
  position: relative;
}
.no .no-hd ul ol{
  height: 1rem;
  font-size: 0.875rem;
  color: #f86551;
  text-align: center;
  /* font-family: electronicFont;计数器字体，需要引入 */
  position: relative;
}
.no .no-bd ul {
  display: flex;
  background: whitesmoke;
  margin: 0.125rem;
}
.no .no-bd ul li {
  flex: 1;
  text-align: center;
  color: #000000;
  font-size: 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-top: 0.1rem;
}
.map {
  height: 9.76rem;
  position: relative;
  overflow: hidden;
  background: whitesmoke;
}
.map .chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10.125rem;
}
.panel3 .el-table {
  background: whitesmoke;
}
/* 约束屏幕尺寸 */
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
</style>
