# Landing de conversión — Mario Fernando Leon

Landing page para captar contactos de **seguro de vida** desde tráfico pagado.
Audiencia: personas latinas de 50 años en adelante, en todo Estados Unidos.
Servicio **remoto**, por teléfono y videollamada, **sin oficina física**.

React 18 + Vite + Tailwind 3.4 + Framer Motion. Solo en español.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # compila a dist/
npm run preview    # sirve dist/ en http://localhost:4173
npm run deploy     # build + firebase deploy --only hosting
```

---

## 1. Archivos que tienes que editar

| Archivo | Qué hay dentro |
|---|---|
| **`src/config/site.js`** | Teléfono, WhatsApp, correo, horario, licencia, cobertura, dominio público, IDs de tracking |
| **`src/config/theme.js`** | 🎨 Colores, redondeo y animación (ver §2) |
| **`src/config/images.js`** | Todas las fotos, con un comentario de qué es cada una |
| **`src/i18n/es.js`** | **Todo el texto visible de la página** |
| **`src/lib/firebase.js`** | El `firebaseConfig` del proyecto **de Mario** |
| **`.firebaserc`** | El `projectId` de Firebase |

Ningún componente tiene un teléfono, una foto ni una frase escrita a mano.

---

## 2. Las palancas de estética

### Palanca 1 — el preset: **una línea**

`src/config/theme.js`:

```js
export const PRESET_ACTIVO = 'sereno'   // 👈 cambia solo esto
```

- **`sereno`** (por defecto): la paleta del cliente, esquinas poco redondeadas,
  animaciones sutiles.
- **`serenoClaro`**: los **mismos cuatro colores**, con los fondos de sección
  casi blancos, esquinas algo más redondeadas y animación algo más rápida.

No hay más presets a propósito: los cuatro colores los dio el cliente y no
tiene sentido que yo invente paletas alternativas. Si quieres una, el archivo
explica cómo añadirla.

### La paleta, y dónde vive cada color

Los cuatro colores forman **una sola rampa monocroma**, así que van mapeados a
los pasos que ya usan los componentes:

| Color del cliente | Token | Dónde se ve |
|---|---|---|
| `#272757` principal | `marca-700` | Botones, CTA final, títulos fuertes |
| `#0F0E47` contraste | `marca-900` / `tinta-900` | Texto de cuerpo y footer |
| `#505081` secundario | `marca-600` / `acento-700` | Secciones intermedias, antetítulos |
| `#8686AC` secundario | `marca-400` / `acento-500` | Bordes, iconos, fondos suaves, hover |

⚠️ **Cuidado con el contraste.** `#8686AC` sobre blanco da **3,1:1**: sirve
para bordes, iconos y fondos, pero **nunca para texto de cuerpo** (AA pide
4,5:1). El tono más claro de la paleta que sí pasa como texto es `#505081`
(7,3:1), y es el que usan los antetítulos. El verde `#25D366` aparece **solo**
en los botones de WhatsApp, nunca como adorno.

### Palanca 2 — radios

Dentro de cada preset, `borderRadius`: `control` (botones e inputs),
`tarjeta` (tarjetas) y `bloque` (bloques grandes). No hay ni un radio suelto.

### Palanca 3 — intensidad de la animación

`animationIntensity: 'sutil' | 'media' | 'alta'` dentro del preset.
`src/lib/animaciones.js` lo traduce a duración, desplazamiento y escalonado, y
**todos** los `variants` de Framer Motion lo leen de ahí.

### Tamaño de letra

`src/index.css` fija `html { font-size: 17px }` en lugar de los 16 px de
costumbre. Como Tailwind mide en `rem`, eso agranda **toda** la página de forma
proporcional —texto, botones y áreas táctiles— para una audiencia de 50+.
Verificado que no provoca scroll horizontal ni en 390 px ni en 1440 px. Si
quieres volver al tamaño normal, borra esa línea.

---

## 3. Este negocio NO tiene sede física, y eso cambia el SEO

Mario atiende de forma remota en todo el país. Por eso, a diferencia de una
landing de negocio local:

