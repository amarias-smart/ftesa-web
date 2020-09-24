<template>
  <div ref="chart"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  name: "AMCharts",
  props: ["dataList", "title"],
  methods: {
    initChart() {
      let container = this.$refs.chart;
      let chart = am4core.create(container, am4charts.PieChart);

      chart.data = this.dataList;

      let title = chart.titles.create();
      title.text = this.title || "Chart";
      title.fontSize = 14;
      title.marginBottom = 5;
      title.marginTop = 5;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "type";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
  },
  created() {
    am4core.useTheme(am4themes_animated);
  },
  watch: {
    dataList(v) {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
