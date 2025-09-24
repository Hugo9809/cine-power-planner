# 🎥 Cine Power Planner

Esta herramienta basada en navegador ayuda a planificar proyectos de cámara profesionales alimentados con baterías V‑Mount, B‑Mount o Gold-Mount. Calcula el **consumo total de energía**, la **corriente demandada** (a 14,4 V y 12 V) y la **autonomía estimada** mientras comprueba que la batería pueda suministrar con seguridad la potencia necesaria.

Toda la planificación, los datos introducidos y las exportaciones permanecen en el dispositivo que tienes delante. El idioma, los proyectos, el equipo personalizado, los favoritos y los comentarios de autonomía se guardan en tu navegador, y las actualizaciones del service worker llegan directamente desde este repositorio. Ejecuta Cine Power Planner sin conexión desde el disco o aloja la carpeta internamente para que todos los departamentos trabajen con la misma versión auditada.

## De un vistazo

- **Planifica sin conexión.** Todos los iconos, tipografías y scripts auxiliares están incluidos en este repositorio; abre
  `index.html` directamente y trabaja sin conexión.
- **Los proyectos se quedan en tu dispositivo.** Las copias guardadas, los datos de autonomía, el equipo personalizado, los
  favoritos y las listas de equipo permanecen locales; las copias de seguridad y los paquetes compartibles son archivos JSON
  legibles.
- **Controla las actualizaciones.** El service worker solo se renueva cuando pulsas **Forzar recarga**, de modo que el equipo se
  mantiene en una versión fiable incluso durante los traslados.
- **Red de seguridad en capas.** Guardados manuales, auto guardados y copias de seguridad automáticas con marca de tiempo
  facilitan ensayar la recuperación antes del rodaje.

## Puesta en marcha rápida

1. Descarga o clona el repositorio y abre `index.html` en un navegador moderno.
2. (Opcional) Sirve la carpeta en local (por ejemplo con `npx http-server` o `python -m http.server`) para que el service worker
   se registre y almacene en caché los recursos para el uso sin conexión.
3. Carga el planner una vez, cierra la pestaña, desconéctate de la red y vuelve a abrir `index.html`. El indicador sin conexión
   parpadeará brevemente mientras se carga la interfaz almacenada.
4. Crea un proyecto, pulsa **Intro** (o **Ctrl+S**/`⌘S`) para guardar y comprueba la copia de seguridad automática que aparece
   en el selector tras unos minutos.
5. Exporta **Ajustes → Copia de seguridad y restauración → Copia de seguridad**, importa el archivo en un perfil privado del
   navegador y confirma que todos los proyectos, favoritos y equipos personalizados se restauran correctamente.
6. Practica exportar un paquete `.cpproject` e importarlo en otra máquina o perfil para validar la cadena guardar → compartir →
   importar antes de llegar al set.

## Flujos de trabajo clave

- **Planifica un rig.** Combina cámaras, placas, enlaces inalámbricos, monitores, motores y accesorios mientras las cifras de
  consumo y autonomía se actualizan al instante.
- **Guarda versiones.** Mantén instantáneas explícitas de los proyectos y deja que las copias de seguridad automáticas con marca
  de tiempo capturen el trabajo en curso cada 10 minutos.
- **Comparte con seguridad.** Exporta paquetes `.cpproject` que permanecen sin conexión, validan el esquema al importar e
  incluyen reglas automáticas de equipo si lo necesitas.
- **Haz copia de todo.** Las copias de seguridad completas del planner incluyen proyectos, favoritos, equipos personalizados,
  datos de autonomía y preferencias de la interfaz para no perder contexto.

## Protección de datos sin conexión

- Verifica con regularidad que todo está listo para trabajar sin conexión: carga la aplicación, desconéctate, actualiza y
  comprueba que tus proyectos siguen disponibles.
