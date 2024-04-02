import axios from 'axios'
const myMixin = {
  created() {
    this.hello()
  },

  data() {
    return {
      model: null,
      title: null
    }
  },

  methods: {
    hello() {
      this.title = this.$router.currentRoute.value.fullPath
      this.model = {}
      console.log('hello mixin', this.title)

      //call axios to get detail of team name = paramid

      //   axios
      //     .get(`asdfsadf`)
      //     .then((res) => {
      //       this.model = res.response
      //     })
      //     .catch()
    }
  }
}

export default myMixin
