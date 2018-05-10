import { debounce } from './utils'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sidebar']),
    slidearState() {
      return this.sidebar.opened
    }
  },
  watch: {
    slidearState() {
      let timer = null
      timer = setTimeout(() => {
        clearTimeout(timer)
        if (this.chart) {
          this.chart.resize()
        }
      }, 220)
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
  }
}
