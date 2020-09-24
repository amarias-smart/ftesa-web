<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <div class="col-md-4">
        <q-card>
          <CHART :dataList="minWithOpenFT" />
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <q-card-section>asd</q-card-section>
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <q-card-section>{{ ftWithOpenFT }}</q-card-section>
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
    CHART: () => import("components/g2Chart"),
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
    }
  },

  created() {
    this.$axios.get("api/dailyreport").then(r => {
      this.dataList = r.data;
    });
  }
};
</script>
