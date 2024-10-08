import vine from '@vinejs/vine'

export const createEmotionValidator = vine.object({
  userId: vine.number().exists(async (query, field) => {
    const user = await query.from('users').where('id', field).first()
    return !!user
  }),
  states: vine.string().maxLength(255),
})

export const updateEmotionValidator = vine.object({
  userId: vine
    .number()
    .exists(async (query, field) => {
      const user = await query.from('users').where('id', field).first()
      return !!user
    })
    .optional(),
  states: vine.string().maxLength(255).optional(),
})
