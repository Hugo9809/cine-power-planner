# 🎥 Cine Power Planner

Esta herramienta basada en el navegador ayuda a planificar proyectos de cámara profesionales alimentados con baterías V‑Mount, B‑Mount o Gold-Mount. Calcula el **consumo total de energía**, la **corriente demandada** (a 14,4 V y 12 V) y la **autonomía estimada de la batería**, al tiempo que comprueba que el paquete puede suministrar la potencia necesaria.

Toda la planificación, los datos introducidos y las exportaciones permanecen en
el dispositivo que tienes delante. El idioma, los proyectos, los equipos
personalizados, los favoritos y los comentarios de autonomía viven en tu
navegador, y las actualizaciones del service worker provienen directamente de
este repositorio. Puedes ejecutar la app sin conexión desde el disco o alojarla
internamente para que cada departamento trabaje con la misma versión auditada.

---

## 🌍 Idiomas
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

La aplicación usa automáticamente el idioma de tu navegador en la primera visita y puedes cambiarlo desde la esquina superior derecha. La elección se recuerda para tu próxima sesión.

---

## 🆕 Novedades recientes
- Los controles de acento y tipografía en Ajustes te permiten modificar el color de acento, el tamaño base de la fuente y la tipografía, junto con los temas oscuro, rosa y de alto contraste.
- Los atajos de teclado para la búsqueda global te permiten pulsar / o Ctrl+K (⌘K en macOS) para enfocarla al instante, incluso cuando está dentro del menú lateral móvil.
- El botón de recarga forzada borra los archivos en caché del *service worker* para que la aplicación sin conexión se actualice sin eliminar proyectos ni dispositivos guardados.
- Los iconos de estrella en cada selector fijan las cámaras, baterías y accesorios favoritos en la parte superior de la lista y los conservan en las copias de seguridad.
- El botón de borrar caché local elimina los proyectos y ajustes almacenados.
- La lista de equipo y la vista imprimible muestran el nombre del proyecto para consultarlo rápidamente.
- Sube un logotipo personalizado para que aparezca en las vistas imprimibles y en las copias de seguridad.
- Las copias de seguridad incluyen los favoritos y crean una copia automática antes de restaurar.
- Las entradas del equipo cuentan ahora con un campo de correo electrónico.
- Opción de tema de alto contraste para mejorar la legibilidad.
- Los formularios de dispositivos rellenan los campos de categoría dinámicamente según los atributos del esquema.
- Rediseño de la interfaz con mejor contraste y espaciado para una experiencia más limpia en cualquier dispositivo.
- Compartir proyectos es más sencillo: descarga un archivo JSON que agrupa selecciones, requisitos, listas de equipo, comentarios de autonomía y dispositivos personalizados, y cárgalo para restaurarlo todo de una vez.
- Iconos únicos para los escenarios obligatorios que ayudan a distinguir los requisitos del proyecto.
- Diagrama de proyecto interactivo que permite arrastrar dispositivos, hacer zoom, ajustar nodos a la cuadrícula y exportar la disposición como SVG o JPG.
- Tema rosa lúdico que se mantiene entre visitas.
- Diálogo de ayuda con búsqueda y secciones paso a paso y un FAQ; ábrelo con ?, H, F1 o Ctrl+/.
- Ayudas contextuales al pasar el cursor por botones, campos, menús y encabezados.
- Barra de búsqueda global para saltar a funciones, selectores de dispositivos o temas de ayuda.
- Compatibilidad con cámaras con placas de batería V-, B- o Gold-Mount.
- Envía comentarios de autonomía con temperatura para mejorar las estimaciones.
- Panel visual de ponderación de autonomías para inspeccionar cómo influyen los ajustes en cada informe, ahora ordenado por peso y con porcentajes exactos.
- Genera listas de equipo para compilar el material seleccionado y los requisitos del proyecto.
- Guarda los requisitos de proyecto con cada proyecto para que las listas de equipo conserven el contexto.
- Duplica entradas de usuario en los formularios de la lista de equipo con los botones de bifurcar para copiar campos al instante.

