module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = {
      error: true,
      message: e.message
    };
  }
}
