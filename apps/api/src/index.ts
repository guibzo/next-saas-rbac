import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-1' })

const project = projectSchema.parse({
  id: 'project-id',
  ownerId: 'user-2',
})

console.log(ability.can('get', 'Billing'))
console.log(ability.can('create', 'Invite'))

console.log(ability.can('delete', 'Project')) // can delete A project? (yes, IF it is his project. so this will return true)
console.log(ability.can('delete', project)) // can delete THIS SPECIFIC project? (no, since it is not his project)
