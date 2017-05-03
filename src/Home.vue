<template lang="pug">
  .container
    b-jumbotron(header="Dazzle")
      hr
      p What's your tenure?
      b-form-radio(v-model="tenure" :options="options" stacked=true)
      router-link.btn.btn-success(:to="{ name: 'Dazzle', params: { tenure: tenure }}") Let's do it!
</template>

<script>
import { bJumbotron, bLink, bFormRadio } from 'bootstrap-vue/lib/components'

export default {
  name: 'Home',
  components: { bJumbotron, bLink, bFormRadio },
  data () {
    return {
      tenure: 'above60',
      options: [
        {
          text: 'Less than 60 days',
          value: 'below60'
        },
        {
          text: 'More than 60 days',
          value: 'above60'
        }
      ]
    }
  }
}

</script>

<style lang="stylus" scoped>
  .jumbotron
    margin-top 89px
</style>
