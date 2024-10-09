import vine from '@vinejs/vine'

export const createMotivationValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255),
    support: vine.boolean(),
    consult: vine.boolean(),
  })
)

export const updateMotivationValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255).optional(),
    support: vine.boolean().optional(),
    consult: vine.boolean().optional(),
  })
)
