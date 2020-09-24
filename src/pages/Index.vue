<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <div class="col-md-4">
        <q-card>
          <CHART :dataList="minWithOpenFT" title="MIN With Open FT:" />
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <CHART :dataList="ftReviews" title="FT Reviews:" />
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <CHART :dataList="ftWithOpenFT" title="FT With Open FT:" />
        </q-card>
      </div>

      <div class="col-md-12">
        <REPORT :dataList="dataList" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    CHART: () => import("components/amCharts"),
    REPORT: () => import("components/report")
  },

  data() {
    return {
      dataList: []
    };
  },

  computed: {
    minWithOpenFT() {
      let yesData = this.dataList.filter(f => f["MIN With Open FT"] === "Yes")
        .length;
      let noData = this.dataList.filter(f => f["MIN With Open FT"] === "No")
        .length;

      return [
        {
          type: "YES",
          value: yesData
        },
        {
          type: "NO",
          value: noData
        }
      ];
    },

    ftWithOpenFT() {
      let yesData = this.dataList.filter(f => f["FT With Open FT"] === "Yes")
        .length;
      let noData = this.dataList.filter(f => f["FT With Open FT"] === "No")
        .length;

      return [
        {
          type: "YES",
          value: yesData
        },
        {
          type: "NO",
          value: noData
        }
      ];
    },

    ftReviews() {
      let yesData = this.dataList.filter(f => f["FT Review"] === "Yes").length;
      let noData = this.dataList.filter(f => f["FT Review"] === "No").length;

      return [
        {
          type: "YES",
          value: yesData
        },
        {
          type: "NO",
          value: noData
        }
      ];
    }
  },

  created() {
    this.$axios.get("api/dailyreport").then(r => {
      this.dataList = r.data;
    });
  }
};
</script>
