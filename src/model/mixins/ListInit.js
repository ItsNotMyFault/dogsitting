import axios from 'axios'

const listInit = {
  props: {
    model: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      list: null,
      title: null
    }
  },

  methods: {
    createEventInstance(data) {
      console.log('this.model', this.model)
      return new this.model(data)
    },
    init() {
      this.title = this.$router.currentRoute.value.fullPath
      console.log(this.$router.currentRoute.value)
      this.list = [
        this.createEventInstance({ id: 'test', name: 'test' }),
        this.createEventInstance({ id: 'test2', name: 'test2' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' }),
        this.createEventInstance({ id: 'test3', name: 'test3' })
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
  },

  created() {
    this.init()
  }
}

export default listInit
