<template lang="pug">
  .row.top
    .col-md-7
      .row
        .col
          b-card(header="Today")
            .row.no-gutters
              b-input-group.col(left="Sales")
                b-form-input(:value="sales" disabled)
              b-input-group.col(left="Calls")
                b-form-input(type="number" v-model.number="calls")
                b-button(slot="right" variant="info" @click="addCall")
                  i.fa.fa-plus
              b-input-group.col(left="Revenue")
                b-form-input(:value="revenue | currency" disabled)
      .row.top
        .col
          b-card(header="Your Bonus")
            .row.no-gutters
              b-input-group.col(left="Current")
                b-form-input(:value="12 | currency" disabled)
              b-input-group.col(left="Next")
                b-form-input(:value="12 | currency" disabled)
        .col
          b-card(header="Stopwatch")
            .row
            stopwatch
    .col-md-5
      b-card(header="Sales")
        .row.no-gutters
          b-input-group.col(left="Number")
            b-form-input(type="number" v-model.number="saleNo")
          b-input-group.col(left="Revenue")
            b-form-input(type="number" v-model.number="saleRe")
          b-button(variant="success" @click="addSale")
            i.fa.fa-plus
        .row
            b-table(:items="salesList" :fields="{number: {label: 'Sale Number'}, revenue: {label: 'Sale Revenue'}, actions: {label: 'Actions'}}" striped hover)
              template(slot="number" scope="sale") {{ sale.item.number }}
              template(slot="revenue" scope="sale") {{ sale.item.revenue | currency }}
              template(slot="actions" scope="sale")
                b-button(variant="danger" size="sm" @click="removeSale(sale.index)")
                  i.fa.fa-trash-o
    p {{ conversion }}
</template>

<script>
import { bCard, bButton, bInputGroup, bFormInput, bTable } from 'bootstrap-vue/lib/components'
import Stopwatch from '@/components/Stopwatch'

export default {
  name: 'calculator',
  filters: {
    currency (value) {
      return '$ ' + value.toFixed(2)
    }
  },
  components: { bCard, bButton, bInputGroup, bFormInput, bTable, Stopwatch },
  data () {
    return {
      salesList: [],
      saleNo: 1,
      saleRe: 0,
      calls: 0
    }
  },
  computed: {
    revenue () {
      return this.salesList.reduce((total, current) => {
        return total + current.revenue
      }, 0)
    },
    sales () {
      let len = this.salesList.length
      let max = len > 0 ? Math.max.apply(Math, this.salesList.map((current) => { return current.number })) : 0
      return max > len ? len : max
    },
    conversion () {
      return this.calls > 0 ? this.sales / this.calls : 0
    }
  },
  methods: {
    addSale () {
      if (this.saleNo > 0 && this.saleRe > 0) {
        this.salesList.push({
          number: this.saleNo,
          revenue: this.saleRe
        })
        this.saleNo = this.sales + 1
        this.saleRe = 0
      }
    },
    addCall () {
      this.calls = this.calls + 1
    },
    removeSale (index) {
      this.salesList.splice(index, 1)
      this.saleNo = this.sales + 1
    }
  }
}
</script>

<style lang="stylus" scoped>
  .form-control:disabled
    background-color #dce1e6
</style>
