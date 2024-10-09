import vine from '@vinejs/vine'

export const createObjectiveValidator = vine.compile(
  vine.object({
    description: vine.string().maxLength(255),
    evolution: vine.number(),
  })
)

export const updateObjectiveValidator = vine.compile(
  vine.object({
    description: vine.string().maxLength(255).optional(),
    evolution: vine.number().optional(),
  })
)
