<template lang="pug">
  div
    .row.top(v-if="!filtred")
      .col(v-for="country in citiesInfo")
        h3 {{ country.name }}
        p
          b-badge(pill v-for="state, idx in country.states" :key="idx" href="#")
            span.mini(@click="applyFilter(state)") {{ state.name }}
    .row.top(v-if="filtred")
        .col
          b-badge(pill variant="info" href="#")
            span.mini(@click="applyFilter()") &lt; Go back
          h3 {{ filtred.name }}
          .row(v-for="cities, idx in filtred.cities")
            .col
              h5 {{ idx }}
              b-badge(pill v-for="city, idx in cities" :key="idx" href="#")
                span.mini(@click="openMaps(city, filtred.name)") {{ city }}
</template>

<script>
import { bInputGroup, bFormInput, bBadge } from 'bootstrap-vue/lib/components'
import citiesInfo from '@/components/content/cities'

export default {
  name: 'cities',
  components: { bInputGroup, bFormInput, bBadge },
  data () {
    return {
      citiesInfo: citiesInfo,
      filtred: ''
    }
  },
  methods: {
    applyFilter (state = '') {
      this.filtred = state
      if (state !== '') {
        let list = this.filtred.cities || []
        let orderedList = {}

        list.forEach(city => {
          let letter = city.substring(0, 1)
          if (!orderedList.hasOwnProperty(letter)) {
            orderedList[letter] = []
          }
          orderedList[letter].push(city)
        })

        this.filtred.cities = orderedList
      }
    },
    openMaps (city, state) {
      let mapURL = encodeURI('https://www.google.com/maps/place/' + city + ', ' + state)
      window.open(mapURL)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .badge
    cursor pointer
  span
    margin-right 10px
    margin-bottom 10px
    font-weight bold
  span.mini
    margin 0
    font-size 12pt
</style>
