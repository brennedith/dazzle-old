<template lang="pug">
  div
    b-progress(v-model="stamina" :variant="variant" striped animated)
      strong stamina
    .container-fluid
      .row
        .col-md-8.hidden-md-down
          h1 Dazzle
        .col
          h1.conversion Conversion 
            b-badge(:variant="variant" pill) {{ conversion | percentage }}
      hr
      .row
      b-tabs
        b-tab(title="Calculator" active)
          calculator
        b-tab(title="Playbook")
          playbook
</template>

<script>
import { bProgress, bBadge, bTabs, bTab } from 'bootstrap-vue/lib/components'
import Calculator from '@/components/Calculator'
import Playbook from '@/components/Playbook'

export default {
  name: 'dazzle',
  filters: {
    percentage (value) {
      return (value * 100).toFixed(2) + '%'
    }
  },
  components: { bProgress, bBadge, bTabs, bTab, Calculator, Playbook },
  data () {
    return {
      conversion_goal: 0.45,
      conversion: 0.45
    }
  },
  computed: {
    stamina () {
      return this.conversion / this.conversion_goal * 100
    },
    variant () {
      return this.stamina >= 100 ? 'success' : this.stamina >= 75 ? 'warning' : 'danger'
    }
  }
}
</script>

<style lang="stylus">
  .container-fluid
    margin-top 25px
    .conversion
      text-align center
  .row.top
    margin-top 10px
  .progress-bar
    strong
      color #FFFFFF
      font-size 10pt
</style>
