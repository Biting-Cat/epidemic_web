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
              <li>123456</li>
              <li>99896</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>美国累计感染人数</li>
              <li>美国累计死亡人数</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div id="map" class="chart"></div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="column">
        <div class="panel bar2">
          <div class="chart">
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel2 line2">
          <div class="chart"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '../../public/static/lib/flexible.js'
import Deathrate from '../components/Deathrate'
import Search from '../components/Search'
export default {
  components: {
    deathrate: Deathrate,
    search: Search
  },
  mounted() {
    // window.addEventListener('resize', this.screenAdapter)
  },
  methods: {
    getData() {
      // 接口地址,在main.js里面可以调基准地址
      // const { data: ret } = await this.$http.get('line')
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
  line-height: 1.15;
  min-width: 1024px;
  max-width: 1920px;
}
li {
  list-style: none;
}
header {
  height: 1.25rem;
  background-color: whitesmoke;
  background-size: 100% 100%;
  position: relative;
}
header h1 {
  font-size: 0.7rem;
  color: #5F8FC9;
  line-height: 1rem;
  text-align: center;
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
.mainbox .panel .search {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.mainbox .panel2 {
  position: relative;
  height: 8rem;
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: .1875rem;
  background:  whitesmoke;
}
.mainbox .panel2 .chart {
  height: 8rem;
}
.no{
  padding-top: .125rem;
  background: whitesmoke;
}
.no .no-hd {
  position: relative;
}

.no .no-hd ul {
  display: flex;
}
.no .no-hd ul li {
  flex: 1px;
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
  margin: .125rem;
}
.no .no-bd ul li {
  flex: 1;
  text-align: center;
  color: #000000;
  font-size: 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-top: 0.100rem;
}
.map {
  height: 10.58rem;
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
