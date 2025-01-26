import { defineAbility, AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability'
import { useProfileStore } from '#nuxt-auth/stores/useProfileStore'

export const useAbility = () => {
  const ability = ref<MongoAbility>(createMongoAbility())

  function updateAbility() {
    const builder = new AbilityBuilder(createMongoAbility)

    let abilities = {} as Record<string, string | string[]>
    const { abilitiesAsJson } = storeToRefs(useProfileStore())
    abilities = abilitiesAsJson.value

    if (abilities && typeof abilities === 'object') {
      Object.entries(abilities).forEach(([subject, actions]) => {
        const splitActions = typeof actions === 'string' ? actions.split(',') : actions
        if (Array.isArray(splitActions)) {
          splitActions.forEach((action) =>
            builder.can(action.trim().toLowerCase(), subject.trim().toLowerCase())
          )
        }
      })
    }

    ability.value = builder.build()
  }

  return {
    ability,
    updateAbility
  }
}
