import { createApp, h } from "vue";
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import Layout from "./Shared/Layout.vue";

createInertiaApp({
  resolve: async (name) => {
    const page = (await import(`./Pages/${name}`)).default; // for code split

    page.layout ??= Layout; // register default layout

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .component("Link", Link)
      .component("Head", Head)
      .mount(el);
  },
  title: (title) => `Hello inertia.js - ${title}`,
});

// progressbar when route redirect
InertiaProgress.init();
