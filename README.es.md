# Cine Power Planner

![Icono de Cine Power Planner](src/icons/app-icon.svg)

Cine Power Planner es una aplicación web independiente para crear, auditar y compartir planes de alimentación profesional que nunca abandonan tu equipo. Diseña rigs V‑Mount, B‑Mount o Gold-Mount, modela tiempos de autonomía, documenta requisitos del proyecto y exporta paquetes compartibles, todo dentro del navegador, incluso sin conexión. Cada dependencia vive en este repositorio para que la experiencia sea idéntica en un estudio, un portátil de rodaje o un disco aislado.

## De un vistazo

- **Planifica sin conexión.** Construye configuraciones V‑Mount, B‑Mount o Gold-Mount directamente en el navegador. Todos los Uicons, fuentes y scripts auxiliares están incluidos, sin depender de CDNs ni de la red. Clona el repositorio, desconecta el cable y la interfaz seguirá funcionando igual.
- **Mantén los datos en el dispositivo.** Proyectos, comentarios de autonomía, favoritos, equipos personalizados, listas y ajustes permanecen locales. Las copias de seguridad y los paquetes compartibles son archivos JSON legibles.
- **Pon a prueba las redes de seguridad.** Guardados manuales, auto-guardados en segundo plano y copias automáticas con sello horario se combinan para que practiques la rutina Guardar → Copia → Paquete → Restaurar desde el primer día.
- **Aprueba actualizaciones a conciencia.** El service worker espera tu confirmación antes de actualizar, de modo que el equipo se mantiene en una versión auditada incluso durante viajes o con conectividad limitada.

## Panorama general

### Construido para equipos

El planner se diseñó para foquistas, data wranglers y directores de fotografía. Cuando añades cuerpos, placas de batería, enlaces inalámbricos o accesorios, el consumo total y las estimaciones de autonomía se actualizan al instante. Las advertencias señalan packs sobrecargados y las listas de equipos permanecen ligadas al contexto del proyecto para que nada se pierda al compartir el plan.

### Listo para viajar

Abre `index.html` directamente desde disco o aloja el repositorio en tu red interna, sin builds, servidores ni cuentas. Un service worker mantiene la aplicación disponible offline, recuerda las preferencias y sólo se actualiza cuando lo autorizas. Guardar, compartir, importar, respaldar y restaurar siempre se ejecutan localmente, protegiendo los datos.

### Por qué importa el enfoque offline-first

Los rodajes raramente tienen conectividad garantizada y muchos estudios exigen herramientas desconectadas. Cine Power Planner ofrece las mismas capacidades con o sin red: todos los recursos están empaquetados, cada flujo funciona localmente y cada guardado genera artefactos que puedes archivar en medios redundantes. Practicar estos flujos antes de filmar forma parte de la lista de comprobación para no depender de servicios externos en pleno rodaje.

### Pilares de funciones

- **Planifica con confianza.** Calcula la demanda a 14,4 V/12 V (y 33,6 V/21,6 V para B‑Mount), compara baterías compatibles y visualiza el impacto en un panel ponderado de retroalimentación.
- **Mantente listo para producción.** Los proyectos capturan dispositivos, requisitos, escenarios, detalles de equipo y listas; los auto-backups, paquetes y actualizaciones controladas mantienen la información vigente sin perder estabilidad.
- **Trabaja como prefieras.** Detección de idioma, temas oscuro, rosa y de alto contraste, controles tipográficos, logotipos personalizados y ayuda contextual hacen que la interfaz sea cómoda en rodajes y en preparación. La ayuda contextual ahora completa automáticamente descripciones para cada botón, campo y menú, de modo que cada control se explica por sí mismo incluso sin conexión.

## Principios clave

- **Siempre offline.** Toda la aplicación, incluidos iconos, páginas legales y herramientas, vive en el repositorio. Abre `index.html` desde disco o una intranet y el service worker sincroniza los recursos sin obligarte a conectarte.
- **Sin rutas ocultas de datos.** Guardados, paquetes, importaciones, copias de seguridad y restauraciones suceden íntegramente en el navegador. Nada sale del equipo a menos que lo exportes.
- **Redes redundantes.** Guardados manuales, auto-guardados en segundo plano, copias periódicas, respaldos previos a la restauración y exportaciones legibles garantizan que ningún dato desaparezca.
- **Actualizaciones previsibles.** Sólo se aplican cuando tú las activas. Las versiones en caché siguen disponibles hasta que confirmas **Forzar recarga**.
- **Presentación consistente.** Uicons locales, recursos OpenMoji y tipografías integradas aseguran la misma apariencia en un estudio o en un portátil desconectado.
- **Proteger cada cambio.** Antes de cualquier restauración, el planner genera una copia de seguridad forzada y conserva las revisiones anteriores para que ninguna importación sobrescriba tu trabajo. Los registros de verificación y las notas de checksum acompañan a cada archivo para demostrar la integridad incluso sin conexión.

## Tabla de contenidos