- Conserva copias redundantes en soportes etiquetados e impórtalas en un segundo perfil después de cada exportación.
- Antes de aplicar actualizaciones o modificar datos importantes, genera una copia de seguridad manual y confirma que se restaura
  correctamente.

---

## 🌍 Idiomas
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

La aplicación adopta automáticamente el idioma de tu navegador en la primera visita y puedes cambiarlo desde la esquina superior derecha. El ajuste se guarda para la siguiente sesión.

---

## 🆕 Novedades recientes
- Las comparaciones de versiones de respaldos permiten elegir cualquier guardado manual o copia automática con marca de tiempo para revisar diferencias, añadir notas de incidentes y exportar un registro antes de revertir cambios o entregar material a postproducción.
- Las copias de seguridad ahora normalizan los paquetes de datos heredados guardados como cadenas JSON o como matrices de entradas para que los archivos antiguos se restauren correctamente.
- Los ensayos de restauración cargan una copia completa de la aplicación o un paquete de proyecto en un entorno aislado para confirmar que su contenido coincide con los datos en vivo sin tocar los perfiles de producción.
- Las reglas automáticas de equipo permiten diseñar adiciones o retiradas según el escenario, exportar la configuración y restaurarla junto con los paquetes de proyecto.
- El panel Datos y almacenamiento audita proyectos guardados, listas de equipo, dispositivos personalizados, favoritos y comentarios de autonomía directamente desde Ajustes y muestra el tamaño aproximado del respaldo.
- La superposición del estado de auto-guardado refleja la nota más reciente dentro de Ajustes para que los equipos vean la actividad en segundo plano mientras practican los ejercicios de recuperación.
- El editor de equipo consciente del monitoreo muestra accesorios adicionales de monitor y video solo cuando los escenarios lo requieren para mantener enfocado el diseño de reglas.
- Los controles de acento y tipografía en Ajustes permiten ajustar el color de acento, el tamaño base de la fuente y la familia tipográfica junto a los temas oscuro, rosa y de alto contraste.
- Los atajos de teclado de la búsqueda global enfocan la búsqueda de funciones al instante con / o Ctrl+K (⌘K en macOS), incluso cuando está dentro del menú lateral móvil contraído.
- El botón **Forzar recarga** borra los archivos del service worker en caché para que la aplicación sin conexión se actualice sin eliminar proyectos ni dispositivos guardados.
- Las estrellas de cada selector fijan cámaras, baterías y accesorios favoritos en la parte superior de la lista y los mantienen en las copias de seguridad.
- El flujo de **Restablecimiento de fábrica** descarga automáticamente una copia de seguridad antes de eliminar proyectos, dispositivos y ajustes almacenados.
- La lista de equipo y la vista imprimible muestran el nombre del proyecto para consultarlo de un vistazo.
- Sube un logotipo personalizado para que aparezca en las vistas imprimibles y en las copias de seguridad.
- Las copias de seguridad incluyen los favoritos y crean automáticamente una copia antes de restaurar.
- Las fichas del equipo incluyen ahora un campo de correo electrónico.
- Opciones de accesibilidad con alto contraste, animación reducida y espaciado relajado mejoran la legibilidad y la comodidad.
- Los formularios de dispositivos rellenan los campos de categoría dinámicamente a partir de los atributos del esquema.
- Interfaz rediseñada con mayor contraste y espaciado para una experiencia más limpia en cualquier dispositivo.
- Compartir proyectos es más sencillo: descarga un archivo JSON que agrupa selecciones, requisitos, listas de equipo, comentarios de autonomía y dispositivos personalizados, e impórtalo para restaurarlo todo.
- Iconos exclusivos para los escenarios obligatorios distinguen los requisitos del proyecto.
- Diagrama de proyecto interactivo para arrastrar dispositivos, hacer zoom, ajustar los nodos a la cuadrícula y exportar el plano como SVG o JPG.
- Tema rosa divertido que se mantiene entre visitas.
- Diálogo de ayuda con búsqueda, secciones paso a paso y FAQ; ábrelo con ?, H, F1 o Ctrl+/.
- Ayudas contextuales al pasar el cursor por botones, campos, menús y encabezados.
- Barra de búsqueda global para saltar a funciones, selectores de dispositivos o temas de ayuda.
- Compatibilidad con cámaras con placas de batería V‑, B‑ o Gold-Mount.
- Envía comentarios de autonomía con temperatura para afinar las estimaciones.
- Panel visual de ponderación de autonomías que muestra cómo influyen los ajustes en cada informe, ahora ordenado por peso y con porcentajes exactos.
- Generador de listas de equipo que reúne el material seleccionado y los requisitos del proyecto.
- Guarda los requisitos del proyecto con cada proyecto para conservar todo el contexto en las listas de equipo.
- Duplica al instante las entradas personalizadas en los formularios de lista de equipo con los botones en forma de horquilla.

