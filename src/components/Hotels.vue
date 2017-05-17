<template lang="pug">
  .row.top
    .col
      b-input-group.col(left="Filter")
        b-form-input(type="text" v-model="filter" placeholder="Which hotel are you looking?")
      p(v-if="chain.hotels.length > 0" v-for="chain in filtredChains")
        span {{ chain.name }}
        b-badge(pill v-for="hotel, idx in chain.hotels" :key="idx" :class="{'badge-success': isFiltered(hotel)}") {{ hotel }}
</template>

<script>
import { bInputGroup, bFormInput, bBadge } from 'bootstrap-vue/lib/components'
import chains from '@/components/content/chains'

export default {
  name: 'hotels',
  components: { bInputGroup, bFormInput, bBadge },
  data () {
    return {
      filter: '',
      chains: chains
    }
  },
  computed: {
    filtredChains () {
      if (this.filter === '') {
        return this.chains
      }
      return this.chains.map(chain => {
        let nameResult = chain.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        let hotelsResult = chain.hotels.filter(hotel => {
          return hotel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
        }).length > 0

        return {
          name: chain.name,
          hotels: nameResult || hotelsResult ? chain.hotels : []
        }
      })
    }
  },
  methods: {
    isFiltered (hotel) {
      if (this.filter === '') {
        return false
      }
      return hotel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .input-group
    margin-bottom 10px
  p
    padding 0 15px
    margin-bottom 10px
  span
    margin-right 10px
    font-weight bold
</style>