- **El JSON-LD no declara `address`.** Inventar una dirección postal para
  "salir en el mapa" es publicar una sede que no existe.
- `areaServed` es el país entero (`Country: Estados Unidos`), no una ciudad.
- **El titular no lleva ciudad.** No hay SEO local que ganar, así que el H1
  usa ese espacio para el beneficio.
- El pie no lista barrios ni ciudades: lista la cobertura real.

⚠️ **La licencia de seguros es estatal.** Ahora mismo la página dice "todo
Estados Unidos" y la cifra de "50 estados" sale con un asterisco y su aviso.
Si Mario solo puede operar en algunos estados, hay que ponerlos en
`site.cobertura.estados`, poner `confirmada: true` y corregir el copy. Es de
las primeras cosas que hay que aclarar.

---

## 4. Datos que faltan por rellenar

En `npm run dev` sale un **aviso amarillo abajo a la izquierda** con la lista
viva. No aparece en producción.

| Constante | Estado | Por qué importa |
|---|---|---|
| Teléfono y WhatsApp | ✅ `+1 (407) 953-5960` | Ya son los reales, en los 12 botones de WhatsApp y los 5 de llamada |
| Foto de Mario | ✅ `public/asesor.jpg` | Es la única foto que no sale de un banco de imágenes (ver §10) |
| `TODO_EMAIL` | pendiente | Sale en el pie y en la política de privacidad |
| `TODO_LICENCIA` | pendiente | **En seguros el número de licencia es de revelación obligatoria.** No se inventa: mientras esté pendiente, el pie dice "número de licencia pendiente de publicar" |
| `TODO_META_PIXEL_ID` | pendiente | Sin él la campaña optimiza a ciegas |
| `TODO_FIREBASE_PROJECT_ID` | pendiente | **Bloquea el deploy.** Ver §7 |
| `TODO_INSTAGRAM` / `TODO_FACEBOOK` | pendiente | Los iconos del pie se ocultan solos |
| Horario | sin confirmar | Mientras `horario.confirmado` sea `false`, **no entra en el JSON-LD** |

Todo lo que sea marcador **se omite automáticamente del JSON-LD**.

---

## 5. Lo que hay que confirmar con Mario antes de publicar

El BLOQUE 0 traía casi todo como `[SUGERIDO — CONFIRMAR]`. Lo que está escrito
en la página y **no** viene confirmado por él:

1. **Los servicios.** Se asumieron cuatro: IUL, término, gastos finales y
   anualidades, más la consulta inicial gratuita. Si hace más (o menos), se
   cambia en `site.js → productos` y en `i18n/es.js → servicios.items`.
2. **Lo que NO hace.** La página evita cualquier mención a auto, salud/ACA,
   Medicare, hogar, comercial y bolsa/bienes raíces. Hay un test automático que
   falla si alguna de esas palabras aparece en el texto visible.
3. **El diferenciador.** Toda la voz de la página se construyó sobre *"mi
   trabajo no es venderle una póliza, es ayudarle a entender sus opciones"*. Si
   Mario no se reconoce en ese tono, es lo primero que hay que reescribir.
4. **Los cinco miedos** de la sección "¿Por qué conmigo?" son los del BLOQUE 0.
   Si en su experiencia real la gente le dice otras cosas, cámbialas: es la
   sección que más trabaja de la página.
5. **Los estados con licencia** (ver §3).
6. **El horario.**
7. **Con qué aseguradoras trabaja.** La barra de confianza NO lista ninguna
   compañía, porque no sé cuáles son. Inventarlas sería atribuirle acuerdos
   comerciales que quizá no tiene. Si los confirma, el sitio donde irían es
   `src/components/BarraConfianza.jsx`, **como texto**: los logos oficiales
   necesitan autorización escrita de cada aseguradora.

### Datos de EJEMPLO que hay que sustituir o borrar

- **Los 6 testimonios** (`i18n/es.js → testimonios.items`) son **inventados**.
  Van con un aviso amarillo grande y visible en la propia página, no con una
  nota gris al pie: son testimonios falsos publicados bajo el nombre de una
  persona real, y eso es lo más delicado de toda la página. Cuando haya reseñas
  verdaderas, se sustituyen y se pone `site.testimoniosSonEjemplo = false`.
