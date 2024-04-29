import { z } from 'zod'

export const inviteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('delete'),
  ]),
  z.literal('Invite'),
])

// [actions, subject]
export type InviteSubject = z.infer<typeof inviteSubject>
