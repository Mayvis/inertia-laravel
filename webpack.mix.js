const mix = require("laravel-mix");

mix
  .js("resources/js/app.js", "public/js")
  .extract()
  .vue({
    version: 3,
  })
  .postCss("resources/css/app.css", "public/css", [
    //
  ])
  .version();
