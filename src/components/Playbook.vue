<template lang="pug">
  .row.top
    .col
      b-card(v-for="(list, step) in content" :key="step" show-header no-block)
        div(slot="header" @click="toggle(step)") {{ step }}
        b-collapse(:id="step")
          ul
            li(v-for="item in list") {{ item }}
</template>

<script>
import { bButton, bCard, bCollapse } from 'bootstrap-vue/lib/components'
import content from '@/components/content/playbook'

export default {
  name: 'playbook',
  components: { bButton, bCard, bCollapse },
  data () {
    return {
      content: content
    }
  },
  methods: {
    toggle (sel) {
      this.$root.$emit('collapse::toggle', sel)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card-header *
    cursor pointer
  ul
    margin 15px 0
</style>