- **No hay** "familias protegidas" ni "años de experiencia" inventados. Las
  cuatro cifras de la barra superior son verdaderas por construcción: los tipos
  de protección se cuentan desde `site.productos`, `$0` es la oferta, `100%`
  remoto es un hecho, y los 50 estados llevan asterisco hasta que se confirme.
- **No hay `aggregateRating`** en el JSON-LD, y es deliberado. Está escrito
  comentado en `src/config/seo.js` con las instrucciones para activarlo el día
  que existan reseñas reales.
- **No hay ninguna cifra de rendimiento, tasa ni retorno** para el IUL ni para
  las anualidades. Son productos regulados: una cifra inventada es una promesa
  que no se puede cumplir. El copy usa lenguaje de beneficio general y hay un
  test que falla si aparece cualquier porcentaje que no sea el "100% remoto".

---

## 6. Medición de conversiones

`src/lib/pixel.js` dispara el evento **`Lead`** en cada clic de WhatsApp, cada
clic de llamada y en el envío del formulario, siempre **etiquetado con su
origen**: `whatsapp-hero`, `whatsapp-servicio-iul`, `llamada-footer`,
`cta-barra`, `formulario`… Así se ve en el panel de anuncios qué CTA trabaja.

Cada plataforma va **guardada por su ID**: sin `metaPixelId` no se carga el
script de Meta, no se pone ninguna cookie y no se dispara nada.

En `npm run dev` no se dispara nada real: cada evento se imprime en consola.

---

## 7. Deploy

Hay dos caminos y **son independientes**: el hosting puede estar en Vercel y
aun así el formulario sigue guardando en Firestore, porque el formulario habla
con Firebase desde el navegador, no desde el servidor que sirve la página.

### Opción A — Vercel

`vercel.json` ya está en el repo con el rewrite de SPA (para que `/privacidad`
no dé 404 al recargar) y las mismas cabeceras de cache y seguridad que Firebase.

Qué hay dentro y por qué:

- **`rewrites`**: `/((?!assets/).*) → /index.html`. En Vercel los rewrites se
  evalúan **después** del sistema de archivos, así que `/og-image.png` y
  compañía se sirven tal cual; la exclusión de `assets/` es un cinturón de más.
- **`headers`**: un año de cache para `/assets/*` (llevan hash en el nombre),
  una hora para `og-image.png` / `favicon.svg` / `robots.txt` / `sitemap.xml`
  (no lo llevan) y `no-store` para el HTML. Los tres patrones **no se solapan**
  —el último excluye a los otros dos— para que ninguna regla pise el
  `Cache-Control` de otra.
- ⚠️ **Nada de comentarios `//` dentro de `vercel.json`.** A diferencia de
  `firebase.json`, Vercel valida el archivo contra un esquema estricto y una
  clave desconocida dentro de `rewrites` o `headers` **hace fallar el deploy**.

1. **Fije el dominio** en `site.js → dominio`:
   ```js
   dominio: 'https://mario-leon.vercel.app'   // sin barra final
   ```
   Sin esto no se emite `canonical`, y el `og:url` y el `sitemap.xml` apuntan a
   `https://ejemplo.web.app`. El primer deploy dirá qué URL le tocó; se pone
   aquí y se vuelve a desplegar. Con dominio propio, se pone el dominio propio.
2. Despliegue, de una de las dos formas:
   ```bash
   npx vercel            # primera vez: crea el proyecto y hace un preview
   npx vercel --prod     # a producción
   ```
   O conecte el repo en <https://vercel.com/new>: detecta Vite solo, y a partir
   de ahí cada `git push` despliega.
3. Vercel no necesita configuración manual de build: `buildCommand`,
   `outputDirectory` (`dist`) y `framework` vienen en `vercel.json`.

⚠️ El SEO se genera **en tiempo de build** (`vite.config.js`). Si cambia
`dominio`, hay que volver a desplegar: no basta con editar el archivo.

