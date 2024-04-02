import axios from 'axios'
import Team from '@/model/team'

const listInit = {
  created() {
    this.hello()
  },

  data() {
    return {
      list: null,
      title: null
    }
  },

  methods: {
    hello() {
      this.title = this.$router.currentRoute.value.fullPath
      console.log(this.$router.currentRoute.value)
      this.list = [
        new Team({ id: 'test', name: 'test' }),
        new Team({ id: 'test2', name: 'test2' }),
        new Team({ id: 'test3', name: 'test3' })
      ]
      console.log('listInit mixin', this.title, this.list)

      //call axios to get list of teams with images and titles

      //   axios
      //     .get(`asdfsadf`)
      //     .then((res) => {
      //       this.model = res.response
      //     })
      //     .catch()
    }
  }
}

export default listInit
