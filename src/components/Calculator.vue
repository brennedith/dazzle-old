<template lang="pug">
  .row.top
    .col-md-7
      .row
        .col
          b-card(header="Today" show-footer)
            .row.no-gutters
              b-input-group.col(left="Sales")
                b-form-input(:value="sales" disabled)
              b-input-group.col(left="Calls")
                b-form-input(type="number" v-model.number="calls")
                b-button(slot="right" variant="info" @click="addCall")
                  i.fa.fa-plus
              b-input-group.col(left="Revenue")
                b-form-input(:value="revenue | currency" disabled)
            small(slot="footer" class="text-muted")
              i.fa.fa-info-circle
              | &nbsp; {{ quote }}
      .row.top.hidden-md-down
        .col
          b-card(header="Your Bonus")
            .row.no-gutters
              b-input-group.col(left="Current")
                b-form-input(:value="bonus.current * revenue | currency" disabled)
              b-input-group.col(left="Next")
                b-form-input(:value="bonus.next * revenue | currency" disabled)
        .col
          b-card(header="Stopwatch")
            stopwatch
    .col-md-5
      b-card(header="Sales")
        .row.no-gutters
          b-input-group.col(left="Number")
            b-form-input(type="number" v-model.number="saleNo")
          b-input-group.col(left="Revenue")
            b-form-input(type="number" v-model.number="saleRe" @keyup.enter="addSale")
          b-button(variant="success" @click="addSale")
            i.fa.fa-plus
        .row
            b-table(:items="salesList" :fields="{number: {label: 'Sale Number'}, revenue: {label: 'Sale Revenue'}, actions: {label: 'Actions'}}" striped hover)
              template(slot="number" scope="sale") {{ sale.item.number }}
              template(slot="revenue" scope="sale") {{ sale.item.revenue | currency }}
              template(slot="actions" scope="sale")
                b-button(variant="danger" size="sm" @click="removeSale(sale.index)")
                  i.fa.fa-trash-o
</template>

<script>
import { bCard, bButton, bInputGroup, bFormInput, bTable } from 'bootstrap-vue/lib/components'
import Stopwatch from '@/components/Stopwatch'
import quote from '@/components/content/quotes'
import bonus from '@/components/content/bonuses'

export default {
  name: 'calculator',
  components: { bCard, bButton, bInputGroup, bFormInput, bTable, Stopwatch },
  filters: {
    currency (value) {
      return '$ ' + value.toFixed(2)
    }
  },
  props: ['country', 'tenure'],
  data () {
    return {
      salesList: [],
      saleNo: 1,
      saleRe: '',
      calls: 0,
      quote: quote.random()
    }
  },
  computed: {
    revenue () {
      return this.salesList.reduce((total, current) => {
        return total + current.revenue
      }, 0)
    },
    sales () {
      const len = this.salesList.length
      const max = len > 0 ? Math.max.apply(Math, this.salesList.map((current) => { return current.number })) : 0
      return max > len ? len : max
    },
    conversion () {
      return this.calls > 0 ? this.sales / this.calls : 1
    },
    bonus () {
      return bonus.calc(this.country, this.tenure, this.conversion)
    }
  },
  watch: {
    conversion () {
      this.$emit('sendConversion', this.conversion)
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
        this.saleRe = ''
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