---

## 🔧 Funciones

### ✨ Destacados ampliados

- **Planifica rigs complejos sin conjeturas.** Combina cámaras, placas de
  batería, enlaces inalámbricos, monitores, motores y accesorios mientras ves el
  consumo total a 14,4 V/12 V (y 33,6 V/21,6 V para B‑Mount) junto a autonomías
  realistas basadas en datos de campo ponderados. El panel de comparación de
  baterías avisa de sobrecargas antes de que el equipo salga rumbo al rodaje.
- **Mantén alineados a todos los departamentos.** Guarda varios proyectos con
  requisitos, contactos del equipo, escenarios y notas. Las listas imprimibles
  agrupan el material por categoría, fusionan duplicados, muestran metadatos
  técnicos e incluyen accesorios condicionados por escenarios para que cámara,
  iluminación y grip compartan el mismo contexto.
- **Trabaja con confianza en cualquier lugar.** Abre `index.html` directamente o
  sirve la carpeta por HTTPS para activar el service worker. La caché sin
  conexión conserva idioma, temas, favoritos y proyectos, y **Forzar recarga**
  actualiza los recursos almacenados sin tocar tus datos.
- **Adapta el planner a tu equipo.** Cambia al instante entre español, inglés,
  alemán, italiano y francés, ajusta el tamaño y la tipografía, define un color
  de acento propio, sube un logotipo para impresión y alterna entre tema claro,
  oscuro, rosa o de alto contraste. Los desplegables con búsqueda, favoritos
  fijados, botones de bifurcación y ayudas flotantes mantienen ágil el trabajo en
  set.

### ✅ Gestión de proyectos
- Guarda, carga y elimina múltiples proyectos de cámara (pulsa Enter o Ctrl+S/⌘S para guardar rápido; el botón Guardar permanece desactivado hasta introducir un nombre).
- Se crean instantáneas automáticas cada 10 minutos mientras el planificador está abierto, y el diálogo de Ajustes puede programar exportaciones de copias de seguridad cada hora como recordatorio para archivar los datos.
- Descarga un archivo JSON que agrupa selecciones, requisitos, listas de equipo, comentarios de autonomía y dispositivos personalizados; cárgalo mediante el selector de Proyecto compartido para restaurarlo todo de una vez.
- Los datos se almacenan localmente mediante `localStorage`, y los favoritos se conservan en las copias de seguridad; utiliza el botón **Borrar caché local** en Ajustes si necesitas limpiar proyectos en caché y ediciones de dispositivos.
- Genera vistas imprimibles para cualquier proyecto guardado y añade un logotipo personalizado para que las exportaciones y copias coincidan con la identidad de tu producción.
- Guarda los requisitos de proyecto junto con cada proyecto para que las listas de equipo conserven el contexto completo.
- Funciona totalmente sin conexión con el *service worker* instalado: idioma, tema, datos de dispositivos y favoritos persisten entre sesiones.
- El diseño adaptable se ajusta sin esfuerzo a escritorios, tabletas y teléfonos.
- En las cámaras compatibles elige placas **V‑Mount**, **B‑Mount** o **Gold-Mount**; la lista de baterías se adapta automáticamente.

### 🧭 Descripción de la interfaz
- **Resumen rápido:**
  - **Búsqueda global** (`/` o `Ctrl+K`/`⌘K`) salta a funciones, selectores o
    temas de ayuda incluso cuando el menú lateral está contraído.
  - **Centro de ayuda** (`?`, `H`, `F1` o `Ctrl+/`) ofrece guías filtrables,
    preguntas frecuentes, accesos directos y el modo de ayuda flotante.
  - **Diagrama del proyecto** visualiza conexiones; mantén pulsada Mayús al
    descargar para guardar un JPG en lugar de SVG y ver avisos de
    compatibilidad.
  - **Comparador de baterías** muestra el rendimiento de cada pack compatible y
    resalta riesgos de sobrecarga.
  - **Generador de listas** crea tablas por categoría con metadatos, correos de
    la crew y añadidos según escenario listos para imprimir.
  - **Indicador sin conexión y Forzar recarga** reflejan el estado de la
    conexión y renuevan archivos en caché sin borrar proyectos.
