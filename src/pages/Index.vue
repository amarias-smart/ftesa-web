<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <div class="col-md-4">
        <q-card>
          <q-card-section>{{ apiResponseCount }}</q-card-section>
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <q-card-section>asd</q-card-section>
        </q-card>
      </div>

      <div class="col-md-4">
        <q-card>
          <q-card-section>{{ withOpenFTCount }}</q-card-section>
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
    REPORT: () => import("components/report")
  },

  data() {
    return {
      dataList: []
    };
  },

  computed: {
    apiResponseCount() {
      let yesData = this.dataList.filter(f => f["API_Response"] === "Yes")
        .length;
      let noData = this.dataList.filter(f => f["API_Response"] === "No").length;

      return {
        yes: yesData,
        no: noData
      };
    },

    withOpenFTCount() {
      let yesData = this.dataList.filter(f => f["With Open FT"] === "Yes")
        .length;
      let noData = this.dataList.filter(f => f["With Open FT"] === "No").length;

      return {
        yes: yesData,
        no: noData
      };
    }
  },

  created() {
    this.$axios.get("api/dailyreport").then(r => {
      this.dataList = r.data;
    });
  }
};
</script>
