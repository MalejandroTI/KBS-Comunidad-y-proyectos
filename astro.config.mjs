import { defineConfig } from 'astro/config';

const site = 'https://malejandroti.github.io';
const base = '/KBS-Comunidad-y-proyectos/';

/**
 * Plugin remark: antepone `base` a imágenes y enlaces internos escritos en Markdown
 * (ej. ![x](/images/a.webp) -> /KBS-Comunidad-y-proyectos/images/a.webp).
 * Ignora URLs externas, anclas puras (#x) y rutas que ya incluyen la base.
 */
function remarkPrefixBase() {
  const prefix = base.replace(/\/$/, ''); // "/KBS-Comunidad-y-proyectos"
  const fix = (url) => {
    if (typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//')) return url;
    if (url === prefix || url.startsWith(`${prefix}/`)) return url;
    return `${prefix}${url}`;
  };
  const walk = (node) => {
    if ((node.type === 'image' || node.type === 'link') && node.url) node.url = fix(node.url);
    if (node.children) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site,
  base,
  markdown: {
    remarkPlugins: [remarkPrefixBase],
  },
});
