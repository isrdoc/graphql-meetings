const { getUserId } = require('../../utils')

const destination = {
  async createDestination(parent, { title }, ctx, info) {
    return ctx.db.mutation.createDestination(
      {
        data: {
          title,
        },
      },
      info
    )
  },
/*
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
*/
  // TODO
  async deleteDestination(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deleteDestination({ where: { id } })
  },
}

module.exports = { destination }