---

## 🔧 Funciones

### ✨ Destacados ampliados

- **Diseña rigs complejos sin adivinar.** Combina cámaras, placas de batería, enlaces inalámbricos, monitores, motores y accesorios mientras supervisas el consumo total a 14,4 V/12 V (y 33,6 V/21,6 V en B‑Mount) junto a autonomías realistas basadas en datos de campo ponderados. El panel de comparación de baterías avisa de sobrecargas antes de que el equipo salga al rodaje.
- **Mantén coordinados a todos los departamentos.** Guarda varios proyectos con requisitos, contactos del equipo, escenarios y notas. Las listas imprimibles agrupan el material por categoría, fusionan duplicados, muestran metadatos técnicos e incluyen accesorios condicionados por los escenarios para que cámara, iluminación y grip trabajen con el mismo contexto.
- **Trabaja con seguridad estés donde estés.** Abre `index.html` directamente o sirve la carpeta por HTTPS para activar el service worker. La caché sin conexión conserva idioma, temas, favoritos y proyectos, y **Forzar recarga** actualiza los recursos almacenados sin tocar tus datos.
- **Ajusta Cine Power Planner a tu equipo.** Cambia al instante entre español, inglés, alemán, italiano y francés, ajusta el tamaño de la fuente y la tipografía, define un color de acento, sube un logotipo para impresión y alterna entre temas claro, oscuro, rosa o de alto contraste. Los selectores con búsqueda, los favoritos fijados, los botones de duplicar y las ayudas flotantes mantienen ágil el trabajo en set.

### ✅ Gestión de proyectos
- Guarda, carga y elimina múltiples proyectos (pulsa Enter o Ctrl+S/⌘S para guardar rápido; el botón Guardar permanece desactivado hasta introducir un nombre).
- Se generan instantáneas automáticas cada 10 minutos mientras Cine Power Planner está abierto, y el cuadro de Ajustes puede lanzar exportaciones de copias de seguridad cada hora como recordatorio.
- Descarga un archivo JSON que reúne selecciones, requisitos, listas de equipo, comentarios de autonomía y dispositivos personalizados; impórtalo mediante el selector de proyectos para recuperarlo todo de una vez.
- Los datos se guardan localmente mediante `localStorage`, y los favoritos se incluyen en las copias de seguridad; usa la opción **Restablecimiento de fábrica** para descargar automáticamente una copia antes de limpiar proyectos y dispositivos guardados.
- Genera vistas imprimibles de cualquier proyecto y añade un logotipo personalizado para que exportaciones y copias coincidan con tu identidad de producción.
- Los requisitos de proyecto se guardan junto a cada proyecto, de modo que la lista de equipo mantiene todo el contexto.
- Funciona íntegramente sin conexión gracias al service worker: idioma, tema, datos de dispositivos y favoritos persisten entre sesiones.
- El diseño adaptable responde sin esfuerzo en ordenadores, tabletas y teléfonos.
- En las cámaras compatibles puedes elegir placas **V‑Mount**, **B‑Mount** o **Gold-Mount**; la lista de baterías se actualiza automáticamente.

