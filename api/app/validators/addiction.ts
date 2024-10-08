import vine from '@vinejs/vine'

export const createAddictionValidator = vine.object({
  type: vine.string().maxLength(200),
  frequency: vine.string().maxLength(255),
  duration: vine.string().maxLength(100),
  consequences: vine.string().maxLength(255),
  weaning: vine.string().maxLength(255),
  userId: vine.number().exists(async (query, field) => {
    const user = await query.from('users').where('id', field).first()
    return !!user
  }),
})

export const updateAddictionValidator = vine.object({
  type: vine.string().maxLength(200).optional(),
  frequency: vine.string().maxLength(255).optional(),
  duration: vine.string().maxLength(100).optional(),
  consequences: vine.string().maxLength(255).optional(),
  weaning: vine.string().maxLength(255).optional(),
  userId: vine
    .number()
    .exists(async (query, field) => {
      const user = await query.from('users').where('id', field).first()
      return !!user
    })
    .optional(),
})
