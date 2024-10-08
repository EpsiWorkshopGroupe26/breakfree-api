import vine from '@vinejs/vine'

export const createObjectiveValidator = vine.object({
  userId: vine.number().exists(async (query, field) => {
    const user = await query.from('addictions').where('id', field).first()
    return !!user
  }),
  states: vine.string().maxLength(255),
  support: vine.boolean(),
  consult: vine.boolean(),
})

export const updateObjectiveValidator = vine.object({
  userId: vine
    .number()
    .exists(async (query, field) => {
      const user = await query.from('addictions').where('id', field).first()
      return !!user
    })
    .optional(),
  states: vine.string().maxLength(255).optional(),
  support: vine.boolean().optional(),
  consult: vine.boolean().optional(),
})
