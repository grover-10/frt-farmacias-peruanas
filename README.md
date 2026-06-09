# 🟢 frt-farmacias-peruanas

Frontend del catálogo de productos, construido con Angular 21 + SSR, Tailwind CSS v4, Web Components (StencilJS) y un mock REST con json-server.

---

## Requisitos

| Herramienta | Versión mínima |
|---|---|
| Node.js | `>= 20.x` |
| npm | `>= 11.x` |
| Angular CLI | `^21.2.x` |

---

## Instalación

# 1. Instalar dependencias
npm install

---

##  Ejecución del proyecto

### Desarrollo (SPA con HMR)
```bash
# Levantar mock API (puerto 3000)
npm run mock

# En otra terminal — levantar Angular dev server (puerto 4200)
npm start
```
Accede a `http://localhost:4200`

### Build de producción (con SSR)
```bash
npm run build
```
---

## Estructura de la solución

```
frt-farmacias-peruanas/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── product.model.ts       # Interface Product
│   │   │   │   └── modal.model.ts
│   │   │   ├── services/
│   │   │   │   └── product.service.ts     # HTTP calls al API REST
│   │   │   └── utils/
│   │   │       ├── cart/
│   │   │       │   └── cart.service.ts    # Signals + localStorage
│   │   │       ├── modal/
│   │   │       │   └── modal.service.ts
│   │   │       └── splash/
│   │   │           └── splash.service.ts  # Loading state entre rutas
│   │   ├── features/
│   │   │   └── product/
│   │   │       ├── product-list/          # Listado del catálogo
│   │   │       ├── product-detail/        # Detalle + carrusel
│   │   │       └── product.routes.ts      # Rutas lazy-loaded
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── header/                # Nav + carrito
│   │   │       ├── footer/
│   │   │       ├── product-item/          # Tarjeta de producto
│   │   │       ├── product-detail/        # Componente de detalle compartido
│   │   │       ├── cart-drawer/           # Drawer lateral del carrito
│   │   │       └── splash-screen/         # Pantalla de carga entre rutas
│   │   ├── app.config.ts                  # provideRouter + SSR hydration
│   │   ├── app.config.server.ts           # SSR server config
│   │   ├── app.routes.ts                  # Rutas raíz (lazy)
│   │   └── app.routes.server.ts           # RenderMode.Prerender
│   ├── environments/
│   │   ├── environments.ts                # Producción
│   │   └── environment.development.ts     # Desarrollo
│   ├── index.html                         # Shell HTML + meta tags SEO/OG
│   ├── styles.css                         # @import tailwindcss + tokens globales
│   └── fonts.css                          # Fuentes locales
├── db.json                                # Mock data para json-server
├── .postcssrc.json                        # @tailwindcss/postcss plugin
├── angular.json
├── tsconfig.json
└── package.json
```

---

## Optimizaciones de Performance implementadas

### 1. Server-Side Rendering (SSR) + Prerender
Configurado con @angular/ssr y provideServerRendering. Todas las rutas usan
RenderMode.Prerender, lo que genera HTML estático en build time para entrega
inmediata al navegador, eliminando el tiempo de primer pintado vacío.

### 2. Hydration con Event Replay
`provideClientHydration(withEventReplay())` permite que los eventos del usuario
(clicks, scrolls) disparados antes de que Angular hidrate se capturen y repliquen,
evitando interacciones perdidas durante el arranque.

```ts
provideClientHydration(withEventReplay())
```

### 3. Lazy Loading de módulos
Las rutas de productos se cargan solo cuando el usuario las necesita:
```ts
{ path: 'product', loadChildren: () => import('./features/product/product.routes') }
```

### 4. NgOptimizedImage
ProductItemComponent y ProductDetail usan NgOptimizedImage para gestión
automática de loading="lazy"

### 5. Signals para estado reactivo
CartService, SplashService y HeaderComponent usan signal() y computed()
en lugar de BehaviorSubject, reduciendo el número de ciclos de detección de cambios.

### 6. Persistencia de carrito en localStorage con effect
El carrito se sincroniza automáticamente con localStorage mediante un effect()
reactivo, sin suscripciones manuales ni memory leaks.

### 7. Tailwind CSS v4 con PostCSS
Solo se genera el CSS que realmente se usa en los templates. Sin CSS muerto en
producción.

### 8. Splash Screen entre navegaciones
SplashService muestra un indicador de carga durante eventos de NavigationStart
y lo oculta en NavigationEnd, mejorando la percepción de velocidad en cambios
de ruta.

---

## ¿Cómo se estructuró la solución para escalar?

### Feature modules independientes
Cada feature (product) vive en su propia carpeta con rutas, componentes y
lógica propios. Añadir una nueva sección (cart, checkout, account) no
requiere tocar código existente.

