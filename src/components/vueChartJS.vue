<template>
  <div></div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  name: "VueChartJS",
  extends: Bar,
  props: ["chartdata", "options"],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
