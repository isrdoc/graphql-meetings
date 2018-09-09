const { getUserId } = require('../../utils')

const meeting = {
  async createMeeting(parent, { destinationId }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createMeeting(
      {
        data: {
          isPublished: false,
          author: {
            connect: { id: userId },
          },
          destination: {
            connect: { id: destinationId },
          },
        },
      },
      info
    )
  },

  // TODO
  async publishMeeting(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.updateMeeting(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    )
  },

  // TODO
  async deleteMeeting(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deleteMeeting({ where: { id } })
  },
}

module.exports = { meeting }