### 🧭 Descripción de la interfaz
- **Resumen rápido:**
  - **Búsqueda global** (`/` o `Ctrl+K`/`⌘K`) salta a funciones, selectores o temas de ayuda incluso con el menú lateral plegado.
  - **Centro de ayuda** (`?`, `H`, `F1` o `Ctrl+/`) ofrece guías filtrables, preguntas frecuentes, atajos y el modo de ayuda flotante.
  - **Diagrama del proyecto** muestra las conexiones; mantén pulsada Mayús al descargar para guardar un JPG en lugar de un SVG y ver avisos de compatibilidad.
  - **Comparador de baterías** revela el rendimiento de cada pack compatible y resalta riesgos de sobrecarga.
  - **Generador de listas** crea tablas por categoría con metadatos, correos del equipo y accesorios según escenario listos para imprimir.
  - **Indicador sin conexión y Forzar recarga** reflejan el estado de la conexión y renuevan los archivos en caché sin borrar proyectos.
- Un enlace de salto y un indicador sin conexión mantienen la interfaz accesible para teclado y pantallas táctiles; la insignia aparece cuando el navegador pierde la conexión.
- La barra de búsqueda global salta a funciones, selectores de dispositivos o temas de ayuda; pulsa Enter para abrir el resultado destacado, usa / o Ctrl+K (⌘K en macOS) para enfocarla desde cualquier lugar (el menú lateral se abre automáticamente en pantallas pequeñas) y pulsa Escape o × para limpiar la consulta.
- Los controles superiores permiten cambiar de idioma, alternar los temas oscuro y rosa y abrir Ajustes con opciones de color de acento, tamaño y familia tipográfica, modo de alto contraste y carga de logotipo, además de herramientas para copia de seguridad, restauración y Restablecimiento de fábrica que guardan una copia antes de borrar datos.
- El botón de Ayuda abre un diálogo con búsqueda, secciones guiadas, atajos de teclado, FAQ y un modo de ayuda emergente opcional; también puedes abrirlo con ?, H, F1 o Ctrl+/ incluso mientras escribes.
- El botón de recarga forzada (🔄) borra los archivos del service worker almacenados en caché para que la aplicación sin conexión se actualice sin perder proyectos ni dispositivos.
- En pantallas pequeñas, un menú lateral plegable replica cada sección principal para navegar con rapidez.

### ♿ Personalización y accesibilidad
- Los temas incluyen modo oscuro, acentos rosas lúdicos y un interruptor de alto contraste para mejorar la legibilidad.
- Los cambios de color de acento, tamaño base y tipografía se aplican al instante y se conservan en el navegador, ideales para adaptarse a la identidad visual o a necesidades de accesibilidad.
- Los atajos integrados cubren la búsqueda global (/ o Ctrl+K/⌘K), la ayuda ( ?, H, F1, Ctrl+/ ), el guardado (Enter o Ctrl+S/⌘S), el modo oscuro (D) y el modo rosa (P).
- El modo de ayuda emergente convierte botones, campos, menús y encabezados en descripciones bajo demanda para que el equipo se familiarice rápido.
- Las entradas con búsqueda incremental, los estados visibles al enfocar y las estrellas junto a los selectores permiten filtrar listas largas y fijar los favoritos.
- Sube un logotipo para impresiones, configura roles de monitorización predeterminados y ajusta los presets de requisitos del proyecto para que las exportaciones respeten la identidad de la producción.
- Los botones de bifurcación duplican filas al instante, y los favoritos fijados mantienen el equipo habitual en la parte superior de cada selector.

### 📋 Lista de equipo
El generador convierte tus selecciones en una lista de empaque categorizada:

