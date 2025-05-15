import type { Routes } from "@angular/router"

export const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  //{
  //  path: "inicio",
  //  loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent)
  //},
  //{
  //  path: "sobre-nosotros",
  //  loadComponent: () =>
  //    import("./pages/sobre-nosotros/sobre-nosotros.component").then((m) => m.SobreNosotrosComponent),
  //},
  //{
  //  path: "beneficios",
  //  loadComponent: () => import("./pages/beneficios/beneficios.component").then((m) => m.BeneficiosComponent),
  //},
  //{
  //  path: "contacto",
  //  loadComponent: () => import("./pages/contacto/contacto.component").then((m) => m.ContactoComponent),
  //},
  { path: "**", redirectTo: "/" },
]
