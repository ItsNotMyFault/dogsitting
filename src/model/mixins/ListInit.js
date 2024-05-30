import crudServices from '@/services/crudServices'

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
      return new this.model(data)
    },
    async init() {
      this.title = this.$router.currentRoute.value.fullPath

      var teams = await crudServices.getAll(this.model.name)

      this.list = teams.map((team) => {
        return this.createEventInstance(team)
      })
    }
  },

  created() {
    this.init()
  }
}

export default listInit
