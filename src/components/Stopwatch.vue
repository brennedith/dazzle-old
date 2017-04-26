<template lang="pug">
  .row.align-items-center.justify-content-center
    h3 {{ minutes | doubledigits }}:{{ seconds | doubledigits }}
    span &nbsp;
    b-button(variant="success" @click="run" size="sm")
      i.fa.fa-play(v-if="!running")
      i.fa.fa-pause(v-if="running")
    b-button(variant="warning" @click="stop" size="sm")
      i.fa.fa-stop
    b-modal(id="alert" hide-header)
      h2 Hey! Please go back to your customer
</template>

<script>
import { bButton, bModal } from 'bootstrap-vue/lib/components'

export default {
  name: 'stopwatch',
  components: { bButton, bModal },
  filters: {
    doubledigits (value) {
      let prefix = '0'
      return value < 10 ? prefix + value : value
    }
  },
  data () {
    return {
      count: 0,
      running: false,
      timer: undefined
    }
  },
  computed: {
    minutes () {
      return parseInt(this.count / 60)
    },
    seconds () {
      return this.count % 60
    }
  },
  methods: {
    alert () {
      this.$root.$emit('show::modal', 'alert')
    },
    run () {
      if (!this.running) {
        this.timer = setInterval(() => {
          this.count = this.count + 1
          if (this.count === 150) {
            this.alert()
          }
        }, 1000)
        this.running = true
      } else {
        clearInterval(this.timer)
        this.running = false
      }
    },
    stop () {
      clearInterval(this.timer)
      this.count = 0
      this.running = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  h3
    display inline-block
    background-color #485563
    border-radius 8px
    margin-bottom 0
    padding 4px 10px
</style>
