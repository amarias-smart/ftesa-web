<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm items-stretch">
      <div class="col-12 col-md-3">
        <q-card class="bg_dull_2left fit flex flex-center">
          <CHART :dataList="minWithOpenFT" title="MIN With Open FT:" />
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="bg_dull_2mid fit flex flex-center">
          <CHART :dataList="ftWithOpenFT" title="FT With Open FT:" />
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="bg_dull_2mid fit flex flex-center">
          <CHART :dataList="ftReviews" title="FT Reviews:" />
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card>
          <q-date v-model="dateFilter" class="bg_dull_2right fit" minimal />
        </q-card>
      </div>

      <div class="col-12">
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
      dateFilter: "",
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
    const _this = this;
    _this.$q.loading.show();

    _this.$axios.get("api/dailyreport").then(r => {
      _this.dataList = r.data;

      setTimeout(() => {
        _this.$q.loading.hide();
      }, 1200);
    });
  }
};
</script>

<style lang="scss" scoped>
.bg_dull_2left {
  background: #e9e4f0;
  background: -webkit-linear-gradient(to left, #e0eafc, #e0eafc);
  background: linear-gradient(to left, #e0eafc, #e9e4f0);
}

.bg_dull_2mid {
  background: #e9e4f0;
  background: -webkit-linear-gradient(to top, #e0eafc, #e0eafc);
  background: linear-gradient(to top, #e0eafc, #e0eafc);
}

.bg_dull_2right {
  background: #e9e4f0;
  background: -webkit-linear-gradient(to right, #e0eafc, #e9e4f0);
  background: linear-gradient(to right, #e0eafc, #e9e4f0);
}
</style>
