<template>
  <div ref="g2chart"></div>
</template>

<script>
import { Chart } from "@antv/g2";

export default {
  name: "g2PieChart",
  props: ["dataList"],
  methods: {
    initializeChart() {
      const _this = this;
      const chart = new Chart({
        container: _this.$refs.g2chart,
        autoFit: true,
        height: 200,
        padding: [40, 0]
      });

      chart.data(_this.dataList);

      chart.coordinate("theta", {
        startAngle: Math.PI,
        endAngle: Math.PI * (4 / 2)
      });

      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });

      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type")
        .label("type");

      chart.interaction("element-active");

      chart.render();
    }
  },
  mounted() {
    this.initializeChart();
  }
};
</script>