- Haz clic en **Generar lista de equipo** para combinar el equipo elegido y los requisitos del proyecto en una tabla.
- La tabla se actualiza en cuanto cambian las selecciones o los requisitos.
- Los elementos se agrupan por categoría (cámara, óptica, alimentación, monitorización, rigging, grip, accesorios, consumibles) y los duplicados se fusionan con sus cantidades.
- Se añaden cables, rigging y accesorios necesarios para monitores, motores, gimbals y escenarios meteorológicos.
- Las selecciones de escenarios agregan el equipo relacionado:
  - *Handheld* + *Easyrig* incorpora una empuñadura telescópica para un soporte estable.
  - *Gimbal* suma el gimbal seleccionado, brazos articulados, espigas y parasoles o kits de filtros.
  - *Outdoor* aporta espigas, paraguas y fundas de lluvia CapIt.
  - Los escenarios *Vehicle* y *Steadicam* incluyen montajes, brazos de aislamiento y ventosas cuando corresponde.
- Las selecciones de óptica aportan diámetro frontal, peso, datos de varillas y enfoque mínimo, añaden soportes de lente y adaptadores de matte box y avisan de estándares incompatibles.
- Las filas de baterías reflejan los cálculos del módulo de potencia e incluyen placas o dispositivos de hotswap cuando son necesarios.
- Las preferencias de monitorización asignan monitores predeterminados para cada rol (director, DoP, foco, etc.) con juegos de cables y receptores inalámbricos.
- El formulario de **Requisitos del proyecto** nutre la lista:
  - **Nombre del proyecto**, **productora**, **casa de alquiler** y **DoP** aparecen en el encabezado de los requisitos impresos.
  - Las entradas de **equipo** recogen nombres, roles y correos electrónicos para que la información de contacto acompañe al proyecto.
  - **Días de preparación** y **días de rodaje** aportan notas de calendario y, combinados con escenarios exteriores, proponen equipo para la climatología.
  - Los **escenarios obligatorios** añaden rigging, gimbals y protección climática adecuada.
  - **Empuñadura de cámara** y **extensión de visor** incluyen las piezas o soportes seleccionados.
  - Las opciones de **matte box** y **filtros** agregan el sistema elegido con bandejas, adaptadores de pinza o filtros necesarios.
  - Las configuraciones de **monitorización**, **distribución de vídeo** y **visor** añaden monitores, cables y overlays para cada rol.
  - Las selecciones de **botones de usuario** y **preferencias de trípode** se listan para referencia rápida.
- Los elementos de cada categoría se ordenan alfabéticamente y muestran descripciones emergentes al pasar el cursor.
- La lista de equipo se incluye en las vistas imprimibles y en los archivos de proyecto exportados.
- Las listas de equipo se guardan automáticamente con el proyecto y se incluyen tanto en los archivos exportados como en las copias de seguridad.
- **Eliminar lista de equipo** borra la lista guardada y oculta la salida.
- Los formularios incluyen botones de bifurcación para duplicar entradas personalizadas al instante.

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
- Autonomía estimada en horas usando la media ponderada de la comunidad
- Número de baterías necesario para un rodaje de 10 h
- Nota de temperatura para ajustar la autonomía en condiciones extremas

### 🔋 Comprobación de entrega de batería
- Avisa si la corriente demandada supera la salida de la batería (pin o D‑Tap)
- Indica cuando el consumo se acerca al límite (80 % de uso)

### 📊 Comparación de baterías (opcional)
- Compara estimaciones de autonomía entre todas las baterías
- Gráficos de barras para consulta rápida

### 🖼 Diagrama del proyecto
- Visualiza las conexiones de alimentación y vídeo de los dispositivos seleccionados
- Advierte cuando las marcas FIZ son incompatibles
- Arrastra nodos para reorganizar el esquema, usa los botones de zoom y exporta el diagrama como SVG o JPG
- Mantén pulsada Mayús al descargar para exportar una instantánea JPG en lugar de un SVG
- Pasa el cursor o toca los dispositivos para ver detalles emergentes
- Utiliza iconos OpenMoji cuando hay conexión, con emoji como alternativa: 🔋 batería, 🎥 cámara, 🖥️ monitor, 📡 vídeo, ⚙️ motor, 🎮 controlador, 📐 distancia, 🎮 empuñadura y 🔌 placa de batería

