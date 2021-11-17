# Laravel inertia template with Vue3

This project is the laravel template that I started with inertia project, if you want to use it, you suppose to have laravel basic knowledge.

## What I do basically in this project

Below steps are coming from inertia.js official document with my personal tweak and code style.

And I also install another library like ```prettier @inertiljs/progress```, but I will not mention in this README.md. 
I don't want document to be gross, just my personal taste, if you don't like it, just remove it. 
Try to read official document and tweak to your personal taste.

1. Install inertia.js client-side, server-side and vue3 according to the official document.
    ```bash
      # server-side
      composer require inertiajs/inertia-laravel 
      # client-side
      yarn add @inertiajs/inertia @inertiajs/inertia-vue3 
      # vue3
      yarn add vue@next
      yarn add -D @vue/compiler-sfc vue-loader@^16.2.0
    ```
2. Change ```resources/views/app.blade.php``` to adopt inertia.js, syntax @inertia is just like ```<div id="app" data-page='{{ json_encode($page) }}'>```.
   ```html
     <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
           <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
           <script src="{{ mix('/js/app.js') }}" defer></script>
           <script src="{{ mix('/js/vendor.js') }}" defer></script>
           <script src="{{ mix('/js/app.js') }}" defer></script>
           <title>Hello inertial.js</title> 
         </head>
         <body>
           @inertia
         </body>
       </html>
   ```
3. Install ```php artisan inertia:middleware``` and register into laravel app kernel by go to ```/app/Http/Kernel.php``` path. as the **last item** in ```web``` middleware group.
    ```bash
      'web' => [
        // ...
        \App\Http\Middleware\HandleInertiaRequests::class,
      ],
    ```
4. Update ```resources/js/app.js```
    ```javascript
      import { createApp, h } from 'vue'
      import { createInertiaApp } from '@inertiajs/inertia-vue3'

      createInertiaApp({
        resolve: name => require(`./Pages/${name}`),
        setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
          .use(plugin)
          .mount(el)
        },
      })
    ```
5. Update webpack.mix.js by chain ```extract()``` for split code (vendor, manifest), ```vue({ version: 3 })``` for vue and ```version()```, then run ```npx mix``` **twice**.
6. Update ```routes/web.php```
   ```php
      <?php
   
       use Illuminate\Support\Facades\Route;
       use Inertia\Inertia;

       Route::get('/', function () {
         // inertia('Todo'); // as same as Inertia::render()
         return Inertia::render('Todo', [
            'todos' => ['bla bla bla', 'bla bla bla']
         ]);
       });
   ```
 
## How to use
- Run the ```yarn hot``` to compile the vue and watch it.
- Run the project in localhost ```php artisan serve```, you can change the port by adding ```--port=<port>``` argument.

### Problem discussion
Persist layout setup sugar not supported inertial.js yet, you can use below code can achieve the goal.
Doc: https://github.com/inertiajs/inertia/discussions/651

```vue
<scrip>
import Layout from 'layout-path';
export default {
  layout: Layout // this will automatically persist your layout
}
</scrip>

<script setup></script>

<template>
  <h1>Hello world</h1>
</template>
```

You can also register like this, depend on your situation.

```javascript
createInertiaApp({
  resolve: (name) => {
    const page = require(`./Pages/${name}`).default;

    page.layout ??= Layout; // register default layout

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});
```
