<template>
  <q-card>
    <q-table
      dense
      class="overflow-auto"
      style="max-height: 400px;"
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
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <q-icon slot="append" name="search" />
        </q-input>

        <q-btn
          flat
          dense
          color="primary"
          icon-right="archive"
          label="Export"
          class="q-pa-xs q-ml-sm"
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
          name: "API_Response",
          field: "API_Response",
          label: "API Response",
          align: "center"
        },
        {
          name: "With Open FT",
          field: "With Open FT",
          label: "With Open FT",
          align: "center"
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

  methods: {
    csvExport() {
      let timestamp = date.formatDate(new Date(), "MMDDYY-HHMMSS");
      let data = this.$refs.table.filteredSortedRows.map(el => {
        el.Date = date.formatDate(el.Date, "MM/DD/YYYY HH:mm:ss");

        return el;
      });

      exportFile(`FT ESA Report ${timestamp}.csv`, unparse(data));
    }
  }
};
</script>
