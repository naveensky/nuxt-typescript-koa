import logger from "./Logger"
import RandomService from "../server/RandomService";

const Koa = require('koa');
// const consola = require('consola')
const {Nuxt, Builder} = require('nuxt');


const app = new Koa();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = app.env !== 'production';

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const randomService = new RandomService();
  randomService.print();

  // console.log(logger);

  logger.info("Hello World");

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  });

  app.listen(port, host)
  logger.info(`Server listening on http://${host}:${port}`);

  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // })
}

start();