- Un enlace de salto y un indicador sin conexión mantienen la interfaz accesible con teclado y pantallas táctiles: la insignia aparece cuando el navegador pierde la conexión.
- La barra de búsqueda global salta a funciones, selectores de dispositivos o temas de ayuda; pulsa Enter para activar el resultado resaltado, usa / o Ctrl+K (⌘K en macOS) para enfocarla desde cualquier lugar (el menú lateral se abre automáticamente en pantallas pequeñas) y pulsa Escape o × para limpiar la consulta.
- Los controles de la barra superior permiten cambiar el idioma, alternar los temas oscuro y rosa y abrir Ajustes con opciones de color de acento, tamaño y familia tipográfica, modo de alto contraste y carga de logotipo, además de herramientas para copia de seguridad, restauración y Borrar caché local.
- El botón de Ayuda abre un diálogo con búsqueda, secciones paso a paso, atajos de teclado, preguntas frecuentes y un modo de ayuda emergente opcional; también puede activarse con ?, H, F1 o Ctrl+/ incluso mientras escribes.
- El botón de recarga forzada (🔄) borra los archivos del *service worker* en caché para que la aplicación sin conexión se actualice sin eliminar proyectos ni dispositivos guardados.
- En pantallas pequeñas, un menú lateral plegable replica cada sección principal para navegar rápidamente.

### ♿ Personalización y accesibilidad
- Las preferencias de tema incluyen modo oscuro, acentos rosas lúdicos y un interruptor dedicado de alto contraste para mejorar la legibilidad.
- Los cambios en el color de acento, el tamaño base de la fuente y la tipografía se aplican al instante y persisten en el navegador, lo que te permite adaptarlo a la identidad del estudio o a necesidades de accesibilidad.
- Los atajos de teclado integrados cubren la búsqueda global (/ o Ctrl+K/⌘K), la ayuda ( ?, H, F1, Ctrl+/ ), el guardado (Enter o Ctrl+S/⌘S), el modo oscuro (D) y el modo rosa (P).
- El modo de ayuda al pasar el cursor convierte cada botón, campo, menú y encabezado en una descripción emergente bajo demanda para que las personas nuevas aprendan rápidamente.
- Las entradas con búsqueda incremental, los controles visibles al enfocar y los iconos de estrella junto a los selectores permiten filtrar listas largas y fijar dispositivos favoritos en la parte superior.
- Sube un logotipo para las impresiones, configura roles de monitorización por
  defecto y ajusta los presets de requisitos del proyecto para que las
  exportaciones respeten la identidad de la productora.
- Los botones de bifurcación duplican filas de formularios de inmediato y los
  favoritos fijados mantienen el equipo habitual en la parte alta de cada
  selector, algo clave cuando el tiempo en set es limitado.

### 📋 Lista de equipo
El generador transforma tus selecciones en una lista de empaquetado categorizada:

- Haz clic en **Generar lista de equipo** para compilar el material elegido y los requisitos del proyecto en una tabla.
- La tabla se actualiza automáticamente cuando cambian las selecciones de dispositivos o los requisitos.
- Los elementos se agrupan por categoría (cámara, óptica, alimentación, monitorización, rigging, grip, accesorios, consumibles) y los duplicados se combinan con sus cantidades.
- Se añaden cables, rigging y accesorios necesarios para monitores, motores, gimbals y escenarios meteorológicos.
- Las selecciones de escenarios añaden equipo relacionado:
  - *Handheld* + *Easyrig* inserta una empuñadura telescópica para un soporte estable.
  - *Gimbal* añade el gimbal seleccionado, brazos articulados, espigas y parasoles o kits de filtros.
  - *Outdoor* aporta espigas, paraguas y fundas CapIt para lluvia.
  - Los escenarios *Vehicle* y *Steadicam* incluyen monturas, brazos de aislamiento y ventosas cuando corresponde.
