import vine from '@vinejs/vine'

export const createEmotionValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255),
  })
)
export const updateEmotionValidator = vine.compile(
  vine.object({
    states: vine.string().maxLength(255).optional(),
  })
)