### Separación Core / Shared / Features
- **core/** — servicios singleton (inyectados en root), modelos e interfaces.
- **shared/** — componentes reutilizables sin lógica de negocio.
- **features/** — páginas con lógica propia, lazy-loaded.

### Web Components como Design System
La UI base viene de farmacias-peruanas-ui-webcomponents (Stencil). Los componentes
de Angular consumen estos web components via CUSTOM_ELEMENTS_SCHEMA, desacoplando
el diseño del framework. Actualizar el DS no requiere tocar Angular.

### Environments por entorno
environments.ts y environment.development.ts permiten apuntar a diferentes
APIs sin cambiar código.

### SSR preparado para CDN
Con RenderMode.Prerender el build genera archivos HTML estáticos

---

## Preguntas técnicas

### 1. ¿Qué decisiones tomaste para mejorar la performance en esta página?

Las decisiones principales fueron:

**SSR + Prerender:** El HTML llega renderizado al navegador, lo que mejora
directamente el LCP y el FCP sin esperar la hidratación de Angular.

**NgOptimizedImage:** Gestiona automáticamente loading="lazy" en imágenes fuera
del viewport.

**Signals en lugar de Observables para estado local:** CartService y
HeaderComponent usan signal() y computed(), lo que permite a Angular
actualizar solo el subtree afectado sin necesidad de Zone.js.

**Lazy loading de rutas:** El bundle inicial no incluye código de product-detail
hasta que el usuario navega a esa ruta.

**Tailwind v4 + PostCSS:** Genera solo las clases utilizadas en los templates,
manteniendo el CSS final por debajo de 10 KB en la mayoría de páginas.

---

### 2. ¿Cómo estructurarías esta solución para soportar múltiples marcas con diferentes estilos?

Con un sistema de **design tokens por marca** en el Web Component library:

farmacias-peruanas-ui-webcomponents/

En Angular, cada marca tendría su propio environment

Los web components usan `var(--color-brand)` internamente, por lo que cambiar
la clase de tema en el body es suficiente para cambiar toda la apariencia.
Esto permite **un solo build de componentes, múltiples marcas** sin duplicar código.

---

### 3. Si esta página presenta problemas de LCP en producción, ¿cómo lo abordarías?

El proceso de diagnóstico y solución sería:

**1. Identificar el elemento LCP** con Chrome DevTools o con web-vitals en código:

**2. Si el LCP es una imagen de producto:**
  Agregar priority en NgOptimizedImage a la primera imagen visible:
  ```html
  <img ngSrc="..." priority width="300" height="300">
  ```
  Añadir `<link rel="preload">` en el `index.html` para la imagen hero.
  Servir imágenes desde un CDN con caché agresivo y formato WebP/AVIF.

**3. Si el LCP es texto (nombre del producto):**
  Verificar que las fuentes usan `font-display: Inter` (ya configurado en
  `fonts.css`).
  Pre-conectar al servidor de fuentes con `<link rel="preconnect">`.

**4. Si el LCP se debe a lentitud del servidor (TTFB alto):**
  Habilitar caché HTTP en el servidor SSR para respuestas de rutas prerenderizadas.
  Mover a `RenderMode.Server` con caché en CDN (stale-while-revalidate) si el
  contenido cambia frecuentemente.

**5. Si el LCP es causado por JavaScript bloqueante:**
  Auditar bundle con `ng build --stats-json` + `webpack-bundle-analyzer`.
  Mover dependencias pesadas a lazy imports.

---

### 4. ¿Cómo evitarías que eventos de Analytics se disparen múltiples veces en una SPA?

El proyecto ya tiene una buena base: trackAnalyticsEvent vive en el servicio
(CartService) y no en el template. Para reforzarlo:

**Guardia de entorno:** El código actual verifica `typeof window !== 'undefined'`
para no ejecutarse en SSR, lo cual es correcto.

**Un solo punto de disparo:** El evento `add_to_cart` solo se dispara en
CartService.addToCart(). ProductItemComponent no debe tener su propio
trackAnalyticsEvent para el mismo evento.

---

### 5. ¿Qué consideraciones SEO tendrías en cuenta para esta página en un entorno real?

El proyecto ya tiene una base sólida. Las consideraciones adicionales serían:

Para SEO real, cada página debe tener su propio `title` y
`description` usando `Meta` y `Title` de Angular:
```ts
// En product-detail.ts
this.title.setTitle(`${product.name} | Inkafarma`);
this.meta.updateTag({ name: 'description', content: product.description });
this.meta.updateTag({ property: 'og:image', content: product.image });
```

**Datos estructurados (JSON-LD):** Para productos en Google Shopping y rich
snippets, añadir schema.org en el `<head>` de la página de detalle:
```html
<script type="application/ld+json">
{
  "@type": "Product",
  "name": "...",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "PEN" }
}
</script>
```