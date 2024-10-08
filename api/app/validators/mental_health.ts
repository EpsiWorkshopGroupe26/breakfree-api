import vine from '@vinejs/vine'

export const createMentalHealthValidator = vine.object({
  userId: vine.number().exists(async (query, field) => {
    const user = await query.from('users').where('id', field).first()
    return !!user
  }),
  symptoms: vine.boolean(),
  stress: vine.number(),
})

export const updateMentalHealthValidator = vine.object({
  userId: vine
    .number()
    .exists(async (query, field) => {
      const user = await query.from('users').where('id', field).first()
      return !!user
    })
    .optional(),
  symptoms: vine.boolean().optional(),
  stress: vine.number().optional(),
})