- Las selecciones de óptica incluyen diámetro frontal, peso, datos de barras y enfoque mínimo, añaden soportes de lente y adaptadores de matte box, y avisan sobre estándares de barras incompatibles.
- Las filas de baterías reflejan los recuentos del calculador de alimentación e incluyen placas de *hotswap* o dispositivos seleccionados cuando se necesitan.
- Las preferencias de monitorización asignan monitores predeterminados para cada rol (Director, DoP, foco, etc.) con juegos de cables y receptores inalámbricos.
- El formulario de **Requisitos del proyecto** alimenta la lista:
  - **Nombre del proyecto**, **productora**, **casa de alquiler** y **DoP** aparecen en el encabezado de los requisitos impresos.
  - Las entradas de **Equipo** recogen nombres, roles y direcciones de correo electrónico para que la información de contacto viaje con el proyecto.
  - **Días de preparación** y **días de rodaje** aportan notas de planificación y, junto con escenarios exteriores, sugieren equipo para la climatología.
  - Los **escenarios obligatorios** añaden rigging, gimbals y protección climática correspondiente.
  - **Empuñadura de cámara** y **extensión de visor** insertan las piezas seleccionadas o los soportes de extensión.
  - Las opciones de **matte box** y **filtros** agregan el sistema elegido con bandejas, adaptadores de pinza o filtros necesarios.
  - Las configuraciones de **monitorización**, **distribución de vídeo** y **visor** añaden monitores, cables y superposiciones para cada rol.
  - Las selecciones de **botones de usuario** y **preferencias de trípode** se listan para una referencia rápida.
- Los elementos dentro de cada categoría se ordenan alfabéticamente y muestran descripciones al pasar el cursor.
- La lista de equipo se incluye en las vistas imprimibles y en los archivos de proyectos compartidos.
- Las listas de equipo se guardan automáticamente con el proyecto y forman parte de los archivos compartidos y de las copias de seguridad.
- **Eliminar lista de equipo** borra la lista guardada y oculta la salida.
- Los formularios de la lista de equipo incluyen botones de bifurcar para duplicar entradas de usuario al instante.

### 📦 Categorías de dispositivos
- **Cámara** (1)
- **Monitor** (opcional)
- **Transmisor inalámbrico** (opcional)
- **Motores FIZ** (0–4)
- **Controladores FIZ** (0–4)
- **Sensor de distancia** (0–1)
- **Placa de batería** (solo en cámaras que aceptan V‑ o B‑Mount)
- **Batería V‑Mount** (0–1)

### ⚙️ Cálculos de energía
- Consumo total en vatios
- Corriente demandada a 14,4 V y 12 V
- Autonomía estimada de la batería en horas usando la media ponderada de los comentarios de personas usuarias
- Número de baterías necesarias para un rodaje de 10 h (incluida la de repuesto)
- Nota de temperatura para ajustar la autonomía en condiciones de calor o frío

### 🔋 Comprobación de entrega de batería
- Avisa si la corriente demandada supera la salida de la batería (pin o D‑Tap)
- Indica cuando el consumo está cerca del límite (80 % de uso)

### 📊 Comparación de baterías (opcional)
- Compara estimaciones de autonomía entre todas las baterías
- Gráficos de barras para consulta rápida

