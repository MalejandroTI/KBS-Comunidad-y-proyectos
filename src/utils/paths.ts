/**
 * Utilidades centralizadas para construir rutas respetando `base` de astro.config.mjs
 * (necesario en GitHub Pages: /KBS-Comunidad-y-proyectos/).
 */

/** Base normalizada: siempre empieza y termina con "/" (ej. "/KBS-Comunidad-y-proyectos/"). */
export const BASE: string = (() => {
  let b = import.meta.env.BASE_URL || "/";
  if (!b.startsWith("/")) b = `/${b}`;
  if (!b.endsWith("/")) b = `${b}/`;
  return b;
})();

const isExternal = (p: string) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(p);

/**
 * Devuelve una ruta interna con la base aplicada, sin dobles barras ni omisiones.
 *   withBase("grupos/x/")                      -> /KBS.../grupos/x/
 *   withBase("/images/a.webp")                 -> /KBS.../images/a.webp
 *   withBase("/#proyectos")                    -> /KBS.../#proyectos
 *   withBase("/KBS.../images/a.webp")          -> sin cambios (ya tiene base)
 *   withBase("#proyectos")                     -> /KBS.../#proyectos (ancla de la portada)
 *   withBase("https://...")                    -> sin cambios
 */
export function withBase(path: string = ""): string {
  if (!path) return BASE;
  if (isExternal(path)) return path;
  const clean = path.replace(/^\/+/, "");
  // Ya contiene la base (ej. "/KBS-Comunidad-y-proyectos/images/x.webp")
  const baseNoSlashes = BASE.replace(/^\/+|\/+$/g, "");
  if (baseNoSlashes && (clean === baseNoSlashes || clean.startsWith(`${baseNoSlashes}/`))) {
    return `/${clean}`;
  }
  return `${BASE}${clean}`;
}
