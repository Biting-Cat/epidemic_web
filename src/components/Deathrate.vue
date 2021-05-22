<template>
  <div class="death-container">
      <div class="death-chart" ref="Deathrate_ref">S</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.Deathrate_ref)
    },
    getData () {
      // 接口地址
      this.$http.get()
    },
    updateChart () {
    }
  }
}
</script>

<style>

</style>