### 🖼 Diagrama del proyecto
- Visualiza las conexiones de alimentación y vídeo de los dispositivos seleccionados.
- Advierte cuando las marcas FIZ son incompatibles.
- Arrastra nodos para reorganizar el esquema, haz zoom con los botones y descarga el diagrama como SVG o JPG.
- Mantén pulsado Shift al hacer clic en Descargar para exportar una instantánea JPG en lugar de SVG.
- Pasa el cursor o toca los dispositivos para ver detalles emergentes.
- Utiliza iconos de [OpenMoji](https://openmoji.org/) cuando hay conexión, con emoji como alternativa: 🔋 batería, 🎥 cámara, 🖥️ monitor, 📡 vídeo, ⚙️ motor, 🎮 controlador, 📐 distancia, 🎮 empuñadura y 🔌 placa de batería.

### 🧮 Ponderación de datos de autonomía
- Los tiempos de batería aportados por la comunidad refinan la estimación de autonomía.
- Cada registro se ajusta por temperatura, escalando desde ×1 a 25 °C hasta:
  - ×1,25 a 0 °C
  - ×1,6 a −10 °C
  - ×2 a −20 °C
- Los ajustes de cámara influyen en el peso:
  - Multiplicadores de resolución: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; resoluciones menores se escalan a 1080p.
  - La frecuencia de cuadro escala linealmente desde 24 fps (por ejemplo, 48 fps = ×2).
  - Wi‑Fi activado suma un 10 %.
  - Factores de códec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
  - Las entradas de monitores por debajo del brillo especificado se ponderan según su relación de brillo.
- El peso final refleja la cuota de consumo de cada dispositivo, de modo que los proyectos equivalentes cuentan más.
- Se usa la media ponderada cuando hay al menos tres entradas disponibles.
- Un panel ordena los registros por peso y muestra el porcentaje que aporta cada uno para compararlos rápidamente.

### 🔍 Búsqueda y filtrado
- Escribe dentro de los menús desplegables para encontrar entradas rápidamente.
- Filtra las listas de dispositivos con un cuadro de búsqueda.
- Utiliza la barra de búsqueda global en la parte superior para saltar a funciones, dispositivos o temas de ayuda; pulsa Enter para navegar, usa / o Ctrl+K (⌘K en macOS) para enfocarla al instante y pulsa Escape o × para limpiar.
- Pulsa '/' o Ctrl+F (⌘F en macOS) para enfocar al instante el cuadro de búsqueda más cercano.
- Haz clic en la estrella junto a cualquier selector para fijar favoritos, mantenerlos en la parte superior de la lista y sincronizarlos con las copias de seguridad.

### 🛠 Editor de la base de datos de dispositivos
- Añade, edita o elimina dispositivos en todas las categorías.
- Importa o exporta la base de datos completa como JSON.
- Vuelve a la base de datos predeterminada de `data.js`.

### 🌓 Modo oscuro
- Actívalo con el botón de la luna junto al selector de idioma.
- La preferencia se guarda en tu navegador.

### 🦄 Modo rosa
- Haz clic en el botón del unicornio (brilla cuando está activo) o pulsa **P** para activar un acento rosa lúdico.
- Funciona en los temas claro y oscuro y persiste entre visitas.

### ⚫ Modo de alto contraste
- Activa un tema de alto contraste para mejorar la legibilidad.

### 📝 Comentarios de autonomía
- Haz clic en <strong>Enviar comentarios de autonomía</strong> debajo de la autonomía para añadir tu propia medición.
- Incluye la temperatura si quieres una ponderación más precisa.
- Las entradas se guardan en tu navegador y mejoran las estimaciones futuras.
- Un panel dedicado ordena los envíos según su peso, muestra porcentajes de
  contribución y resalta valores atípicos para que el equipo evalúe los datos de
  campo rápidamente.

### ❓ Ayuda con búsqueda
- Ábrela mediante el botón <strong>?</strong> o pulsa <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> o <kbd>Ctrl+/</kbd>.
- Usa el campo de búsqueda para filtrar temas al instante; la consulta se restablece al cerrar el diálogo.
- Cierra con <kbd>Escape</kbd> o haciendo clic fuera del diálogo.

---

## ▶️ Cómo usarlo
1. **Inicia la aplicación:** abre `index.html` en cualquier navegador moderno; no necesita servidor.
2. **Explora la barra superior:** cambia de idioma, alterna los temas oscuro o rosa, abre Ajustes para modificar acento y tipografías, y lanza el diálogo de ayuda con ? o Ctrl+/.
3. **Selecciona los dispositivos:** elige el equipo de cada categoría con los menús desplegables; escribe para filtrar, haz clic en la estrella para fijar favoritos y deja que los escenarios preconfigurados rellenen los accesorios automáticamente.
4. **Consulta los cálculos:** verás consumo total, corriente y autonomía cuando selecciones una batería; los avisos resaltan cuando se supera la entrega permitida.
5. **Guarda y comparte proyectos:** pon nombre y guarda tu configuración, las copias automáticas capturan instantáneas y el botón Compartir exporta un paquete JSON para el equipo.
6. **Genera listas de equipo:** pulsa **Generar lista de equipo** para convertir los requisitos en una lista categorizada con descripciones y accesorios.
7. **Gestiona los datos de dispositivos:** haz clic en “Editar datos de dispositivos…” para abrir el editor, modificar dispositivos, exportar/importar JSON o volver a los valores predeterminados.
8. **Envía comentarios de autonomía:** usa “Enviar comentarios de autonomía” para registrar mediciones de campo y refinar las estimaciones ponderadas.

## 📱 Instalar como aplicación

El planificador es una aplicación web progresiva y puede instalarse directamente desde tu navegador:

- **Chrome/Edge (escritorio):** haz clic en el icono de instalación de la barra de direcciones.
- **Android:** abre el menú del navegador y elige *Añadir a la pantalla de inicio*.
- **iOS/iPadOS Safari:** toca el botón *Compartir* y selecciona *Añadir a pantalla de inicio*.

Una vez instalada, la aplicación se abre desde tu pantalla de inicio, funciona sin conexión y se actualiza automáticamente.

## 📡 Uso sin conexión y almacenamiento de datos

Servir la aplicación mediante HTTP(S) instala un *service worker* que almacena en caché cada archivo, de modo que Cine Power Planner funciona sin conexión y se actualiza en segundo plano. Los proyectos, los comentarios de autonomía y las preferencias (idioma, tema, modo rosa y listas de equipo guardadas) viven en el `localStorage` del navegador. Al borrar los datos del sitio en el navegador se elimina toda la información almacenada, y el diálogo de Ajustes incluye un botón de **Borrar caché local** para la misma limpieza con un solo clic.
La cabecera muestra un indicador sin conexión cuando se pierde la red, y la
acción 🔄 **Forzar recarga** actualiza los recursos en caché sin afectar a los
proyectos guardados.

---

## 🗂️ Estructura de archivos
```bash
index.html       # Maquetación principal en HTML
style.css        # Estilos y diseño
script.js        # Lógica de la aplicación
data.js          # Lista predeterminada de dispositivos
storage.js       # Utilidades para LocalStorage
README.*.md      # Documentación en varios idiomas
checkConsistency.js  # Verifica campos obligatorios en los datos de dispositivos
normalizeData.js     # Limpia entradas y unifica nombres de conectores
generateSchema.js    # Reconstruye schema.json a partir de data.js
unifyPorts.js        # Armoniza nombres de puertos heredados
tests/               # Suite de pruebas de Jest
```
Las fuentes se incluyen localmente mediante `fonts.css`, así que una vez que los recursos están en caché la aplicación funciona completamente sin conexión.

## 🛠️ Desarrollo
Requiere Node.js 18 o posterior.

```bash
npm install
npm run lint     # ejecuta solo ESLint
npm test         # ejecuta linting, comprobaciones de datos y pruebas de Jest
```

Después de editar los datos de dispositivos, regenera la base de datos normalizada:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Añade `--help` a cualquiera de los scripts anteriores para ver los detalles de uso.

## 🤝 Contribuciones
¡Se agradecen las contribuciones! Puedes abrir un issue o enviar un *pull request* en GitHub.
Si informas de datos incorrectos, adjuntar copias de seguridad de proyectos o
mediciones de autonomía ayuda a mantener el catálogo fiable para todos.
