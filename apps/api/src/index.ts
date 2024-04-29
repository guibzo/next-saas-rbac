import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const userCanDeleteOtherUsers = ability.can('delete', 'User')

console.log(userCanDeleteOtherUsers)
