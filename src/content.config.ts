
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";


const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    grupo: z.string(),
    encargados: z.array(z.string()),
    technologies: z.array(z.string()),
    repositories: z.string().optional(),
    image: z.string(),
    status: z.string(),
  }),
});


const members = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/members",
  }),
  schema: z.object({
    nombre: z.string(),
    grupo: z.string(),
    correo: z.string().email(),
    foto: z.string(),
    links: z.array(
      z.object({
        nombre: z.string(),
        url: z.string().url(),
      })
    ),
  }),
});


const groups = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/groups",
  }),
  schema: z.object({
    nombre: z.string(),
    integrantes: z.array(z.string()),
    slogan: z.string(),
    foto: z.string(),
    foto_grupal: z.string().optional(),
    proyectos: z.array(z.string()),
    contacto: z.object({
      correo: z.string().email(),
      github: z.string().url(),
    }),
    descripcion: z.string(),
  }),
});

export const collections = {
  projects,
  members,
  groups
};
