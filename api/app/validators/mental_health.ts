import vine from '@vinejs/vine'

export const createMentalHealthValidator = vine.compile(
  vine.object({
    symptoms: vine.boolean(),
    stress: vine.number(),
  })
)

export const updateMentalHealthValidator = vine.compile(
  vine.object({
    symptoms: vine.boolean().optional(),
    stress: vine.number().optional(),
  })
)
