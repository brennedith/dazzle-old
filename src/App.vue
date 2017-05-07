<template lang="pug">
  div
    <router-view></router-view>
    .footer
      a(@click="info")
        i.fa.fa-question-circle
    b-modal(id="info" title="Dazzle")
      h5 &copy Brennedith Garcia, 2017
      p Made with
        ul
          li Vue.js
          li Bootstrap
          li Bootstrap-Vue
          li Pug & Stylus
          li VS Code
          li Linux &hearts;
      p Hosted by Surge.sh
</template>

<script>
import { bModal } from 'bootstrap-vue/lib/components'

export default {
  name: 'app',
  components: { bModal },
  methods: {
    info () {
      this.$root.$emit('show::modal', 'info')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer
    margin: 5px
    position fixed
    bottom 0
    right 0
    font-size 16pt
</style>