⚠️ Vercel da una URL distinta a cada preview (`...-git-rama.vercel.app`). El
`canonical` de todas apuntará al dominio de producción, que es lo correcto,
pero **no mande tráfico pagado a una URL de preview**.

### Opción B — Firebase Hosting

Falta el proyecto de Firebase. Pasos, en orden:

1. Crear el proyecto en <https://console.firebase.google.com>.
2. Copiar el `projectId` y ponerlo **a mano** en `.firebaserc`:
   ```json
   { "projects": { "default": "el-project-id" } }
   ```
   y el mismo valor en `site.js → TODO_FIREBASE_PROJECT_ID`. De ahí sale la URL
   del sitio (`https://<projectId>.web.app`) **si `site.dominio` está vacío**;
   si tiene algo, manda `dominio`.
3. `firebase login` (es interactivo, no se puede automatizar).
4. `npm run deploy`.

`firebase.json` ya trae: `public: dist`, rewrite SPA, cache de un año para los
assets con hash, cache corta para `og-image.png` / `favicon.svg` / `robots.txt`
/ `sitemap.xml`, `max-age=0` para el HTML —con **reglas separadas para `/` y
para `**/*.html`**, porque una regla de `/index.html` no alcanza la petición de
`/`— y las cabeceras `X-Content-Type-Options` y `Referrer-Policy`.

### Formulario (Firestore) — hace falta aunque el hosting esté en Vercel

```bash
firebase apps:create WEB "Mario Leon Landing"
firebase apps:sdkconfig WEB          # pega el resultado en src/lib/firebase.js
firebase firestore:databases:create "(default)" --location nam5
firebase deploy --only firestore:rules
node scripts/prueba-firestore.mjs    # comprueba que las reglas funcionan
```

⚠️ **El `firebaseConfig` tiene que ser el del proyecto de Mario.** Si quedara
pegado el de otro cliente, los contactos de esta landing se guardarían en la
base de datos de otra persona.

`firestore.rules`: cualquiera puede **crear** una cotización; **nadie** puede
leer, editar ni borrar desde el navegador. Se valida con `hasOnly()` por tipo y
longitud, `producto` solo acepta las 5 opciones del desplegable y la marca de
tiempo la pone el servidor. **No es el modo de prueba de Firestore**, que
dejaría la lista de teléfonos abierta a cualquiera.

⚠️ Para preguntar si un campo opcional viene, las reglas usan `'campo' in datos`
sobre el **mapa**. Con `'campo' in datos.keys()` la regla compila pero deniega
escrituras válidas.

**Mientras no esté pegado el config:** en `npm run dev` el envío se simula
(para poder ver la pantalla de gracias) y en producción el formulario muestra
un error con un botón de WhatsApp, para que el contacto **no se pierda en
silencio**. Es deliberado: mejor un error visible que un lead perdido.

---

## 8. Verificación

Lo que se comprobó con Playwright en 1440×900 y 390×844, recorriendo la página
en pasos para disparar todas las animaciones antes de capturar:

- Sin scroll horizontal, sin `pageerror`, sin `console.error`, sin peticiones
  fallidas.
- **Sin `IntersectionObserver`** (el webview de Instagram/Facebook, justo por
  donde entra el tráfico de Meta): 8 secciones, 10 CTAs y 0 elementos
  invisibles. Si no se guardara, la landing quedaría **en blanco**.
- Los 12 enlaces `wa.me` y los 5 `tel:` llevan el número real.
- El JSON-LD se parsea de verdad: `InsuranceAgency`, **sin `address`**, sin
  `aggregateRating`, sin horario sin confirmar y sin ningún marcador dentro.
- Ninguna palabra de los servicios que no hace, y ningún porcentaje que no sea
  el "100% remoto".
- El desplegable del formulario no ofrece "consulta inicial" (sería circular).
- La foto del hero carga y ocupa de verdad (no basta con que exista el `<img>`).

---

## 9. Estructura

