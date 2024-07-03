// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "Indicadores de Niterói",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Seções",
      pages: [
        {name: "Introdução", path: "/01 - Introdução"},
        {name: "IDH, Economia e Desigualdade", path: "/02 - IDH, Economia e Desigualdade"},
        {name: "Demografia", path: "/03 - Demografia"}
      ]
    }
  ],

  // Some additional configuration options and their defaults:
   theme: "light", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
   toc: false, // whether to show the table of contents
   pager: false, // whether to show previous & next links in the footer
  // root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
  // search: true, // activate search
};
