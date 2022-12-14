<template>
  <q-card>
    <q-table
      flat
      dense
      class="max_height bg-grey-2"
      :title="asOf"
      ref="table"
      separator="cell"
      :filter="filter"
      :data="dataList"
      :columns="cols"
      row-key="Call ID"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      virtual-scroll
      table-header-class="bg-grey-4"
    >
      <template v-slot:top-right>
        <q-input outlined v-model="date" mask="date" dense>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class=" q-mx-sm"
        >
          <q-icon slot="append" name="search" />
        </q-input>

        <q-btn
          dense
          unelevated
          color="primary"
          icon-right="archive"
          label="Export"
          class="q-pa-xs"
          @click="csvExport"
        />
      </template>
    </q-table>
  </q-card>
</template>

<script>
import { date, exportFile } from "quasar";
import { unparse } from "papaparse";

export default {
  name: "Report",

  props: ["dataList"],

  data() {
    return {
      date: "",
      filter: "",
      pagination: {
        rowsPerPage: 0
      },
      cols: [
        {
          name: "Date",
          field: "Date",
          label: "Date",
          format: val => date.formatDate(val, "MM/DD/YYYY HH:mm:ss")
        },
        {
          name: "Call ID",
          field: "Call ID",
          label: "Call ID"
        },
        {
          name: "MIN",
          field: "MIN",
          label: "MIN"
        },
        {
          name: "Call Queue",
          field: "Call Queue",
          label: "Call Queue",
          align: "left"
        },
        {
          name: "Call DateTime",
          field: "Call DateTime",
          label: "Call DateTime",
          format: val => date.formatDate(val, "MM/DD/YYYY HH:mm:ss")
        },
        {
          name: "PLDTNumber",
          field: "PLDTNumber",
          label: "PLDT Number"
        },
        {
          name: "AgentID",
          field: "AgentID",
          label: "Agent ID"
        },
        {
          name: "AgentName",
          field: "AgentName",
          label: "Agent Name",
          align: "left"
        },
        {
          name: "GroupName",
          field: "GroupName",
          label: "Group Name",
          align: "left"
        },
        {
          name: "Program",
          field: "Program",
          label: "Program"
        },
        {
          name: "CSP",
          field: "CSP",
          label: "CSP",
          align: "center"
        },
        {
          name: "IsSubmitted",
          field: "IsSubmitted",
          label: "Is Submitted",
          align: "center"
        },
        {
          name: "CSAT",
          field: "CSAT",
          label: "CSAT",
          align: "center"
        },
        {
          name: "WrapUp",
          field: "WrapUp",
          label: "WraUp"
        },
        {
          name: "Sub_WrapUp",
          field: "Sub_WrapUp",
          label: "Sub WrapUp",
          align: "left"
        },
        {
          name: "FTNumber",
          field: "FTNumber",
          label: "FTNumber"
        },
        {
          name: "Tel/PLNumber",
          field: "Tel/PLNumber",
          label: "Tel/PLNumber"
        },
        {
          name: "FT Review",
          field: "FT Review",
          label: "FT Review",
          align: "center"
        },
        {
          name: "MIN With Open FT",
          field: "MIN With Open FT",
          label: "MIN: With Open FT",
          align: "center",
          headerClasses: "bg-blue-2",
          classes: "bg-blue-1"
        },
        {
          name: "FT For",
          field: "FT For",
          label: "MIN: FT For",
          align: "center",
          headerClasses: "bg-blue-2",
          classes: "bg-blue-1"
        },
        {
          name: "MIN Relation",
          field: "MIN Relation",
          label: "MIN: Relation",
          align: "center",
          headerClasses: "bg-blue-2",
          classes: "bg-blue-1"
        },
        {
          name: "MIN Date Opened",
          field: "MIN Date Opened",
          label: "MIN: Date Opened",
          format: val => date.formatDate(val, "MM/DD/YYYY HH:mm:ss"),
          headerClasses: "bg-blue-2",
          classes: "bg-blue-1"
        },
        {
          name: "FT With Open FT",
          field: "FT With Open FT",
          label: "FT: With Open FT",
          align: "center",
          headerClasses: "bg-yellow-2",
          classes: "bg-yellow-1"
        },
        {
          name: "FT Relation",
          field: "FT Relation",
          label: "FT: Relation",
          align: "center",
          headerClasses: "bg-yellow-2",
          classes: "bg-yellow-1"
        },
        {
          name: "FT Date Opened",
          field: "FT Date Opened",
          label: "FT: Date Opened",
          format: val => date.formatDate(val, "MM/DD/YYYY HH:mm:ss"),
          headerClasses: "bg-yellow-2",
          classes: "bg-yellow-1"
        }
      ]
    };
  },

  computed: {
    asOf() {
      if (this.dataList.length > 0) {
        let timestamp = date.formatDate(
          this.dataList[0].Date,
          "MMM Do YYYY, hh:mm:ss A"
        );

        return `Data as of: ${timestamp}`;
      } else return "";
    }
  },

  watch: {
    date(v) {
      this.$emit("DateChange", v);
    }
  },

  methods: {
    setPrevDate() {
      let prevDate = date.subtractFromDate(new Date(), { days: 1 });
      let format = date.formatDate(prevDate, "YYYY/MM/DD");

      this.date = format;
    },
    csvExport() {
      let timestamp = this.date; //date.formatDate(new Date(), "MMDDYY-HHMMSS");
      let data = this.$refs.table.filteredSortedRows.map(el => {
        el["Date"] = date.formatDate(el["Date"], "MM/DD/YYYY HH:mm:ss");
        el["Call DateTime"] = date.formatDate(
          el["Call DateTime"],
          "MM/DD/YYYY HH:mm:ss"
        );
        el["MIN Date Opened"] = date.formatDate(
          el["MIN Date Opened"],
          "MM/DD/YYYY HH:mm:ss"
        );
        el["FT Date Opened"] = date.formatDate(
          el["FT Date Opened"],
          "MM/DD/YYYY HH:mm:ss"
        );

        return el;
      });

      exportFile(`FT ESA Report ${timestamp}.csv`, unparse(data));
    }
  },

  mounted() {
    this.setPrevDate();
  }
};
</script>

<style lang="scss" scoped>
.max_height {
  max-height: 70vh;
}
</style>