```
src/
├── config/site.js       ⚙️ datos del negocio + telHref / waHref / esMarcador
├── config/theme.js      🎨 paleta, radios y animación
├── config/seo.js        🔎 JSON-LD, metadatos, sitemap
├── config/images.js     🖼️ URLs de fotos con su descripción
├── i18n/es.js           🌎 TODO el copy visible
├── lib/firebase.js      🔥 firebaseConfig + guardarCotizacion()
├── lib/pixel.js         📊 trackLead() con etiqueta de origen
├── lib/animaciones.js   ✨ variantes según animationIntensity
├── lib/entorno.js       🛡️ guarda de IntersectionObserver
├── hooks/useContador.js
└── components/
    ├── BarraSuperior · Hero · BarraEstadisticas · BarraConfianza
    ├── Servicios · PorQueElegirnos · Proceso · Testimonios
    ├── CtaFinal · PieDePagina · BotonesFlotantes · Privacidad
    └── ui/ Botones · SmartImage · Reveal · TituloSeccion · AntesDespues
            AvisoPlaceholders · Iconos
```

## 10. Fotos

### La del asesor — la única que no es de banco de imágenes

El hero muestra el retrato de Mario: en móvil, en pequeño y redondo junto a su
nombre (si fuera grande, empujaría los botones fuera de la primera pantalla);
de `lg` hacia arriba, como tarjeta vertical a la derecha del titular. Las dos
salen de la misma entrada, `imagenes.asesor`.

**Ya está puesta**: `public/asesor.jpg`, 800×923 px y 77 KB. El original que
mandó Mario (1167×1347 PNG, 2,1 MB) está en **`assets-fuente/`** por si hay que
volver a generarla; el que se sirve es el JPEG reducido, porque el retrato del
hero carga con `priority` y 2 MB ahí castigan justo a quien entra desde el
móvil con datos.

Para cambiarla:

1. Guarde el archivo como **`public/asesor.jpg`**.
   ⚠️ En **`public/`**, nunca en `dist/`. `dist/` es la salida del build: está
   en `.gitignore` y **`npm run build` la borra entera**. Lo que se ponga ahí
   desaparece en el siguiente build y no llega nunca al deploy.
2. Mantenga `FOTO_ASESOR_CONFIRMADA = true` en `src/config/images.js`.

Formato: retrato **vertical** (entre 4:5 y 6:7), ~800 px de ancho, la cara en
el tercio superior —el recorte es `object-top`— y fondo sencillo. La tarjeta
del hero es 4:5, así que de un 6:7 recorta un 8 % por los lados: nada de la
cara, pero no ponga nada importante pegado al borde.

⚠️ **Si el archivo faltara, el hero muestra una silueta** con los colores de la
marca, no la cara de un modelo de banco de imágenes: poner otra persona bajo el
rótulo "Su asesor — Mario Fernando Leon" sería presentar a un desconocido como
si fuera él.

### Las de contexto

Todas de **Pexels** (licencia libre, también comercial, sin atribución
obligatoria). Cada ID verificado con HTTP 200 y revisado a ojo.

**Criterio de casting:** la audiencia tiene 50 años o más y el servicio es
remoto. Por eso son personas mayores reales en su casa o al aire libre, y
conversaciones por teléfono y videollamada. Nada de oficinas de rascacielos ni
de gente de 25 años con traje, y nada que contradiga los servicios que no hace.

`SmartImage` carga en lazy (menos el hero), hace fade-in, muestra un skeleton
mientras tanto y, si una URL falla, cae a un SVG con los colores de la marca.

## 11. Notas de mantenimiento

- `body { overflow-x: clip }`, no `hidden` — `hidden` rompe `position: sticky`.
- `SmartImage` no añade `relative` si por props ya viene `absolute`: Tailwind
  emite `relative` después y ganaría, colapsando la foto del hero.
- `IntersectionObserver` puede no existir en webviews: `lib/entorno.js` lo
  comprueba y `Reveal` degrada mostrando el contenido sin animar.
- El SDK de Firebase se carga con `import()` dinámico dentro de
  `guardarCotizacion()`: son ~500 KB que casi ninguna visita llega a usar.
