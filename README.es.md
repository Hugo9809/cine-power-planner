# Cine Power Planner

![Icono de Cine Power Planner](icon.svg)

Cine Power Planner es una aplicación web independiente para planificar rigs de cámara profesionales alimentados con baterías V‑Mount, B‑Mount o Gold‑Mount. Calcula el consumo total de energía, comprueba que las baterías puedan suministrar la corriente necesaria y estima cuánto tiempo podrá funcionar tu proyecto. La herramienta se ejecuta íntegramente en el navegador y también funciona sin conexión.

No necesitas compilar nada: abre `index.html` en tu navegador y empieza a planificar al instante. Si sirves el repositorio a través de HTTP(S) se instala un *service worker* que permite trabajar sin conexión en visitas futuras y obtener actualizaciones automáticamente.

## Tabla de contenidos

- [Traducciones](#traducciones)
- [Novedades recientes](#novedades-recientes)
- [Funciones destacadas](#funciones-destacadas)
- [Guía rápida](#guía-rápida)
- [Descripción de la interfaz](#descripción-de-la-interfaz)
- [Personalización y accesibilidad](#personalización-y-accesibilidad)
- [Lista de equipo](#lista-de-equipo)
- [Ponderación de datos de autonomía](#ponderación-de-datos-de-autonomía)
- [Copias de seguridad y recuperación](#copias-de-seguridad-y-recuperación)
- [Instalar como aplicación](#instalar-como-aplicación)
- [Uso sin conexión y almacenamiento de datos](#uso-sin-conexión-y-almacenamiento-de-datos)
- [Compatibilidad con navegadores](#compatibilidad-con-navegadores)
- [Desarrollo](#desarrollo)
- [Comentarios y soporte](#comentarios-y-soporte)
- [Contribuir](#contribuir)
- [Agradecimientos](#agradecimientos)
- [Licencia](#licencia)

## Traducciones

La documentación está disponible en varios idiomas. La aplicación detecta el idioma de tu navegador en la primera visita y puedes cambiarlo desde la esquina superior derecha:

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 Español
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Se agradecen contribuciones en idiomas adicionales. Para añadir una traducción, incluye un archivo `README.<lang>.md` y las cadenas de texto necesarias en tu *pull request*.

## Novedades recientes

- **Controles de acento y tipografía**: ajusta el color de acento, el tamaño base de la fuente y la familia tipográfica desde Ajustes; los temas oscuro, rosa y de alto contraste siguen disponibles en cada visita.
- **Atajo para la búsqueda global**: pulsa Ctrl+K (⌘K en macOS) para enfocar la búsqueda de funciones al instante, incluso cuando esté dentro del menú lateral móvil plegado.
- **Botón de recarga forzada**: elimina los archivos en caché del *service worker* y actualiza la aplicación sin conexión sin borrar proyectos o dispositivos guardados.
- **Favoritos fijados**: marca con una estrella los elementos de los desplegables para mantener cámaras, baterías y accesorios habituales en la parte superior de cada selector e incluirlos en las copias de seguridad.
- **Borrar caché local**: vacía con un clic los proyectos almacenados y la configuración.
- **Nombre del proyecto en la lista de equipo**: las vistas imprimibles y la tabla de equipo ahora muestran el nombre del proyecto.
- **Logo personalizado para impresión**: sube un logotipo que aparecerá en los resúmenes imprimibles y en las copias de seguridad.
- **Favoritos en las copias de seguridad**: los favoritos se guardan y, antes de restaurar datos, se genera automáticamente una copia de seguridad.
- **Campo de correo para el equipo**: registra direcciones de correo electrónico para cada miembro del equipo.
- **Modo de alto contraste**: activa un tema de alto contraste para mejorar la legibilidad.
- **Formularios de dispositivos dinámicos**: los campos de categoría se completan automáticamente a partir del esquema en los formularios de nuevos dispositivos.
- **Interfaz renovada**: un diseño más limpio y con mejor contraste facilita el uso del planificador en escritorio y dispositivos móviles.
- **Compartir proyectos simplificado**: descarga un único archivo JSON que incluye selecciones, requisitos, listas de equipo, comentarios de autonomía y dispositivos personalizados; cárgalo para restaurar toda la configuración.
- **Iconos únicos para escenarios requeridos**: cada escenario requerido muestra su propio icono para reconocerlo de un vistazo.
- **Ventanas del diagrama persistentes en pantallas táctiles**: al pulsar un nodo en dispositivos táctiles, su ventana emergente permanece visible hasta seleccionar otro nodo.
- **Diagrama interactivo del proyecto**: arrastra dispositivos, haz zoom, ajusta los nodos a una cuadrícula y exporta el diseño como SVG o JPG.
- **Tema rosa**: activa un resaltado rosa divertido que persiste entre visitas o pulsa **P** para cambiarlo rápidamente.
- **Diálogo de ayuda con búsqueda y pistas flotantes**: ábrelo con ?, H, F1 o Ctrl+/ (incluso mientras escribes), filtra temas al instante, pulsa / o Ctrl+F para saltar a la caja de búsqueda, consulta la FAQ integrada y pasa el cursor por cualquier botón, campo, desplegable o encabezado para ver una explicación.
- **Desplegables con búsqueda por teclado**: filtra rápidamente las listas de dispositivos escribiendo directamente en cualquier selector.
- **Compatibilidad multisoporte**: en las cámaras compatibles elige entre placas V‑, B‑ o Gold‑Mount y la lista de baterías se actualiza automáticamente.
- **Comentarios de autonomía de usuarios**: envía resultados reales de autonomía con detalles del entorno para mejorar las estimaciones.
- **Panel visual de ponderación de autonomías**: observa cómo la temperatura, la resolución, la frecuencia de imagen y el códec influyen en cada informe, ordenados por peso con porcentajes exactos.
- **Generador de listas de equipo**: compila con un clic el equipo seleccionado y los requisitos del proyecto.
- **Guardado rápido de proyectos**: pulsa Intro o Ctrl+S (⌘S en macOS) para guardar un proyecto; el botón Guardar permanece deshabilitado hasta introducir un nombre.
- **Guardado de requisitos del proyecto**: almacena los requisitos junto con cada proyecto para que las listas de equipo conserven todo el contexto.
- **Duplicación de entradas personalizadas**: los formularios de la lista de equipo incluyen botones de bifurcación para copiar campos al instante.

Consulta los README específicos de cada idioma para obtener detalles completos.

## Funciones destacadas

- Calcula el consumo total de energía, la corriente a 14,4 V (33,6 V para B‑Mount) y 12 V (21,6 V para B‑Mount), y la autonomía estimada de la batería.
- Combina autonomías enviadas por usuarios mediante medias ponderadas que tienen en cuenta temperatura, resolución, frecuencia de imagen, códec y la participación de cada dispositivo en el consumo total.
- Avisa cuando las baterías seleccionadas no pueden suministrar la corriente necesaria y muestra cuántas necesitas para un rodaje de 10 h (incluyendo un repuesto).
- Guarda, crea copias de seguridad automáticas, comparte, restaura y borra proyectos (con requisitos incluidos); genera vistas imprimibles y paquetes JSON compartibles con dispositivos personalizados y comentarios de autonomía.
- Compara autonomías entre todas las baterías compatibles mediante el panel opcional de comparación.
- Visualiza conexiones de alimentación y vídeo con un diagrama interactivo: arrastra, haz zoom, ajusta a la cuadrícula y exporta como SVG o mantén pulsado Shift al descargar para obtener un JPG.
- Genera listas de equipo detalladas que amplían los requisitos del proyecto en tablas categorizadas, combinan duplicados por cantidad y ofrecen información sobre peso y dimensiones.
- Personaliza la base de datos con tu propio equipo, impórtala o expórtala en JSON y vuelve a los valores predeterminados cuando quieras.
- Accede rápidamente a funciones, selectores o temas de ayuda con la búsqueda global, fija favoritos para destacar dispositivos clave y escribe en los desplegables para filtrar al instante.
- Ajusta la interfaz con detección de idioma, modos oscuro o rosa, modo de alto contraste, controles de color de acento y tipografía, todo almacenado localmente.
- Funciona completamente sin conexión con un *service worker*, almacenamiento persistente y un botón de recarga forzada para actualizar los recursos en caché sin perder datos.

## Guía rápida

1. Descarga o clona este repositorio.
2. Abre `index.html` en un navegador moderno.
3. (Opcional) Sirve la carpeta vía HTTP para habilitar el *service worker* y las funciones PWA:
   ```bash
   npx http-server
   # o
   python -m http.server
   ```
   La aplicación funcionará completamente sin conexión y se actualizará automáticamente.

## Descripción de la interfaz

### Controles de la barra superior

- Un enlace para saltar al contenido, un indicador de modo sin conexión y una identidad adaptable mantienen la accesibilidad en cualquier dispositivo; la insignia offline aparece cuando el navegador pierde la conexión.
- La barra de búsqueda global permite saltar a funciones, selectores o temas de ayuda: pulsa Intro para ir al resultado destacado, usa Ctrl+K (⌘K en macOS) para enfocarla desde cualquier lugar (en pantallas pequeñas se abre automáticamente el menú lateral) y pulsa × para borrar la búsqueda.
- Los controles de idioma, modo oscuro y modo rosa se sitúan junto al diálogo de Ajustes, que ofrece color de acento, tamaño de fuente, familia tipográfica, alto contraste y carga de logos personalizados, además de herramientas de copia de seguridad, restauración y borrado de caché local.
- El botón de Ayuda abre un diálogo con búsqueda, pasos guiados, atajos de teclado, FAQ y un modo de ayuda contextual al pasar el cursor; también puedes abrirlo con ?, H, F1 o Ctrl+/ incluso mientras escribes.
- El botón de recarga forzada (🔄) elimina los archivos del *service worker* en caché y actualiza la aplicación sin conexión sin borrar proyectos ni dispositivos guardados.

### Navegación y búsqueda

- En pantallas pequeñas, un menú lateral plegable replica las secciones principales para navegar rápidamente.
- Cada desplegable y lista del editor incluye un cuadro de búsqueda integrado y admite escritura directa para filtrar; al pulsar / o Ctrl+F (⌘F en macOS) se enfoca el campo de búsqueda más cercano.
- Los iconos de estrella junto a cada selector permiten fijar dispositivos favoritos para mantenerlos en la parte superior y conservarlos entre sesiones.

## Personalización y accesibilidad

- Las preferencias de tema incluyen modo oscuro, un acento rosa divertido y un interruptor de alto contraste para mejorar la legibilidad.
- Puedes personalizar el color de acento, el tamaño base de la fuente y la tipografía desde Ajustes; los cambios se aplican al instante y se recuerdan junto con las demás preferencias.
- Un enlace para saltar a contenido, controles con estado de foco visible, indicador de modo sin conexión y un diseño adaptable mejoran la navegación en ordenadores, tabletas y móviles.
- Los atajos de teclado integrados cubren la búsqueda global (Ctrl+K/⌘K), la ayuda (?, H, F1, Ctrl+/), el guardado (Intro o Ctrl+S/⌘S), el modo oscuro (D) y el modo rosa (P).
- El modo de ayuda contextual convierte cada botón, campo, desplegable y encabezado en un tooltip bajo demanda para que los usuarios nuevos aprendan la interfaz rápidamente.

## Lista de equipo

El generador amplía tus selecciones en una tabla de equipamiento detallada:

- Haz clic en **Generar lista de equipo** para combinar el equipo elegido y los requisitos del proyecto en una tabla categorizada.
- La lista se actualiza automáticamente cuando cambian las selecciones de dispositivos o los detalles del proyecto.
- Las entradas se agrupan por categoría (cámara, óptica, alimentación, monitorización, rigging, grip, consumibles, etc.) y los duplicados se agrupan con su cantidad.
- Se añaden automáticamente cables, rigging y accesorios necesarios para monitores, motores, gimbals, escenarios climáticos y configuraciones especiales.
- Las selecciones de escenarios inyectan el equipo correspondiente (por ejemplo, *Handheld* + *Easyrig* añade un mango telescópico; *Gimbal* incluye el gimbal seleccionado, brazos de fricción y parasoles; *Outdoor* añade espigas, paraguas y cubiertas CapIt; *Vehicle* y *Steadicam* incorporan monturas, brazos de aislamiento y sistemas de succión según corresponda).
- Las elecciones de óptica incluyen diámetro frontal, peso, distancia mínima y requisitos de barras, añaden soportes de lentes y componentes de matte box con advertencias para estándares incompatibles.
- Las filas de baterías reflejan los recuentos del calculador de potencia e incluyen una placa de *hotswap* o el dispositivo elegido cuando es necesario.
- Las preferencias de monitorización asignan monitores predeterminados para cada rol y agrupan juegos de cables para cada pantalla.
- El formulario de **Requisitos del proyecto** alimenta la lista:
  - **Nombre del proyecto**, **productora**, **casa de alquiler** y **DoP** aparecen en el encabezado del resumen impreso.
  - Las entradas de **equipo** capturan nombres, roles y direcciones de correo electrónico para mantener los contactos con el proyecto.
  - **Días de preparación** y **días de rodaje** aportan notas de calendario y, junto con escenarios exteriores, recomiendan equipo para el clima.
  - **Escenarios requeridos** añaden el rigging, gimbals y protección meteorológica correspondientes.
  - **Empuñadura de cámara** y **extensión de visor** insertan las piezas seleccionadas.
  - Las opciones de **matte box** y **filtros** incluyen el sistema elegido junto con bandejas, adaptadores o filtros necesarios.
  - Las configuraciones de **monitorización**, **distribución de vídeo** y **visor** añaden monitores, cables y receptores para cada rol.
  - Las selecciones de **botones de usuario** y **preferencias de trípode** se listan para consulta rápida.
- Los elementos se ordenan alfabéticamente dentro de cada categoría y muestran un tooltip al pasar el cursor.
- La lista de equipo aparece en las vistas imprimibles y en los archivos de proyectos compartidos, de modo que los colaboradores ven todo el contexto.
- **Guardar lista de equipo** almacena la tabla actual con el proyecto.
- **Eliminar lista de equipo** borra la lista guardada y oculta la salida.
- Los formularios de la lista utilizan botones de bifurcación para duplicar las entradas personalizadas al instante.

## Ponderación de datos de autonomía

Las autonomías enviadas por usuarios se combinan mediante una media ponderada para adaptarse mejor a tu proyecto:

- Cada entrada se ajusta por temperatura, pasando de ×1 a 25 °C a ×1,25 a 0 °C, ×1,6 a −10 °C y ×2 a −20 °C.
- Multiplicadores de resolución: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1 y valores inferiores escalados respecto a 1080p.
- La frecuencia de imagen escala de forma lineal desde 24 fps (por ejemplo, 48 fps = ×2).
- Activar Wi‑Fi añade un 10 % al peso.
- Factores por códec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
- Las entradas de monitor con un brillo inferior al especificado se ponderan en función del porcentaje de brillo.
- El peso final refleja la aportación de cada dispositivo (cámara, monitor y accesorios) al consumo total para que los rigs similares cuenten más.
- Un panel dedicado ordena las entradas por peso y muestra el porcentaje que aporta cada informe.

## Copias de seguridad y recuperación

Cine Power Planner protege tus proyectos frente a pérdidas de datos y ofrece controles manuales para exportar tu trabajo:

- **Instantáneas de proyectos guardados**: el selector de proyectos conserva cada configuración guardada y crea entradas con sello horario `auto-backup-…` cada 10 minutos mientras la aplicación está abierta. Estas instantáneas aparecen al final de la lista para volver a un estado anterior sin sobrescribir el proyecto activo.
- **Copias de seguridad completas**: abre **Ajustes → Copia de seguridad y restauración** y pulsa **Copia de seguridad** para descargar `planner-backup.json`. El archivo incluye proyectos guardados, dispositivos personalizados, estado de la sesión, comentarios de autonomía y favoritos mediante la rutina interna `exportAllData()`. Al restaurar el archivo se guarda automáticamente una copia de seguridad de los datos actuales antes de importar la nueva configuración y se muestra un aviso si se creó con otra versión de la aplicación.
- **Borrar caché local**: en **Ajustes → Copia de seguridad y restauración** puedes eliminar con un clic proyectos guardados, equipo personalizado, favoritos y comentarios de autonomía cuando necesites empezar de cero.
- **Recordatorios periódicos**: mientras la aplicación está abierta, un proceso en segundo plano genera cada hora la misma copia de seguridad para recordarte que descargues y archives tus datos.

## Instalar como aplicación

Cine Power Planner es una aplicación web progresiva (*Progressive Web App*) y puede instalarse para acceder rápidamente:

1. Abre `index.html` en un navegador compatible.
2. Usa la opción **Instalar** o **Añadir a la pantalla de inicio** del navegador.
   - **Chrome/Edge (escritorio)**: haz clic en el icono de instalación de la barra de direcciones.
   - **Android**: abre el menú del navegador y elige *Añadir a la pantalla de inicio*.
   - **iOS Safari**: pulsa el icono de compartir y selecciona *Añadir a la pantalla de inicio*.
3. Abre la aplicación desde tu lista de aplicaciones. La versión instalada funciona sin conexión y se actualiza automáticamente.

## Uso sin conexión y almacenamiento de datos

Cuando se sirve a través de HTTP(S), Cine Power Planner instala un *service worker* que almacena en caché todos los archivos para que la aplicación funcione completamente sin conexión y obtenga actualizaciones en segundo plano. Los proyectos, los envíos de autonomía y las preferencias (idioma, tema, modo rosa y listas de equipo guardadas) se almacenan localmente en el `localStorage` del navegador. Si borras los datos del sitio en el navegador se eliminará toda la información guardada, y el diálogo de Ajustes incluye un botón **Borrar caché local** para restablecer todo con un solo clic cuando necesites empezar de nuevo. Consulta [Copias de seguridad y recuperación](#copias-de-seguridad-y-recuperación) para obtener consejos sobre cómo proteger tus datos.

## Compatibilidad con navegadores

Cine Power Planner utiliza APIs web modernas y se prueba en las versiones actuales de Chrome, Firefox, Edge y Safari. Algunos navegadores antiguos pueden carecer de funciones como la instalación o la caché sin conexión. Para disfrutar de la mejor experiencia, usa un navegador con capacidades PWA actualizadas.

## Desarrollo

Configura el entorno con Node.js 18 o superior. Tras clonar el repositorio ejecuta `npm install` una vez y utiliza `npm test` para lanzar ESLint, las comprobaciones de coherencia de datos y las pruebas de Jest mientras iteras sobre los cambios.

Después de clonar el repositorio puedes inspeccionar o modificar el código.

### Estructura de archivos

```
index.html       # Maquetación HTML principal
style.css        # Estilos y diseño
script.js        # Lógica de la aplicación
devices/         # Listas de dispositivos predeterminadas por categoría
storage.js       # Utilidades de LocalStorage
README.*.md      # Documentación en varios idiomas
checkConsistency.js  # Valida los datos de los dispositivos
normalizeData.js     # Limpia y homogeneiza las entradas
generateSchema.js    # Regenera schema.json a partir de los datos
unifyPorts.js        # Unifica nombres de conectores
tests/               # Suite de pruebas con Jest
```

### Instalar dependencias y ejecutar pruebas

Requiere Node.js 18 o posterior.

```bash
npm install
npm run lint     # Ejecuta solo ESLint
npm test
```

`npm run lint` ejecuta ESLint sin lanzar pruebas. El comando `npm test` ejecuta ESLint, las comprobaciones de coherencia de datos y las pruebas de Jest.

### Actualizar datos de dispositivos

Las definiciones de dispositivos se encuentran en los archivos del directorio `devices/`. Tras modificarlos, ejecuta los siguientes scripts para limpiar, verificar y regenerar la base de datos:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` aplica tareas de limpieza para unificar conectores y expandir abreviaturas. `npm run unify-ports` estandariza las etiquetas de conectores y puertos. `npm run check-consistency` confirma que todos los campos obligatorios están presentes y genera un error si falta algo. Por último, `npm run generate-schema` reconstruye `schema.json` con los datos actuales.

Añade `--help` a cualquiera de los comandos anteriores para ver la ayuda detallada, por ejemplo:

```bash
npm run normalize -- --help
```

## Comentarios y soporte

Si encuentras problemas, tienes dudas o quieres sugerir nuevas funciones, abre una *issue* en GitHub. Los comentarios de la comunidad ayudan a mejorar el planificador para todos.

## Contribuir

¡Las contribuciones son bienvenidas! Abre una *issue* o envía una *pull request* en GitHub. Antes de enviar cambios, ejecuta `npm test` para asegurarte de que el lint, las comprobaciones de datos y las pruebas unitarias se ejecutan correctamente.

## Agradecimientos

El planificador utiliza el conjunto de iconos [OpenMoji](https://openmoji.org/) cuando hay conexión y se apoya en [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) para almacenar proyectos en URLs de forma compacta.

## Licencia

Distribuido bajo la licencia ISC. Consulta `package.json` para más detalles.