### 🧮 Ponderación de datos de autonomía
- Los tiempos enviados por la comunidad refinan la estimación
- Cada registro se ajusta por temperatura, escalando desde ×1 a 25 °C hasta:
  - ×1,25 a 0 °C
  - ×1,6 a −10 °C
  - ×2 a −20 °C
- Los ajustes de cámara influyen en el peso:
  - Multiplicadores de resolución: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; resoluciones menores se escalan a 1080p
  - La frecuencia de cuadro escala linealmente desde 24 fps (por ejemplo, 48 fps = ×2)
  - Wi‑Fi activado suma un 10 %
  - Factores de códec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7
  - Las entradas de monitores por debajo del brillo especificado se ponderan según su relación de brillo
- El peso final refleja la cuota de consumo de cada dispositivo, de modo que los proyectos similares cuentan más
- Se usa la media ponderada cuando hay al menos tres entradas disponibles
- Un panel ordena los registros por peso y muestra el porcentaje de cada uno para compararlos al instante

### 🔍 Búsqueda y filtrado
- Escribe en los menús desplegables para encontrar entradas rápidamente
- Filtra las listas de dispositivos con un cuadro de búsqueda
- Utiliza la barra de búsqueda global en la parte superior para saltar a funciones, dispositivos o temas de ayuda; pulsa Enter para navegar, usa / o Ctrl+K (⌘K en macOS) para enfocarla y pulsa Escape o × para limpiar
- Pulsa “/” o Ctrl+F (⌘F en macOS) para enfocar al instante el cuadro de búsqueda más cercano
- Haz clic en la estrella junto a cualquier selector para fijar favoritos y sincronizarlos con las copias de seguridad

### 🛠 Editor de la base de datos
- Añade, edita o elimina dispositivos en todas las categorías
- Importa o exporta la base completa como JSON
- Vuelve a la base predeterminada de `src/data/index.js`

### 🌓 Modo oscuro
- Actívalo con el botón de la luna junto al selector de idioma
- La preferencia se guarda en tu navegador

### 🦄 Modo rosa
- Haz clic en el botón del unicornio (el modo rosa rota iconos cada 30 segundos con una animación suave y vuelve al caballo cuando sales) o pulsa **P** para activar un acento rosa lúdico
- Funciona en los temas claro y oscuro y persiste entre visitas

### ⚫ Modo de alto contraste
- Activa un tema de alto contraste para mejorar la legibilidad

### 📝 Comentarios de autonomía
- Haz clic en <strong>Enviar comentarios de autonomía</strong> debajo de la estimación para añadir tu medición
- Incluye la temperatura para obtener una ponderación más precisa
- Las entradas se guardan en tu navegador y mejoran estimaciones futuras
- Un panel dedicado ordena los envíos por peso, muestra porcentajes de contribución y resalta valores atípicos para analizarlos rápidamente

### ❓ Ayuda con búsqueda
- Ábrela mediante el botón <strong>?</strong> o pulsa <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> o <kbd>Ctrl+/</kbd>
- Usa el campo de búsqueda para filtrar temas al instante; la consulta se restablece al cerrar el diálogo
- Cierra con <kbd>Escape</kbd> o haciendo clic fuera del diálogo

---

