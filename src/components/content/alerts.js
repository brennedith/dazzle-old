export default {
  alerts: [
    ['Remember: You have to disclose the service fee twice, as part of the offer and when you recap.', 'danger']
  ],
  random () {
    const r = Math.floor(Math.random() * this.alerts.length)
    return {
      message: this.alerts[r][0],
      variant: this.alerts[r][1]
    }
  }
}