- [De un vistazo](#de-un-vistazo)
- [Panorama general](#panorama-general)
- [Principios clave](#principios-clave)
- [Traducciones](#traducciones)
- [Novedades](#novedades)
- [Guía rápida](#guía-rápida)
- [Requisitos del sistema y navegadores](#requisitos-del-sistema-y-navegadores)
- [Ensayo de guardado, compartido e importación](#ensayo-de-guardado-compartido-e-importación)
- [Flujo cotidiano](#flujo-cotidiano)
- [Gestión de proyectos y guardados](#gestión-de-proyectos-y-guardados)
- [Compartir e importar](#compartir-e-importar)
- [Formatos de archivos](#formatos-de-archivos)
- [Recorrido por la interfaz](#recorrido-por-la-interfaz)
- [Personalización y accesibilidad](#personalización-y-accesibilidad)
- [Seguridad de datos y operación offline](#seguridad-de-datos-y-operación-offline)
- [Resumen de datos y almacenamiento](#resumen-de-datos-y-almacenamiento)
- [Cuotas y mantenimiento](#cuotas-y-mantenimiento)
- [Copias de seguridad y recuperación](#copias-de-seguridad-y-recuperación)
- [Ensayos de integridad](#ensayos-de-integridad)
- [Listas operativas](#listas-operativas)
- [Plan de recuperación de emergencia](#plan-de-recuperación-de-emergencia)
- [Listas de equipo e informes](#listas-de-equipo-e-informes)
- [Reglas automáticas](#reglas-automáticas)
- [Inteligencia de autonomía](#inteligencia-de-autonomía)
- [Atajos de teclado](#atajos-de-teclado)
- [Localización](#localización)
- [Instalación como app](#instalación-como-app)
- [Flujo de datos de dispositivos](#flujo-de-datos-de-dispositivos)
- [Desarrollo](#desarrollo)
- [Resolución de problemas](#resolución-de-problemas)
- [Comentarios y soporte](#comentarios-y-soporte)
- [Contribuir](#contribuir)
- [Agradecimientos](#agradecimientos)
- [Licencia](#licencia)

## Traducciones

La documentación está disponible en varios idiomas. La aplicación detecta automáticamente el idioma del navegador al primer inicio y puedes cambiarlo en cualquier momento desde el menú superior derecho o en **Configuración**.

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Consulta `docs/translation-guide.md` para más detalles sobre la localización.

## Novedades

- **Comparación de copias de seguridad** – Selecciona guardados manuales o auto-backups, revisa diferencias, añade notas de incidente y exporta un registro antes de revertir cambios o entregar material a postproducción.
- **Ensayos de restauración** – Carga copias completas o paquetes de proyectos en un entorno aislado para comprobar su contenido sin tocar perfiles de producción.
- **Registro de diagnósticos** – Abre **Configuración → Datos y almacenamiento** para ver el log en vivo, filtrar por nivel o namespace y ajustar retención, reflejo en consola y captura de errores sin salir del planner.
- **Libro de historial de copias** – Cada descarga de copia completa registra su marca de tiempo y nombre de archivo localmente. Revísalo en **Configuración → Datos y almacenamiento** o exporta el registro junto con tus archivos para demostrar retención sin conexión.
- **Reglas automáticas de equipo** – Define añadidos o retiradas activados por escenarios, con controles de importación/exportación y copias temporizadas.
- **Panel de cobertura de reglas** – Resume la cobertura por escenario, los disparadores duplicados, los cambios netos, los escenarios apilados, los conflictos y los requisitos sin cubrir dentro de Reglas automáticas de equipo, aplica filtros de foco sin conexión y comparte los mismos datos en exportaciones e impresiones.
- **Panel de datos y almacenamiento** – Audita proyectos, listas, equipos personalizados, favoritos y comentarios de autonomía desde Configuración y estima el tamaño del backup.
- **Inspector de salvaguardas en tiempo de ejecución** – El runtime guarda el resultado en `window.__cineRuntimeIntegrity` y ofrece `window.cineRuntime.verifyCriticalFlows()` para que el equipo confirme las rutas de guardado/compartido/restauración y la persistencia de feedback antes de viajar.
- **Superposición de estado de auto-guardado** – Refleja la nota más reciente dentro del diálogo de ajustes para que el equipo vea la actividad de fondo durante los ensayos.
- **Editor sensible al monitoreo** – Sólo muestra campos extra de monitores y distribución cuando el escenario lo requiere.
- **Controles de acento y tipografía** – Ajusta color de acento, tamaño y familia de fuente; los temas oscuro, rosa y alto contraste persisten entre sesiones.
- **Atajos de búsqueda global** – Pulsa `/` o `Ctrl+K` (`⌘K` en macOS) para enfocar la búsqueda aunque el menú móvil esté plegado.
- **Botón de forzar recarga** – Actualiza los recursos del service worker sin borrar proyectos ni dispositivos.
- **Favoritos anclados** – Marca opciones con estrella para mantener cámaras, baterías y accesorios habituales arriba y en las copias de seguridad.
- **Reseteo de fábrica con respaldo** – Descarga automáticamente una copia antes de borrar proyectos, dispositivos y ajustes guardados.

Consulta los README específicos para ver detalles por idioma.

## Guía rápida

Ejecuta esta lista tras instalar o actualizar el planner. Confirma que guardado, compartido, importación, respaldo y restauración funcionan igual en línea y sin red.

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador moderno.
3. (Opcional) Sirve la carpeta por HTTP(S) para instalar el service worker:
   ```bash
   npx http-server
   # o
   python -m http.server
   ```
   La aplicación se almacenará en caché para uso offline y aplicará actualizaciones cuando las apruebes.
4. Carga el planner, cierra la pestaña, desconecta la red (o activa modo avión) y vuelve a abrir `index.html`. El indicador offline debe parpadear mientras se cargan los recursos en caché, incluidos los Uicons locales.
5. Abre **Ayuda → Lista de comprobación de inicio rápido** y lanza el tutorial guiado. El nuevo navegador de pasos permite volver a los flujos completados sin reiniciar y, si lo dejas a medias, aparecerá automáticamente **Reanudar tutorial guiado** para conservar el progreso sin conexión.
6. Crea un proyecto, pulsa **Enter** (o **Ctrl+S**/`⌘S`) para guardar manualmente y revisa el selector para ver el auto-backup con sello horario que aparece tras unas 50 modificaciones registradas o a los diez minutos.
7. Exporta **Configuración → Copia de seguridad y restauración → Copia de seguridad** e importa el archivo `planner-backup.json` en un perfil privado. Verificar la ruta de restauración demuestra que ninguna copia queda atrapada y que la salvaguarda previa funciona.
8. Practica la exportación de un paquete (`project-name.json`) y su importación en otro equipo o perfil. Ensayar el flujo Guardar → Compartir → Importar asegura que los recursos locales acompañan al proyecto.
9. Archiva la copia verificada y el paquete junto a la versión del repositorio usada. Registra fecha, equipo y operador para dejar constancia de cuándo se validó el ensayo y mantener los flujos sincronizados desde la primera sesión.
10. Abre la consola del navegador y captura `window.__cineRuntimeIntegrity` (o vuelve a ejecutar `window.cineRuntime.verifyCriticalFlows()` y guarda el informe). Ese registro demuestra que la guarda en tiempo de ejecución validó las rutas de guardado/compartido/restauración y la persistencia de feedback durante la práctica offline.

## Requisitos del sistema y navegadores

- **Navegadores modernos.** Validado en las últimas versiones de Chromium, Firefox y Safari. Activa service workers, acceso a `localStorage` (almacenamiento del sitio) y almacenamiento persistente.
- **Dispositivos orientados a offline.** Portátiles y tabletas deben permitir almacenamiento persistente. Ejecuta la app una vez en línea para que el service worker almacene todos los recursos y practica la recarga offline antes de viajar.
- **Espacio local suficiente.** Las producciones grandes acumulan proyectos, backups y listas. Vigila el espacio del perfil y exporta regularmente a medios redundantes.
- **Sin dependencias externas.** Todos los iconos, fuentes y scripts se entregan con el repositorio. Copia también `animated icons 3/` y los Uicons locales al mover la carpeta.

## Ensayo de guardado, compartido e importación

Repite esta rutina cuando se incorpore personal, se prepare una estación nueva o se publique una actualización importante. Verifica que los flujos de guardado, compartido, importación, copia de seguridad y restauración funcionan sin conexión.

1. **Guardado base.** Abre el proyecto actual, realiza un guardado manual y observa el sello horario. Un auto-backup debería añadirse en menos de diez minutos.
2. **Exporta redundancias.** Genera una copia completa y un paquete del proyecto. Renómbralo a `.cpproject` si lo requiere tu flujo y guarda ambos en medios distintos.
3. **Ensayo de restauración.** Cambia a un perfil privado (o segunda máquina), importa la copia completa y después el paquete. Comprueba listas, paneles, reglas y favoritos.
4. **Verificación offline.** En el perfil de ensayo, desconecta la red y recarga `index.html`. Confirma que aparece el indicador offline y que los Uicons y scripts locales cargan correctamente.
5. **Registra un diff.** De vuelta en el perfil principal abre **Configuración → Copia de seguridad y restauración → Comparar versiones**, selecciona el último guardado manual y el auto-backup más reciente, revisa los cambios resaltados, añade contexto en **Notas de incidente** y exporta el JSON. Guarda el archivo junto a los artefactos del ensayo para que auditorías futuras puedan revisar el historial sin conexión.
6. **Archiva con confianza.** Borra el perfil de ensayo tras confirmar la restauración y etiqueta los archivos verificados según el protocolo del proyecto.
7. **Registra la guarda runtime.** En el mismo perfil, abre la consola y confirma que `window.__cineRuntimeIntegrity.ok` vale `true`. Si necesitas un informe nuevo, ejecuta `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` y guarda el resultado junto con tus notas para demostrar que también se protegió la persistencia de feedback.

## Flujo cotidiano

1. **Crea o abre un proyecto.** Escribe un nombre y pulsa **Enter**/**Guardar**. El nombre activo aparece en listas e impresiones.
2. **Añade cámaras, energía y accesorios.** Selecciona equipos en menús categorizados. La búsqueda al escribir, los favoritos y el atajo `/` (`Ctrl+K`/`⌘K`) aceleran la selección.
3. **Revisa potencia y autonomía.** Observa las alertas, compara baterías y usa el panel de autonomía para evaluar cómo influyen temperatura, códec, fps, etc.
4. **Documenta requisitos.** Introduce equipo, escenarios, agarres, matte boxes y configuraciones de monitoreo. Los botones de bifurcar duplican entradas. Usa **Configuración → Reglas automáticas** para agregar o quitar elementos según escenarios antes de exportar.
5. **Exporta o archiva el plan.** Genera la lista de equipo, descarga una copia o un paquete antes de salir al set. Los respaldos incluyen dispositivos personalizados, comentarios y favoritos.
6. **Confirma la preparación offline.** Desconecta la red, recarga la app y verifica que todo siga accesible. Restaura la copia más reciente si algo parece fuera de lugar.

## Gestión de proyectos y guardados

- **Guardados manuales para versiones explícitas.** Introduce el nombre y pulsa **Enter**/**Guardar**. Cada guardado preserva dispositivos, requisitos, listas, favoritos, diagramas y observaciones.
- **Auto-guardados para progreso en curso.** Mientras el proyecto está abierto, la app escribe cambios en segundo plano. Las entradas `auto-backup-…` aparecen cada diez minutos o tras unas 50 modificaciones registradas. Cuando cambias de proyecto, importas, exportas o preparas una recarga, el plan captura además una copia inmediata aunque ese intervalo aún no haya pasado.
- **Resguardos rápidos capturan copias completas al instante.** Abre **Configuración → Datos y almacenamiento → Quick safeguards** para descargar una copia completa o abrir las herramientas de restauración sin abandonar la pestaña; cada ejecución queda registrada en el panel para archivar el JSON al momento.【F:index.html†L2548-L2570】
- **Mostrar auto-backups bajo demanda.** Activa **Configuración → Copia de seguridad y restauración → Mostrar auto-backups** para ver los sellos temporales.
- **Renombrar crea bifurcaciones.** Cambia el nombre y pulsa **Enter** para duplicar la versión. Útil para comparar variantes.
- **Cambiar de proyecto no destruye datos.** Selecciona otro elemento en el menú; la app conserva la posición de scroll y campos no guardados.
- **Eliminación con confirmación.** Usa el icono de papelera; siempre se solicita confirmación antes de borrar.

## Compartir e importar

- **Paquetes de proyecto ligeros.** **Exportar proyecto** descarga `project-name.json` con el proyecto activo, favoritos y dispositivos personalizados. Renómbralo a `.cpproject` si tu archivo maestro lo requiere.
- **Reglas automáticas junto al paquete.** Activa **Incluir reglas automáticas** durante la exportación para que viajen; al importar se pueden aplicar sólo al proyecto o fusionarse con las reglas globales.
- **Las importaciones no sobrescriben por accidente.** Si un paquete entrante coincide con el nombre de un proyecto existente, el planner guarda la copia nueva como `nombre-proyecto-imported` para que puedas revisar ambas versiones con calma.
- **Importaciones validadas offline.** Al importar `auto-gear-rules-*.json`, la app verifica tipo, versión semántica y metadatos antes de sobrescribir. Las discrepancias muestran avisos y, si algo falla, se restaura el snapshot anterior automáticamente.
- **Restauraciones con doble buffer.** Antes de importar, se solicita guardar una copia del estado actual. Tras validar el paquete, el proyecto restaurado aparece arriba en el selector.
- **Flujos entre dispositivos sin red.** Copia `index.html`, `script.js`, `devices/` y tus archivos de respaldo a un medio externo. Lanza la app desde disco, importa el paquete y continúa trabajando sin conectarte.
- **Exporta con responsabilidad.** Revisa el JSON antes de compartirlo para asegurarte de que sólo incluye lo necesario. El formato es legible para editar o depurar entradas.
- **La descarga manual protege los archivos.** Si el navegador o un bloqueador impide la descarga, el planner abre una pestaña «Manual download» con el contenido JSON. Pulsa `Ctrl+A`/`Ctrl+C` (`⌘A`/`⌘C` en macOS), pega el texto en un archivo `.json` y guárdalo junto a tus copias de seguridad antes de cerrar la pestaña.
- **Sincroniza con checklists.** Cuando recibas un paquete actualizado, impórtalo, revisa los sellos `Actualizado` en la barra lateral y archiva el JSON anterior para mantener el historial.
- **Comparte sin perder contexto.** Los paquetes recuerdan idioma, tema, logotipo y preferencias para que quien lo abra vea el proyecto como tú, incluso offline.

## Formatos de archivos

- **`project-name.json` (paquete).** Incluye un proyecto, favoritos y dispositivos personalizados. Cambiar la extensión a `.cpproject` no altera la importación.
- **`planner-backup.json` (respaldo completo).** **Configuración → Copia de seguridad y restauración → Copia de seguridad** captura proyectos, auto-backups, favoritos, comentarios, reglas, ajustes, fuentes y branding.
- **`auto-gear-rules-*.json` (reglas).** Exportaciones opcionales desde **Reglas automáticas** con tipo de archivo, versión y metadatos para validar offline. Guarda estas copias junto a los respaldos completos.

## Recorrido por la interfaz

### Referencia rápida

- **Búsqueda global** (`/`, `Ctrl+K`, `⌘K`) salta a funciones, selectores o temas de ayuda, incluso con navegación oculta. Las
  sugerencias muestran primero coincidencias directas de funciones y dispositivos antes que los temas de ayuda para que los flujos
  con teclado lleguen a los controles principales. Las frases exactas ahora suben al principio, así que escribir el nombre completo
  de un control como «battery health» trae esa función antes que coincidencias más amplias. Al vaciar el campo, las coincidencias
  usadas recientemente aparecen arriba para repetir rutinas del equipo sin perder tiempo.
- **Centro de ayuda** (`?`, `H`, `F1`, `Ctrl+/`) ofrece guías, atajos, preguntas frecuentes y modo de ayuda flotante. La lista
  «Comienza aquí» ahora cubre cómo preparar el indicador sin conexión, guardar exportaciones redundantes y repasar un simulacro
  de restauración para que el equipo verifique las copias de seguridad antes de salir a rodaje. Un recuadro de verificación en
  consola enumera `window.__cineRuntimeIntegrity`, `window.cineRuntime.verifyCriticalFlows()` y las utilidades de
  `cinePersistence` para registrar ensayos sin conexión sin salir del diálogo.
- **Diagrama de proyecto** visualiza rutas de energía y señal; mantén Shift al exportar para guardar JPG.
- **Panel de comparación de baterías** muestra rendimiento de packs compatibles y alerta sobre sobrecargas.
- **Generador de listas** crea tablas categorizadas con metadatos, correos de equipo y accesorios según escenarios.
- **Comparación de versiones** (**Configuración → Copia de seguridad y restauración → Comparar versiones**) resalta cambios entre guardados manuales o auto-backups, permite tomar notas del incidente y exportar registros antes de archivar.
- **Ensayo de restauración** carga respaldos en un entorno aislado para validar cada registro sin conexión antes de restaurar los datos de producción.
- **Indicador offline y Forzar recarga** muestran el estado de conexión y actualizan recursos sin tocar los datos.

### Controles superiores

- Un enlace para saltar, el indicador offline y la marca responsiva mantienen la navegación accesible.
- La barra de búsqueda se enfoca con `/` o `Ctrl+K` (`⌘K`), abre el menú lateral en móviles y se limpia con Escape.
- El cambio de idioma, los modos oscuro/rosa y el diálogo de Configuración permiten ajustar color de acento, tamaño y familia de fuente, alto contraste, logotipo personalizado y acceder a herramientas de respaldo, restauración y restablecimiento (siempre con copia previa).
- El botón de ayuda abre el diálogo buscable y responde a `?`, `H`, `F1` o `Ctrl+/` en cualquier momento.
- El botón 🔄 elimina recursos en caché y recarga la app sin borrar proyectos ni datos de autonomía.

### Navegación y búsqueda

- En pantallas pequeñas, un menú lateral plegable replica las secciones principales.
- Cada lista y desplegable permite buscar escribiendo y filtrar al vuelo. `/` o `Ctrl+F` (`⌘F`) enfocan el campo más cercano.
- Las sugerencias de búsqueda resaltan las palabras clave coincidentes para que puedas confirmar el resultado antes de navegar o ejecutar una acción.
- Los iconos de estrella fijan dispositivos favoritos en la parte superior y los preservan en las copias de seguridad.

## Personalización y accesibilidad

- Cambia entre temas claro, oscuro, rosa y alto contraste; el color de acento, el tamaño base y la tipografía persisten offline.
- El enlace de salto, los estados de foco visibles y el diseño responsivo facilitan la navegación con teclado, tablet o móvil.
- Atajos disponibles: búsqueda (`/`, `Ctrl+K`, `⌘K`), ayuda (`?`, `H`, `F1`, `Ctrl+/`), guardado (`Enter`, `Ctrl+S`, `⌘S`), modo oscuro (`D`) y tema rosa (`P`).
- El modo de ayuda flotante convierte botones, campos y cabeceras en tooltips bajo demanda.
- Sube un logotipo personalizado para las vistas imprimibles, define valores por defecto de monitoreo y conjuntos de requisitos.
- Los botones de bifurcar duplican campos rápidamente y los favoritos mantienen a mano los dispositivos recurrentes.

## Seguridad de datos y operación offline

- Un service worker almacena todos los recursos, ejecuta la app sin conexión y aplica actualizaciones sólo tras **Forzar recarga**.
- Proyectos, comentarios, favoritos, dispositivos, temas y listas viven en el almacenamiento del navegador. Se solicita persistencia cuando está disponible para reducir riesgos de expulsión.
- Las copias automáticas encadenan instantáneas de proyectos cada diez minutos o tras unas 50 modificaciones registradas. Al cambiar de proyecto, importar, exportar o prepararte para recargar, la aplicación captura además una nueva instantánea aunque ese intervalo aún no haya concluido; las descargas completas por hora y los archivos de reglas automáticas en segundo plano completan la línea de tiempo. Activa **Configuración → Copia de seguridad y restauración → Mostrar auto-backups en la lista** para ver la retención y recuperar instantáneas sin conectividad.
- Si el navegador bloquea descargas, la app abre una pestaña de **Descarga manual** con el JSON para que lo copies en un archivo `.json` y lo guardes en medios offline de confianza antes de cerrarla.
- Usa **Configuración → Copia de seguridad y restauración → Comparar versiones** para diferenciar dos guardados, anotar contexto en **Notas del incidente** y exportar un registro para el traspaso.
- Ejecuta **Ensayo de restauración** desde **Configuración → Copia de seguridad y restauración** para cargar un backup en un espacio desechable, revisar la tabla comparativa y confirmar que está íntegro antes de aplicar **Restaurar** sobre los datos activos.
- Ejecutar la app desde disco o una red interna mantiene los datos sensibles fuera de servicios externos. Las exportaciones en JSON son auditables.
- La cabecera muestra el indicador offline cuando cae la conexión; **Forzar recarga** actualiza archivos sin tocar el trabajo guardado.
- **Restablecer fábrica** o borrar datos del sitio sólo se permite tras generar automáticamente una copia.
- Las actualizaciones del service worker se descargan en segundo plano y esperan tu aprobación. Al ver **Actualización lista**, termina los cambios, crea un backup y pulsa **Forzar recarga**.
- Los datos residen en un `localStorage` reforzado; los perfiles restringidos recurren a `sessionStorage`. Cada escritura genera una instantánea `__legacyMigrationBackup` para recuperarse sin pérdidas si aparece un error de cuota o de esquema. Usa las herramientas del navegador para inspeccionar o exportar datos antes de limpiar cachés o realizar pruebas.
- Un guardián de almacenamiento crítico se ejecuta en cada inicio y duplica cada clave esencial en su copia de seguridad antes de que hagas cambios, de modo que incluso los datos heredados conservan siempre una copia redundante lista para restaurar.

## Resumen de datos y almacenamiento

- Abre **Configuración → Datos y almacenamiento** para revisar proyectos, auto-backups, listas, dispositivos personalizados, favoritos, comentarios y la caché de sesión con recuentos en vivo.
- Cada entrada explica qué representa; las secciones vacías permanecen ocultas para que identifiques el estado rápidamente.
- El resumen estima el tamaño del backup usando la exportación más reciente.
- El **registro de diagnósticos** refleja todas las entradas de cineLogging, permite filtrar por severidad o namespace y ofrece controles de retención, reflejo en consola y captura de errores, todo dentro de Ajustes y sin conexión. Ahora además avisa cuando los filtros ocultan todas las entradas para evitar falsas alarmas durante las auditorías. Cada entrada almacena ahora una marca de tiempo ISO, el valor en milisegundos, un identificador de evento y el canal para que puedas alinear los fallbacks de consola con los diagnósticos guardados incluso si el registrador estructurado no está disponible. Las alertas y fallos de impresión o exportación de la vista general también se registran aquí, incluyendo si fue necesario abrir la ventana de respaldo, para que los ensayos de compartición queden documentados por completo.
- Las copias completas muestran su total acumulado y alimentan el registro de historial, así puedes confirmar que las copias horarias quedaron capturadas antes de archivarlas sin conexión.

## Cuotas y mantenimiento

- **Confirma el almacenamiento persistente.** Revisa el panel en cada estación. Si el navegador lo deniega, solicita acceso de nuevo o planifica exportaciones manuales más frecuentes.
- **Vigila el espacio disponible.** Usa el panel o el inspector de almacenamiento. Si el margen se reduce, archiva backups antiguos, elimina entradas `auto-backup-…` redundantes y verifica que los nuevos archivos se descargan sin avisos.
- **Prepara las cachés tras actualizar.** Después de **Forzar recarga**, abre el diálogo de ayuda, las páginas legales y las vistas habituales para volver a almacenar Uicons, OpenMoji y fuentes.
- **Documenta la salud del almacenamiento.** Añade estas comprobaciones a tus registros de preparación y cierre: estado de persistencia, espacio libre y ubicación de las copias más recientes.

## Copias de seguridad y recuperación

- **Instantáneas guardadas** – El selector conserva cada plan manual y crea `auto-backup-…` cada diez minutos o tras unas 50 modificaciones registradas. Los cambios de proyecto, importaciones, exportaciones y recargas también generan una copia inmediata aunque ese intervalo aún no se haya cumplido.
- **Copias completas** – **Configuración → Copia de seguridad y restauración → Copia de seguridad** descarga `planner-backup.json` con proyectos, dispositivos, comentarios, reglas y estado de UI. Antes de restaurar se crea un respaldo de seguridad y se muestran avisos si el archivo proviene de otra versión.
- **Panel de resguardos rápidos** – En **Configuración → Datos y almacenamiento** encontrarás un bloque dedicado de **Quick safeguards** para lanzar copias completas con un clic o abrir rápidamente las herramientas de restauración, de modo que captures duplicados sin cambiar de pestaña.【F:index.html†L2548-L2570】
- **Libro de historial** – Cada copia completa añade una entrada que puedes auditar en **Configuración → Datos y almacenamiento** o exportar junto al archivo. Mantiene sellos horarios y nombres alineados con tu bitácora aunque trabajes sin conexión.
- **Resguardos ocultos de migración** – Antes de sobrescribir planners, configuraciones o preferencias, la app guarda el JSON anterior en `__legacyMigrationBackup`. Si algo falla, la recuperación vuelve automáticamente a esa copia. La compresión ahora selecciona automáticamente la codificación segura más compacta para que las copias sigan dentro de la cuota del navegador. Los barridos de recuperación de cuota ahora comprimen primero las entradas almacenadas más pesadas para liberar espacio más rápido sin tocar las copias de seguridad activas.【F:src/scripts/storage.js†L1541-L1652】
- **Historial automático de reglas** – Los cambios en **Reglas automáticas** generan copias con sello horario cada diez minutos.
- **Restablecimiento de fábrica** – Borra datos sólo después de descargar un backup.
- **Recordatorios por hora** – Una rutina en segundo plano sugiere realizar una copia adicional cada hora.
- **Guardia de integridad runtime** – Antes de viajar, abre la consola y verifica que `window.__cineRuntimeIntegrity.ok` sea `true` (o ejecuta `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`). El informe demuestra que los caminos de guardado/compartido/restauración y la persistencia de feedback siguen protegidos offline.
- **Bucle de verificación** – Tras cada backup crítico, impórtalo en un perfil separado y confirma que coincide antes de eliminar el perfil.
- **Hábitos de almacenamiento seguro** – Etiqueta los archivos con nombre del proyecto y fecha y guárdalos en medios redundantes (RAID, USB cifrado, disco óptico).
- **Compara antes de sobrescribir** – Descarga un backup nuevo antes de restaurar y revisa diferencias con una herramienta de diff JSON.

## Ensayos de integridad

- **Validación previa (diaria o antes de cambios mayores).** Guarda manualmente, exporta copia completa y paquete, impórtalos en un perfil privado y comprueba proyectos, reglas, favoritos y paneles antes de borrarlo.
- **Ensayo offline (semanal o antes de viajar).** Ejecuta la app, crea un backup, desconecta toda red y recarga `index.html`. Verifica el indicador offline, los Uicons y la apertura del proyecto verificado.
- **Control de cambios (tras editar datos o scripts).** Corre `npm test` para recuperar confianza y repite la validación previa. Archiva el backup aprobado con una nota de cambios.
- **Rotación de redundancia (mensual o antes de archivar).** Guarda el backup más reciente, un paquete verificado (renombrado a `.cpproject` si es necesario) y un ZIP del repositorio en al menos dos medios. Alterna cuál se inspecciona para detectar degradación.

## Listas operativas

Rutinas repetibles para mantener proyectos, respaldos y recursos offline sincronizados en cada equipo que usa Cine Power Planner. Existe una versión imprimible en `docs/operations-checklist.md` y la guía `docs/offline-readiness.md` amplía los pasos para viajes largos sin conectividad.

### Preparación previa al rodaje

1. **Confirma la revisión correcta.** Abre `index.html`, pulsa **Forzar recarga** y verifica la versión en **Configuración → Acerca de**. Abre las páginas legales para precargar Uicons, OpenMoji y tipografías.
2. **Carga proyectos críticos.** Abre el plan activo y un `auto-backup-…` reciente. Comprueba listas, comentarios y favoritos en ambos.
3. **Ejercita la cadena de guardado.** Realiza un cambio, guarda con `Enter` o `Ctrl+S`/`⌘S`, exporta `planner-backup.json`, impórtalo en un perfil privado y compara el selector.
4. **Prueba el flujo de compartido.** Exporta `project-name.json`, impórtalo, revisa reglas automáticas, dispositivos y el indicador offline. Elimina el perfil después.
5. **Simula operación sin red.** Desconecta el equipo, recarga la app y confirma que el indicador offline aparece, los iconos se ven nítidos y los proyectos siguen accesibles.
6. **Archiva los artefactos.** Guarda el backup verificado, el paquete y un ZIP del repositorio en medios redundantes para reconstruir el entorno sin internet.

### Entrega al finalizar

1. **Captura un backup final.** Con el proyecto abierto, exporta `planner-backup.json` y el último `project-name.json` (renómbralo a `.cpproject` si procede) y etiquétalos con fecha, localización y jornada.
2. **Valida importaciones.** Restaura ambos archivos en una máquina de verificación y asegúrate de que no haya corrupción. Mantén esa instancia offline.
3. **Registra los cambios.** Documenta qué auto-backups se promovieron, qué dispositivos personalizados se añadieron y qué reglas cambiaron. Guarda las notas junto a los respaldos.
4. **Actualiza cachés con intención.** Tras archivar, pulsa **Forzar recarga**, abre el diálogo de ayuda y las páginas legales para recargar documentos antes de volver a trabajar offline.
5. **Entrega medios redundantes.** Proporciona copias cifradas a la unidad de almacenamiento y conserva un segundo juego según la política de retención.

## Plan de recuperación de emergencia

1. **Pausa y preserva el estado.** Deja la pestaña abierta, desconecta la red si puedes y registra la hora y el estado del indicador offline. Evita recargar.
2. **Exporta lo que queda.** Ejecuta **Configuración → Copia de seguridad y restauración → Copia de seguridad** y descarga `planner-backup.json`. Aun si la lista parece incorrecta, captura auto-backups, favoritos, comentarios y reglas para análisis.
3. **Duplica auto-backups.** Muestra las entradas `auto-backup-…`, promueve los snapshots recientes a guardados manuales y renómbralos con el ID del incidente o un sello temporal.
4. **Inspecciona el paquete verificado.** Importa el último `project-name.json`/`.cpproject` confiable en un perfil privado o máquina secundaria sin conexión y compara proyectos, listas y ajustes.
5. **Restaura con cuidado.** Si la verificación es correcta, restaura el backup fresco en la máquina principal. El flujo guarda primero una copia de seguridad para comparar con herramientas de diff si fuera necesario.
6. **Recarga y documenta.** Tras recuperarte, pulsa **Forzar recarga**, abre el diálogo de ayuda y las páginas legales para rehidratar cachés, luego registra el incidente (qué ocurrió, qué archivos se exportaron, dónde se guardaron y qué estación validó la solución). Almacena el informe junto a la copia.

## Listas de equipo e informes

- **Generar lista de equipo y requisitos** crea tablas categorizadas que se actualizan automáticamente cuando cambian los datos.
- Los elementos se agrupan por categoría y fusionan duplicados. Los escenarios añaden rigging, protección climática y accesorios especializados para reflejar la realidad del rodaje.
- Las reglas automáticas se ejecutan tras el generador para añadir o quitar elementos específicos sin editar JSON a mano.
- Las anotaciones de cobertura del panel de reglas aparecen en vistas impresas, exportaciones y paquetes compartidos para que las revisiones offline reflejen el mismo resumen.
- Las filas de lentes incluyen diámetro frontal, peso, mínimo enfoque, necesidad de varillas y componentes de matte box. La vista general imprimible refleja estas selecciones con marca, montura, diámetro, enfoque, peso, soporte de varillas y notas para que los paquetes de entrega mantengan las mismas especificaciones sin conexión. Las filas de baterías consideran cantidades y hardware para hot-swap.
- Detalles del equipo, configuraciones de monitoreo, preferencias de distribución de vídeo y notas personalizadas aparecen en las exportaciones.
- Las listas se guardan con el proyecto, aparecen en las vistas imprimibles y en los paquetes; puedes reiniciarlas con **Eliminar lista de equipo**.

## Reglas automáticas

Desde **Configuración → Reglas automáticas** puedes ajustar cada lista sin editar JSON manualmente:

- Activa reglas sólo cuando ciertos **Escenarios requeridos** estén marcados; añade etiquetas opcionales para identificarlas rápidamente.
- Controla las reglas por **peso de la cámara**, comparando el cuerpo seleccionado con un umbral en gramos (más pesada, más ligera o exactamente igual) antes de ejecutar la automatización.
- Agrega equipo con categoría y cantidad o utiliza **Adiciones personalizadas** para recordatorios, kits especiales o avisos. Las reglas de eliminación ocultan filas que el generador incluiría.
- Las reglas se ejecutan después de los paquetes predeterminados para integrarse con la lógica base y fluyen a las listas, backups y paquetes.
- Un panel de cobertura resalta disparadores duplicados, totales netos de añadidos/eliminados, conflictos y escenarios sin cubrir. Las tarjetas de foco filtran la lista, saltan a las reglas implicadas y funcionan sin conexión.
- Guardar una lista almacena el conjunto de reglas activo con el proyecto. Al cargarlo o importar un paquete, se recupera el alcance correcto.
- Estas perspectivas de cobertura viajan como objeto `coverage` en vistas impresas, copias de seguridad, exportaciones de proyectos y paquetes compartidos, de modo que las auditorías posteriores vean el mismo estado.
- Exporta o importa el conjunto como JSON, restablécelo a los valores de fábrica cuando necesites un punto limpio y recurre al historial automático (cada diez minutos) si un ajuste falla.

## Inteligencia de autonomía

Los tiempos aportados por usuarios alimentan un modelo ponderado para aproximarse a la experiencia real:

- Ajustes de temperatura: ×1 a 25 °C, ×1,25 a 0 °C, ×1,6 a −10 °C y ×2 a −20 °C.
- Resolución: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; menores se escalan en relación a 1080p.
- Fotogramas: escala lineal a partir de 24 fps (48 fps = ×2).
- Wi‑Fi activado suma 10 %.
- Códecs: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All-Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
- Monitores ponderados según la relación de brillo.
- El peso final refleja cuánta energía aporta cada componente para que rigs similares influyan más.
- Un panel ordena por peso, muestra porcentajes y destaca valores atípicos para análisis rápido.

## Atajos de teclado

| Atajo | Acción | Notas |
| --- | --- | --- |
| `/`, `Ctrl+K`, `⌘K` | Enfocar la búsqueda global | Funciona incluso con navegación plegada; `Esc` limpia |
| `Enter`, `Ctrl+S`, `⌘S` | Guardar el proyecto activo | El botón Guardar se habilita tras introducir un nombre |
| `?`, `H`, `F1`, `Ctrl+/` | Abrir la ayuda | El diálogo sigue siendo buscable mientras escribes |
| `D` | Cambiar a modo oscuro | También disponible en **Configuración → Temas** |
| `P` | Alternar tema rosa | Compatible con temas claro, oscuro o alto contraste |
| 🔄 | Forzar recarga de recursos | También desde **Configuración → Forzar recarga** |

## Localización

Puedes previsualizar nuevas traducciones sin build:

1. Duplica el README más cercano como `README.<lang>.md` y tradúcelo.
2. Añade cadenas en `translations.js`, manteniendo los marcadores como `%s`.
3. Copia y traduce las páginas estáticas (privacidad, aviso legal).
4. Ejecuta `npm test` antes de enviar un pull request.

## Instalación como app

Cine Power Planner es una aplicación web progresiva:

1. Abre `index.html` en un navegador compatible.
2. Usa la opción **Instalar** o **Añadir a la pantalla de inicio**.
   - **Chrome/Edge (escritorio):** Haz clic en el icono de instalación en la barra de direcciones.
   - **Android:** Menú del navegador → *Añadir a pantalla de inicio*.
   - **iOS Safari:** Botón compartir → *Añadir a pantalla de inicio*.
3. Inicia la app desde tu lista de aplicaciones. Funciona offline y se actualiza automáticamente tras aprobar una recarga.

## Flujo de datos de dispositivos

Los catálogos viven en `devices/`. Cada archivo agrupa equipos relacionados para facilitar las auditorías. Ejecuta los siguientes scripts antes de hacer commit:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` limpia nombres y abreviaturas de conectores. `npm run unify-ports` estandariza etiquetas. `npm run check-consistency` verifica campos obligatorios y `npm run generate-schema` reconstruye `schema.json`. Para iterar rápido con datos:

```bash
npm run test:data
```

Añade `--help` a cualquier comando para ver instrucciones y revisa los diffs generados antes de abrir un pull request. `npm run help` resume los scripts disponibles.

## Desarrollo

Configura Node.js 18 o superior. Tras clonar:

```bash
npm install
npm run lint
npm test
```

`npm test` ejecuta ESLint, comprobaciones de datos y Jest de forma secuencial (`--runInBand`, `maxWorkers=1`). Ejecuta suites específicas mientras iteras:

```bash
npm run test:unit
npm run test:data
npm run test:dom
npm run test:script
```

### Registro de módulos

El runtime registra cada paquete crítico (`cinePersistence`, `cineOffline`,
`cineUi`, `cineRuntime` y utilidades compartidas) en el registro global
`cineModules`. Cada módulo queda congelado por defecto, documentado con
metadatos y verificado durante el arranque para que guardar, compartir,
importar, hacer copias de seguridad y restaurar nunca se ejecuten sin sus
salvaguardas. Consulta
[`docs/architecture/module-registry.md`](docs/architecture/module-registry.md)
antes de añadir nuevos módulos para mantener alineadas las garantías offline,
la documentación y las traducciones.

Una pila de infraestructura — `cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` y
`cineModuleEnvironment` — mantiene alineadas la detección
de ámbitos, las consultas al sistema de módulos, las colas de registro y la
exposición global entre los bundles moderno y legacy sin duplicar código base.

Para los módulos nuevos utiliza `cineModules.createBlueprint({...})` para
capturar los metadatos y las opciones de congelación antes de registrarlos. El
asistente congela la API generada, normaliza categoría, descripción y
conexiones, y reencola los registros que fallen para que los flujos offline no
pierdan sus protecciones.

### Bundle para navegadores legacy

Después de modificar `src/scripts/` o `src/data/`, ejecuta `npm run build:legacy` para regenerar el bundle ES5 que sirve a navegadores antiguos. El comando también actualiza los polyfills locales para preservar la experiencia offline.

### Estructura de archivos

```
index.html
src/styles/style.css
src/styles/overview.css
src/styles/overview-print.css
src/scripts/script.js
src/scripts/storage.js
src/scripts/static-theme.js
src/scripts/modules/        # Módulos congelados registrados en cineModules
src/data/index.js
src/data/devices/
src/data/schema.json
src/vendor/
legal/
tools/
tests/
```

## Resolución de problemas

- **¿El service worker está bloqueado en una versión antigua?** Pulsa **Forzar recarga** o realiza una recarga dura desde las herramientas de desarrollador.
- **¿Faltan datos tras cerrar la pestaña?** Asegúrate de que el sitio tenga acceso a almacenamiento; la navegación privada puede bloquearlo.
- **¿Descargas bloqueadas?** Permite descargas múltiples para guardar copias y paquetes.
- **¿Fallo en scripts de línea de comandos?** Verifica que Node.js 18+ esté instalado, ejecuta `npm install` y vuelve a probar. Si hay errores de memoria, usa una suite más pequeña como `npm run test:unit`.

## Comentarios y soporte

Abre un issue si encuentras problemas, tienes preguntas o quieres proponer funciones. Incluir exportaciones o muestras de autonomía ayuda a mantener el catálogo preciso.

## Contribuir

¡Se aceptan contribuciones! Abre un issue o envía un pull request tras leer `CONTRIBUTING.md`. Ejecuta `npm test` antes de enviarlo.

## Agradecimientos

El planner incluye Uicons locales, recursos OpenMoji y otros elementos para disponer de iconografía sin conexión, y utiliza lz-string para almacenar proyectos de forma compacta en URLs y respaldos.

## Licencia

Distribuido bajo la licencia ISC. Consulta `package.json` para más detalles.