## ▶️ Cómo usarlo
1. **Inicia la aplicación:** abre `index.html` en cualquier navegador moderno; no necesita servidor.
2. **Explora la barra superior:** cambia de idioma, alterna los temas oscuro o rosa, abre Ajustes para modificar acento y tipografía y lanza la ayuda con ? o Ctrl+/.
3. **Selecciona los dispositivos:** elige el equipo de cada categoría en los menús desplegables; escribe para filtrar, fija favoritos con la estrella y deja que los escenarios rellenen los accesorios automáticamente.
4. **Consulta los cálculos:** verás consumo, corriente y autonomía en cuanto elijas una batería; las alertas señalan cuando se superan los límites.
5. **Guarda y exporta proyectos:** pon nombre y guarda la configuración, las copias automáticas capturan instantáneas y el botón Exportar descarga un paquete JSON mientras Importar lo restaura.
6. **Genera listas de equipo:** pulsa **Generar lista de equipo** para convertir los requisitos en una lista categorizada con descripciones y accesorios.
7. **Gestiona los datos de dispositivos:** haz clic en “Editar datos de dispositivos…” para abrir el editor, ajustar el catálogo, exportar/importar JSON o volver a los valores predeterminados.
8. **Envía comentarios de autonomía:** usa “Enviar comentarios de autonomía” para registrar mediciones reales y refinar los promedios ponderados.

## 📱 Instalar como aplicación

Cine Power Planner es una aplicación web progresiva y puede instalarse directamente desde el navegador:

- **Chrome/Edge (escritorio):** haz clic en el icono de instalación de la barra de direcciones.
- **Android:** abre el menú del navegador y elige *Añadir a pantalla de inicio*.
- **iOS/iPadOS Safari:** toca *Compartir* y selecciona *Añadir a pantalla de inicio*.

Una vez instalada, la aplicación se abre desde la pantalla de inicio, funciona sin conexión y se actualiza automáticamente.

## 📡 Uso sin conexión y almacenamiento

Servir la aplicación mediante HTTP(S) instala un service worker que almacena en caché cada archivo, de modo que Cine Power Planner funciona completamente sin conexión y se actualiza en segundo plano. Los proyectos, los comentarios de autonomía y las preferencias (idioma, tema, modo rosa y listas guardadas) se almacenan en el `localStorage` del navegador. Borrar los datos del sitio elimina toda la información, y el cuadro de Ajustes incluye un flujo de **Restablecimiento de fábrica** que guarda automáticamente una copia antes de efectuar la limpieza. La cabecera muestra un indicador sin conexión cuando la red falla y la acción 🔄 **Forzar recarga** actualiza los recursos en caché sin tocar los proyectos guardados.

---

## 🗂️ Estructura de archivos
```bash
index.html                 # Estructura principal en HTML
src/styles/style.css       # Estilos base y diseño
src/styles/overview.css    # Estilos de la vista general
src/styles/overview-print.css # Ajustes de impresión para la vista general
src/scripts/script.js        # Lógica de la aplicación
src/scripts/storage.js       # Utilidades para LocalStorage
src/scripts/static-theme.js  # Lógica de tema compartida para las páginas legales
src/data/index.js       # Lista predeterminada de dispositivos
src/data/devices/       # Catálogos de dispositivos por categoría
src/data/schema.json    # Esquema generado para los selectores
src/vendor/             # Bibliotecas de terceros incluidas
legal/                     # Documentación legal sin conexión
tools/                     # Scripts de mantenimiento de datos
tests/                     # Suite de pruebas con Jest
```
Las fuentes se incluyen localmente mediante `fonts.css`; una vez en caché, la aplicación funciona completamente sin conexión.

## 🛠️ Desarrollo
Se requiere Node.js 18 o posterior.

```bash
npm install
npm run lint     # ejecuta solo ESLint
npm test         # realiza linting, comprobaciones de datos y pruebas de Jest
```

Tras editar los datos de dispositivos, regenera la base normalizada:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Añade `--help` a cualquiera de los scripts anteriores para ver las opciones disponibles.

Ejecuta `npm run help` para obtener un recordatorio rápido de los scripts de mantenimiento y del orden recomendado.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Abre una incidencia o envía un pull request. Si informas de correcciones de datos, adjuntar copias de seguridad o mediciones de autonomía ayuda a mantener el catálogo fiable para todos.
