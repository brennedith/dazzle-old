<template lang="pug">
  div
    b-tooltip(content="Stamina is the ability to sustain prolonged physical or mental effort." placement="bottom")
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
          calculator(@sendConversion="getConversion" :country="country" :tenure="tenure")
        b-tab(title="Playbook")
          playbook
</template>

<script>
import { bTooltip, bProgress, bBadge, bTabs, bTab } from 'bootstrap-vue/lib/components'
import Calculator from '@/components/Calculator'
import Playbook from '@/components/Playbook'
import config from '../config/country'

export default {
  name: 'dazzle',
  components: { bTooltip, bProgress, bBadge, bTabs, bTab, Calculator, Playbook },
  props: ['tenure'],
  filters: {
    percentage (value) {
      return (value * 100).toFixed(2) + '%'
    }
  },
  data () {
    return {
      country: config.code,
      conversion_goal: 0.45,
      conversion: 1
    }
  },
  computed: {
    stamina () {
      return this.conversion / this.conversion_goal * 100
    },
    variant () {
      return this.stamina >= 100 ? 'success' : this.stamina >= 75 ? 'warning' : 'danger'
    }
  },
  methods: {
    getConversion (conversion) {
      this.conversion = conversion
    }
  },
  created () {
    if (this.tenure === undefined) {
      console.log('No tenure defined. Redirecting to home')
      this.$router.push('/')
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
