import vine from '@vinejs/vine'

export const createGeneralInformationValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().maxLength(100),
    name: vine.string().maxLength(100),
    age: vine.number(),
    genre: vine.string().maxLength(150),
    situation: vine.string().maxLength(255),
  })
)

export const updateGeneralInformationValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().maxLength(100).optional(),
    name: vine.string().maxLength(100).optional(),
    age: vine.number().optional(),
    genre: vine.string().maxLength(150).optional(),
    situation: vine.string().maxLength(255).optional(),
  })
)
