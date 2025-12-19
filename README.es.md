# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icono de Cine Power Planner" width="200">

Cine Power Planner es una aplicación web independiente para crear, auditar y compartir planes de alimentación profesional que nunca abandonan tu equipo. Diseña rigs V‑Mount, B‑Mount o Gold-Mount, modela tiempos de autonomía, documenta requisitos del proyecto y exporta paquetes compartibles, todo dentro del navegador, incluso sin conexión. Cada dependencia vive en este repositorio para que la experiencia sea idéntica en un estudio, un portátil de rodaje o un disco aislado.

## Funciones clave

- **Base de datos de consumo energético.** Consulta valores de consumo incluidos para cámaras, monitores, transmisores, luces y accesorios, o amplía el catálogo local con tus propios equipos para que cada proyecto parta de datos verificados.
- **Planificación de autonomía.** Combina capacidades de batería, familias de voltaje y comportamiento de descarga para estimar cuánto durará cada rig antes de cambiar baterías. El feedback de autonomía mantiene visibles las expectativas durante la preparación y los ensayos.
- **Configuraciones personalizadas.** Mezcla cámaras, accesorios, requisitos del equipo y escenarios guardados para reflejar exactamente el montaje que usarás en el set. Exporta paquetes o copias de seguridad cuando quieras sin poner en riesgo los datos.
- **Ensayos de seguridad y trazabilidad.** Los recorridos guiados, los registros de diferencias exportados manualmente desde **Comparar versiones** y los paquetes de verificación facilitan demostrar que guardar, compartir, importar, respaldar y restaurar protegen cada dato de usuario, incluso sin reconectarte.
- **Operación offline garantizada.** Todos los iconos, fuentes, Uicons y scripts auxiliares viajan con el repositorio. El guardado automático, los respaldos, las restauraciones, el compartido y la ayuda funcionan totalmente en el dispositivo para que los equipos trabajen desconectados con confianza.
- **Búsqueda global con sinónimos.** Términos de seguridad como «trash», «archivo», «salvaguardar», «recuperar» o «rollback» llevan ahora directamente a las acciones de borrar, guardar, hacer copia de seguridad y restaurar para proteger los datos sin esfuerzo.

## Instalación

1. Clona o descarga este repositorio en una unidad local de confianza:
   ```bash
   git clone https://github.com/Hugo9809/cine-power-planner.git
   cd cine-power-planner
   ```
   (Si recibiste un paquete offline, descomprímelo en una carpeta local.)
2. Abre `index.html` directamente en un navegador compatible. Todos los recursos se cargan desde el repositorio, por lo que puedes desconectarte de inmediato.
3. (Opcional) Sirve la carpeta en `http://localhost` para activar el service worker incluido y la instalación como PWA. Cualquier servidor estático funciona sin conexión, por ejemplo:
   ```bash
   npx http-server
   # o
   python -m http.server
   ```
4. Sigue la [Guía rápida](#guía-rápida) para ensayar guardado, compartido, importación, copias de seguridad y restauración en cada equipo antes de depender del planner en rodaje.

## De un vistazo

- **Planifica sin conexión.** Construye configuraciones V‑Mount, B‑Mount o Gold-Mount directamente en el navegador. Todos los Uicons, fuentes y scripts auxiliares están incluidos, sin depender de CDNs ni de la red. Clona el repositorio, desconecta el cable y la interfaz seguirá funcionando igual.
- **Mantén los datos en el dispositivo.** Proyectos, comentarios de autonomía, favoritos, equipos personalizados, listas y ajustes permanecen locales. Las copias de seguridad y los paquetes compartibles son archivos JSON legibles.
- **Pon a prueba las redes de seguridad.** Guardados manuales, auto-guardados en segundo plano y copias automáticas con sello horario se combinan para que practiques la rutina Guardar → Copia → Paquete → Restaurar desde el primer día.
- **Acompaña las actualizaciones con intención.** Las nuevas versiones del service worker se activan automáticamente, y el botón **Forzar recarga** queda disponible cuando quieras limpiar cachés y garantizar un reinicio impecable.

## Capas de seguridad a simple vista

| Salvaguarda | Qué protege | Cómo activarla | Evidencia para archivar |
| --- | --- | --- | --- |
| Guardados manuales | Estado activo del proyecto, incluidos dispositivos, notas de autonomía y listas de equipo. | Pulsa **Enter**, elige **Guardar** o usa `Ctrl+S`/`⌘S`. | Entradas con marca temporal en el selector y registros de diferencias exportados desde **Comparar versiones**. |
| Cadencia de auto-guardado y auto-backup | Instantáneas continuas que capturan ediciones en curso. | Mantén el proyecto abierto: las instantáneas se ejecutan cada ~50 cambios o 10 minutos. | Entradas `auto-backup-…` en el selector y la línea de tiempo de **Actividad reciente**. |
| Copia de seguridad completa del planner | Todos los proyectos, favoritos, registros de autonomía, reglas automáticas y preferencias. | **Ajustes → Copia y restauración → Copia de seguridad** (o **Protecciones rápidas**). | `planner-backup.json`, exportaciones del historial de copias y anexos del registro de verificación. |
| Exportaciones de paquetes de proyecto | Un único proyecto más los dispositivos personalizados referenciados (los favoritos permanecen locales). | **Exportar proyecto** desde el selector. | Archivos `nombre-del-proyecto.json` (o `.cpproject` renombrados) guardados con notas de checksum. |
| Sandbox de ensayo de restauración | Confianza en que los procesos de importación y restauración funcionan antes de tocar datos en producción. | **Ajustes → Copia y restauración → Ensayo de restauración**. | Captura de consola de `window.__cineRuntimeIntegrity`, notas del ensayo y capturas de la sandbox. |
| Actualizaciones de documentación y traducciones | Temas del centro de ayuda, READMEs localizados y guías imprimibles. | Sigue la lista de mantenimiento de documentación cada vez que cambie el comportamiento. | Documentos actualizados en `docs/`, archivos `README.*.md` localizados y paquetes de verificación firmados. |

## Accesos directos

- **Ejecuta el ensayo completo.** Sigue el ejercicio de [Guía rápida](#guía-rápida) para verificar guardado, compartido, importación, copia de seguridad y restauración en cada estación, incluso sin conexión.
- **Consulta los flujos.** Ten a mano el [Ensayo de guardado, compartido e importación](#ensayo-de-guardado-compartido-e-importación) y la [Referencia detallada de guardar, compartir, importar, copia de seguridad y restaurar](docs/save-share-restore-reference.md) durante formaciones o auditorías.
- **Demuestra la preparación offline.** Combina el [Runbook de preparación offline](docs/offline-readiness.md) con la [Lista operativa](docs/operations-checklist.md) para que los ensayos documentados se mantengan alineados con la app y los recursos incluidos.
- **Recertifica paquetes en caché.** Ejecuta el [Ensayo de verificación de caché offline y salvaguardas](docs/offline-cache-verification-drill.md) cada vez que regeneres assets del service worker, actualices iconos o toques la persistencia para que los builds en caché coincidan con el repositorio.
- **Planifica rotaciones redundantes.** Usa la [Guía de rotación de copias de seguridad](docs/backup-rotation-guide.md) para definir copias diarias, semanales y de archivo frío, de modo que los autoguardados, exportaciones manuales y paquetes compartibles siempre tengan redundancia fuera del equipo antes de que el crew se marche.
- **Audita la seguridad de los conectores de alimentación.** Combina la [Referencia de advertencias del resumen de potencia](docs/power-summary-warning-reference.md) con cada ensayo del Resumen de energía para registrar los límites de los conectores, las copias de seguridad redundantes y la alineación entre el autoguardado y el uso compartido antes de distribuir planes sin conexión.
- **Protege los datos de usuario de forma deliberada.** Usa el [Manual de protección de datos](docs/data-protection-playbook.md) para planificar cambios, ensayar salvaguardas diarias, preparar lanzamientos y responder a incidentes.
- **Actualiza la documentación con intención.** Trabaja con la [Lista de verificación de actualizaciones de documentación](docs/documentation-update-checklist.md) y la [Matriz de cobertura de documentación](docs/documentation-coverage-matrix.md) para mantener sincronizados temas de ayuda, traducciones y manuales.
- **Registra los ensayos de verificación.** Acompaña cada lanzamiento o auditoría con el [Paquete de verificación de documentación](docs/documentation-verification-packet.md) y guarda copias de la [Plantilla de registro de verificación](docs/verification-log-template.md) para documentar cada salvaguarda.
- **Detén la deriva de la documentación.** Sigue el nuevo [Runbook de deriva de documentación](docs/documentation-drift-runbook.md) para comprobar que los temas de ayuda, los README traducidos y los manuales impresos reflejan las mismas salvaguardas de guardado/compartido/importación/backup/restauración que el runtime antes de distribuir paquetes offline.
- **Captura un snapshot de estado.** Completa el [Informe de estado de la documentación](docs/documentation-status-report-template.md) cuando actualices ayudas o traducciones; resume qué cambió, las evidencias offline reunidas y dónde residen copias y registros.
- **Localiza con confianza.** Consulta la [Guía de traducción](docs/translation-guide.md) y los README específicos de cada idioma cada vez que añadas o ajustes idiomas para que el contenido offline siga alineado.

## Referencia de versión

- El planner publica la versión actual como `window.APP_VERSION`, `window.CPP_APP_VERSION` y `window.cinePowerPlanner.version` para que las automatizaciones sin conexión, las revisiones de documentación y las comprobaciones del service worker puedan confirmar las compilaciones sin volver a conectarse a la red.

## Kit de auditoría sin conexión

Usa estas guías incluidas cada vez que necesites demostrar que el planner funciona sin conectividad o documentar cómo viajan los datos entre máquinas:

- **Lista operativa** – El recorrido de [`docs/operations-checklist.md`](docs/operations-checklist.md) replica las salvaguardas de la app para que se observe cada flujo de guardado, compartido, importación, copia de seguridad y restauración antes de confiar en ellos sin conexión.
- **Runbook de preparación offline** – [`docs/offline-readiness.md`](docs/offline-readiness.md) amplía el ensayo para días de viaje, incluye precalentamiento de caché, preparación de medios redundantes y simulacros de recuperación para mantener los datos seguros incluso en entornos aislados.
- **Manual de protección de datos** – [`docs/data-protection-playbook.md`](docs/data-protection-playbook.md) reúne árboles de decisión para actualizaciones, respuesta a emergencias y comunicación para que los datos de usuario sigan siendo la máxima prioridad.
- **Plantilla de registro de verificación** – [`docs/verification-log-template.md`](docs/verification-log-template.md) captura quién realizó los ensayos, cuándo se exportaron copias de seguridad y dónde viven las copias redundantes. Guárdala junto a tus paquetes para demostrar que nada se perdió.
- **Matriz de cobertura de documentación** – [`docs/documentation-coverage-matrix.md`](docs/documentation-coverage-matrix.md) confirma que temas de ayuda, traducciones, capturas y manuales reflejan el runtime actual. Revísala antes de dar el visto bueno.

## Ritmo de documentación y formación

Mantener temas de ayuda, checklists y READMEs traducidos sincronizados con el comportamiento de la app forma parte del proceso de lanzamiento. Cuando cambien los flujos o lleguen nuevas salvaguardas, repite este ciclo antes de entregar builds a los equipos:

1. **Mapea el cambio.** Anota qué flujos de guardado, compartido, importación, copia de seguridad o restauración incorporan nuevos estados, avisos o salvaguardas. Actualiza los recorridos relevantes en [`docs/`](docs) para que los ensayos reflejen la interfaz real.
2. **Refresca la guía multilingüe.** Propaga los ajustes de redacción a los archivos `README.*.md` y a cualquier panel de ayuda localizado para que los equipos offline reciban las mismas indicaciones en todos los idiomas.
3. **Repite los paquetes de verificación.** Ejecuta el [Paquete de verificación de documentación](docs/documentation-verification-packet.md) con el build actual y guarda registros firmados que prueben cada flujo offline.
4. **Distribuye paquetes actualizados.** Regenera los paquetes de formación compartibles para que los equipos ensayen con los assets, iconos y checklists que incluye este repositorio.

Trata estos pasos como requisitos obligatorios para cada merge, de modo que la documentación sea tan resistente como el planner.

## Lista de verificación de lanzamientos y documentación

Antes de fusionar o publicar una build para campo, completa esta lista condensada para proteger datos, documentación y traducciones:

1. **Ejecuta el guardia de manifiesto.** Corre `npm run check-consistency` para validar los metadatos de dispositivos y confirmar que `service-worker-assets.js` coincide con el manifiesto generado en memoria. Si detecta diferencias, ejecuta `npm run generate:sw-assets`, guarda el archivo actualizado y repite la verificación antes de seguir.
2. **Ensaya los flujos críticos.** Ejecuta la [Guía rápida](#guía-rápida) o [`docs/operations-checklist.md`](docs/operations-checklist.md) para confirmar que guardado, compartido, importación, copia de seguridad y restauración siguen funcionando offline de extremo a extremo.
3. **Actualiza la guía escrita.** Revisa el centro de ayuda, los README localizados y los manuales impresos. Usa la [Matriz de cobertura de documentación](docs/documentation-coverage-matrix.md) para asegurar que no falta ningún idioma ni flujo.
4. **Captura artefactos de verificación.** Completa el [Paquete de verificación de documentación](docs/documentation-verification-packet.md) y la [Plantilla de registro de verificación](docs/verification-log-template.md) con las notas de ensayo, hashes de exportaciones y capturas de precalentamiento de caché más recientes.
5. **Valida los toggles de idioma.** Cambia por cada idioma de la app para confirmar que los textos actualizados se representan correctamente sin cargar assets externos.
6. **Guarda archivos redundantes.** Exporta `planner-backup.json`, los paquetes de proyecto actuales, las reglas automáticas en JSON y un ZIP del repositorio. Coloca todo en al menos dos soportes offline junto a una nota de retención.
7. **Registra el estado del service worker.** Documenta la versión reportada, el comportamiento del indicador offline y la marca temporal del último **Forzar recarga** manual para que los equipos sepan qué revisión ejecutan.

## Panorama general

### Construido para equipos

El planner se diseñó para foquistas, data wranglers y directores de fotografía. Cuando añades cuerpos, placas de batería, enlaces inalámbricos o accesorios, el consumo total y las estimaciones de autonomía se actualizan al instante. Las advertencias señalan packs sobrecargados y las listas de equipos permanecen ligadas al contexto del proyecto para que nada se pierda al compartir el plan.

### Listo para viajar

Abre `index.html` directamente desde disco o aloja el repositorio en tu red interna, sin builds, servidores ni cuentas. Un service worker mantiene la aplicación disponible offline, recuerda las preferencias y activa automáticamente las nuevas versiones, mientras el botón opcional **Forzar recarga** queda listo por si quieres vaciar cachés bajo tu propio control. Guardar, compartir, importar, respaldar y restaurar siempre se ejecutan localmente, protegiendo los datos.

### Por qué importa el enfoque offline-first

Los rodajes raramente tienen conectividad garantizada y muchos estudios exigen herramientas desconectadas. Cine Power Planner ofrece las mismas capacidades con o sin red: todos los recursos están empaquetados, cada flujo funciona localmente y cada guardado genera artefactos que puedes archivar en medios redundantes. Practicar estos flujos antes de filmar forma parte de la lista de comprobación para no depender de servicios externos en pleno rodaje.

### Pilares de funciones

- **Planifica con confianza.** Calcula la demanda a 14,4 V/12 V (y 33,6 V/21,6 V para B‑Mount), compara baterías compatibles y visualiza el impacto en un panel ponderado de retroalimentación.
- **Mantente listo para producción.** Los proyectos capturan dispositivos, requisitos, escenarios, detalles de equipo y listas; los auto-backups, paquetes y el botón opcional **Forzar recarga** mantienen la información vigente sin perder estabilidad.
- **Trabaja como prefieras.** Detección de idioma, temas oscuro, rosa y de alto contraste, controles tipográficos, logotipos personalizados y ayuda contextual hacen que la interfaz sea cómoda en rodajes y en preparación. La ayuda contextual ahora completa automáticamente descripciones para cada botón, campo y menú, de modo que cada control se explica por sí mismo incluso sin conexión.

## Principios clave

- **Siempre offline.** Toda la aplicación, incluidos iconos, páginas legales y herramientas, vive en el repositorio. Abre `index.html` desde disco o una intranet y el service worker sincroniza los recursos sin obligarte a conectarte.
- **Sin rutas ocultas de datos.** Guardados, paquetes, importaciones, copias de seguridad y restauraciones suceden íntegramente en el navegador. Nada sale del equipo a menos que lo exportes.
- **Redes redundantes.** Guardados manuales, auto-guardados en segundo plano, copias periódicas, respaldos previos a la restauración y exportaciones legibles garantizan que ningún dato desaparezca.
- **Actualizaciones previsibles.** Las nuevas versiones del service worker se activan automáticamente y las versiones en caché permanecen accesibles. Usa **Forzar recarga** cuando quieras limpiar los recursos almacenados sin tocar el trabajo guardado.
- **Presentación consistente.** Uicons locales, recursos OpenMoji y tipografías integradas aseguran la misma apariencia en un estudio o en un portátil desconectado.
- **Proteger cada cambio.** Antes de cualquier restauración, el planner genera una copia de seguridad forzada y conserva las revisiones anteriores para que ninguna importación sobrescriba tu trabajo. Los registros de verificación y las notas de checksum acompañan a cada archivo para demostrar la integridad incluso sin conexión.

## Promesa de preservación de datos

Proteger los flujos de trabajo del equipo y sus datos es la máxima prioridad. Al planificar con Cine Power Planner obtienes las mismas capas de protección que ensayamos antes de cada versión:

- **Salvaguardas verificadas.** Los flujos de guardado/compartido/importación/respaldo/restauración se publican con ensayos registrados en el [Documentation Verification Packet](docs/documentation-verification-packet.md) para que las cuadrillas puedan comprobar cada protección antes de viajar sin conexión.
- **Ayuda y traducciones en sincronía.** La [Documentation Update Checklist](docs/documentation-update-checklist.md) y la [Translation Guide](docs/translation-guide.md) garantizan que cualquier comportamiento actualizado aparezca en los temas de ayuda, los README localizados y las guías impresas antes de distribuir paquetes.
- **Respaldo en cada punto.** La [Backup Rotation Guide](docs/backup-rotation-guide.md) y la [Operations Checklist](docs/operations-checklist.md) detallan cómo escalonar archivos redundantes, evidencias de ensayo y registros de verificación para que ningún proyecto se quede sin ruta de recuperación.
- **Evidencia auditable.** Capturamos exportaciones de consola de `window.__cineRuntimeIntegrity`, bitácoras firmadas de los ensayos y hashes de los paquetes para que los equipos de cumplimiento y las cuadrillas puedan auditar la protección de datos sin esfuerzo.

Si un cambio toca guardados, compartidos, importaciones, respaldos, restauraciones o la documentación, queda bloqueado hasta que estas protecciones se ejerzan y queden registradas. Esa disciplina mantiene los datos seguros incluso en máquinas aisladas.

## Tabla de contenidos

- [Funciones clave](#funciones-clave)
- [Instalación](#instalación)
- [De un vistazo](#de-un-vistazo)
- [Capas de seguridad a simple vista](#capas-de-seguridad-a-simple-vista)
- [Accesos directos](#accesos-directos)
- [Kit de auditoría sin conexión](#kit-de-auditoría-sin-conexión)
- [Ritmo de documentación y formación](#ritmo-de-documentación-y-formación)
- [Lista de verificación de lanzamientos y documentación](#lista-de-verificación-de-lanzamientos-y-documentación)
- [Panorama general](#panorama-general)
- [Principios clave](#principios-clave)
- [Promesa de preservación de datos](#promesa-de-preservación-de-datos)
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

- **Base de datos de lentes ampliada** – se agregaron Sirui 1.33x/1.6x Anamorphics, NiSi Athena Cine Primes, Kinefinity Mavo Primes, Spirit Lab Pure Primes, Ancient Optics & Petzval Rehousings y Zero Optik Canon Dream Primes (Rehoused) al catálogo offline.
- **Comparación de copias de seguridad** – Selecciona guardados manuales o auto-backups, revisa diferencias, añade notas de incidente y exporta un registro antes de revertir cambios o entregar material a postproducción.
- **Ensayos de restauración** – Carga copias completas o paquetes de proyectos en un entorno aislado para comprobar su contenido sin tocar perfiles de producción.
- **Registro de diagnósticos** – Abre **Configuración → Datos y almacenamiento** para ver el log en vivo, filtrar por nivel o namespace y ajustar retención, reflejo en consola, la captura de consola activada por defecto y captura de errores sin salir del planner.
- **Libro de historial de copias** – Cada descarga de copia completa registra su marca de tiempo y nombre de archivo localmente. Revísalo en **Configuración → Datos y almacenamiento** o exporta el registro junto con tus archivos para demostrar retención sin conexión.
- **Reglas automáticas de equipo** – Define añadidos o retiradas activados por escenarios, con controles de importación/exportación y copias temporizadas.
- **Panel de cobertura de reglas** – Resume la cobertura por escenario, los disparadores duplicados, los cambios netos, los escenarios apilados, los conflictos y los requisitos sin cubrir dentro de Reglas automáticas de equipo, aplica filtros de foco sin conexión y comparte los mismos datos en exportaciones e impresiones.
- **Panel de datos y almacenamiento** – Audita proyectos, listas, equipos personalizados, favoritos y comentarios de autonomía desde Configuración y estima el tamaño del backup.
- **Inspector de salvaguardas en tiempo de ejecución** – El runtime guarda el resultado en `window.__cineRuntimeIntegrity` y ofrece `window.cineRuntime.verifyCriticalFlows()` para que el equipo confirme las rutas de guardado/compartido/restauración y la persistencia de feedback antes de viajar.
- **Superposición de estado de auto-guardado** – Refleja la nota más reciente dentro del diálogo de ajustes para que el equipo vea la actividad de fondo durante los ensayos.
- **Editor sensible al monitoreo** – Sólo muestra campos extra de monitores y distribución cuando el escenario lo requiere.
- **Controles de acento y tipografía** – Ajusta color de acento, tamaño y familia de fuente; los temas oscuro, rosa y alto contraste persisten entre sesiones.
- **Atajos de búsqueda global** – Pulsa `/` o `Ctrl+K` (`⌘K` en macOS) para enfocar la búsqueda aunque el menú móvil esté plegado.
- **Botón de forzar recarga** – Actualiza los recursos del service worker sin borrar proyectos ni dispositivos. Una sonda de conectividad resistente ahora hace ping al servidor antes de limpiar, así las cachés permanecen intactas si la red falla.
  Dale hasta cinco segundos antes de que aparezca el modo de purga manual; así los equipos más lentos pueden desmontar el service worker con calma y evitar recargas dobles que pondrían en riesgo los auto-guardados.
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
   La aplicación se almacenará en caché para uso offline, activará automáticamente las nuevas versiones y dejará **Forzar recarga** disponible por si quieres limpiar cachés bajo demanda.
4. Carga el planner, cierra la pestaña, desconecta la red (o activa modo avión) y vuelve a abrir `index.html`. El indicador offline debe parpadear mientras se cargan los recursos en caché, incluidos los Uicons locales. Si aparece un banner que diga **«1 copia guardada en la bóveda local.»** o **«{count} copias guardadas en la bóveda local.»** junto al botón **Abrir bóveda de copias local**, abre la bóveda, descarga cada archivo pendiente y confirma que el banner desaparece antes de seguir sin conexión.
5. Abre **Ayuda → Lista de comprobación de inicio rápido** y lanza el tutorial guiado. Repasa creación de proyectos, selección de dispositivos, la revisión del Resumen de energía con su punto de control de Resumen rápido y la nueva repetición de la red de seguridad offline que destaca el indicador superior y el estado del autosave, listas de equipo, contactos, equipo propio, reglas automáticas y los flujos de exportación, importación y respaldo. El navegador de pasos y el indicador de progreso permiten volver a los flujos completados sin reiniciar y, si lo dejas a medias, aparecerá automáticamente **Reanudar tutorial guiado** con tus conteos guardados para conservar el progreso sin conexión. Además, la fila de la lista muestra un estado offline con los pasos completados, el siguiente flujo y un sello de tiempo que indica cuándo se completó el último paso antes de retomar el recorrido.
   Cuando el tutorial llegue al paso del Resumen de energía, contrasta las alertas codificadas por colores con la [Referencia de advertencias del resumen de potencia](docs/power-summary-warning-reference.md), registra cualquier sobrecarga de pines o D-Tap, confirma las copias de seguridad redundantes y asegúrate de que la marca de tiempo del autosave coincide con la vista previa de compartir/exportar antes de marcar el paso como completado.
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
3. **Ensayo de restauración.** Cambia a un perfil privado (o segunda máquina), importa la copia completa y después el paquete. Comprueba listas, paneles y reglas. Los favoritos y demás datos globales llegarán con la copia completa; el paquete no los añade.
4. **Verificación offline.** En el perfil de ensayo, desconecta la red y recarga `index.html`. Confirma que aparece el indicador offline y que los Uicons y scripts locales cargan correctamente.
5. **Registra un diff.** De vuelta en el perfil principal abre **Configuración → Copia de seguridad y restauración → Comparar versiones**, selecciona el último guardado manual y el auto-backup más reciente, revisa los cambios resaltados, añade contexto en **Notas de incidente** y exporta el JSON. Guarda el archivo junto a los artefactos del ensayo para que auditorías futuras puedan revisar el historial sin conexión.
6. **Archiva con confianza.** Borra el perfil de ensayo tras confirmar la restauración y etiqueta los archivos verificados según el protocolo del proyecto.
7. **Registra la guarda runtime.** En el mismo perfil, abre la consola y confirma que `window.__cineRuntimeIntegrity.ok` vale `true`. Si necesitas un informe nuevo, ejecuta `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` y guarda el resultado junto con tus notas para demostrar que también se protegió la persistencia de feedback.

## Flujo cotidiano

1. **Crea o abre un proyecto.** Escribe un nombre y pulsa **Enter**/**Guardar**. El nombre activo aparece en listas e impresiones.
2. **Añade cámaras, energía y accesorios.** Selecciona equipos en menús categorizados. La búsqueda al escribir, los favoritos y el atajo `/` (`Ctrl+K`/`⌘K`) aceleran la selección.
3. **Revisa potencia y autonomía.** Observa las alertas, compara baterías y usa el panel de autonomía para evaluar cómo influyen temperatura, códec, fps, etc.
4. **Documenta requisitos.** Introduce equipo, escenarios, agarres, matte boxes y configuraciones de monitoreo. Tu perfil de usuario guardado aparece automáticamente en la lista de equipo; ajusta el cargo o los datos de contacto según cada proyecto. La cuadrícula **Almacenamiento y soportes** muestra familias CFexpress, CFast, SD y microSD directamente del catálogo offline, incluso si la cámara seleccionada usa ranuras distintas, para que registres cantidades de tarjetas y notas sin dejar huecos en el paquete guardado. Los botones de bifurcación duplican entradas para acelerar la captura. Usa **Configuración → Reglas automáticas** para agregar o quitar elementos según escenarios antes de exportar.
5. **Exporta o archiva el plan.** Genera la lista de equipo, descarga una copia o un paquete antes de salir al set. Los respaldos incluyen dispositivos personalizados, comentarios y favoritos.
6. **Confirma la preparación offline.** Desconecta la red, recarga la app y verifica que todo siga accesible. Restaura la copia más reciente si algo parece fuera de lugar.

## Gestión de proyectos y guardados

- **Guardados manuales para versiones explícitas.** Introduce el nombre y pulsa **Enter**/**Guardar**. Cada guardado preserva dispositivos, requisitos, listas, favoritos, diagramas y observaciones.
- **Auto-guardados para progreso en curso.** Mientras el proyecto está abierto, la app escribe cambios en segundo plano. Las entradas `auto-backup-…` aparecen cada diez minutos o tras unas 50 modificaciones registradas. Cuando cambias de proyecto, importas, exportas o preparas una recarga, el plan captura además una copia inmediata aunque ese intervalo aún no haya pasado.
- **Resguardos rápidos capturan copias completas al instante.** Abre **Configuración → Datos y almacenamiento → Quick safeguards** para descargar una copia completa o abrir las herramientas de restauración sin abandonar la pestaña; cada ejecución queda registrada en el panel para archivar el JSON al momento.【F:index.html†L2548-L2570】
- **Mostrar auto-backups bajo demanda.** Activa **Configuración → Copia de seguridad y restauración → Mostrar auto-backups** para ver los sellos temporales.
- **Renombrar crea bifurcaciones.** Cambia el nombre y pulsa **Enter** para duplicar la versión. Útil para comparar variantes.
- **Cambiar de proyecto no destruye datos.** Selecciona otro elemento en el menú; la app conserva la posición de scroll y campos no guardados.
- **Los contactos del equipo quedan reutilizables.** Abre la entrada **Contactos** de la barra lateral para mantener un padrón con
    roles, correos, teléfonos, sitios web y fotos de perfil listo para insertarlo en cualquier proyecto. Los contactos viven en el mismo
    snapshot de localStorage que tus proyectos, se incluyen en las copias de seguridad manuales y pueden importarse desde archivos
    `.vcf` (vCard) sin conexión para fusionar agendas. Guardar una fila del equipo en la libreta evita volver a escribir datos en
    los próximos proyectos.【F:index.html†L206-L209】【F:index.html†L7345-L7374】【F:src/scripts/app-core-new-1.js†L13632-L17848】
- **El equipo propio permanece sincronizado.** Abre **Equipo propio** en la barra lateral para catalogar nombres,
    cantidades, notas y procedencia de tu kit personal. Las entradas viven en el mismo snapshot offline que los proyectos,
    alimentan las condiciones de las reglas automáticas y viajan con los respaldos manuales, los bundles compartidos y las rutinas
    de protección frente a cuota para que nunca se pierda tu hardware personal.【F:index.html†L214-L219】【F:index.html†L6596-L6656】【F:src/scripts/modules/features/own-gear.js†L43-L172】【F:docs/save-share-restore-reference.md†L15-L17】
- **Eliminación con confirmación.** Usa el icono de papelera; siempre se solicita confirmación antes de borrar.

## Compartir e importar

- **Paquetes de proyecto ligeros.** **Exportar proyecto** descarga `project-name.json` con el proyecto activo y los dispositivos personalizados referenciados (además de las reglas automáticas si decides incluirlas). Los favoritos y otros datos globales permanecen en el equipo de origen; acompaña el paquete con una copia completa si deben viajar. Renómbralo a `.cpproject` si tu archivo maestro lo requiere.
- **Reglas automáticas junto al paquete.** Activa **Incluir reglas automáticas** durante la exportación para que viajen; al importar se pueden aplicar sólo al proyecto o fusionarse con las reglas globales.
- **Las importaciones no sobrescriben por accidente.** Si un paquete entrante coincide con el nombre de un proyecto existente, el planner guarda la copia nueva como `nombre-proyecto-imported` para que puedas revisar ambas versiones con calma.
- **Importaciones validadas offline.** Al importar `auto-gear-rules-*.json`, la app verifica tipo, versión semántica y metadatos antes de sobrescribir. Las discrepancias muestran avisos y, si algo falla, se restaura el snapshot anterior automáticamente.
- **Restauraciones con doble buffer.** Antes de importar, se solicita guardar una copia del estado actual. Tras validar el paquete, el proyecto restaurado aparece arriba en el selector.
- **Flujos entre dispositivos sin red.** Copia `index.html`, los directorios `src/scripts/` y `src/data/` (incluido `src/data/devices/`) y tus archivos de respaldo o paquetes a un medio externo. Lanza la app desde ese disco, importa el paquete y continúa trabajando sin conectarte.
- **Exporta con responsabilidad.** Revisa el JSON antes de compartirlo para asegurarte de que sólo incluye lo necesario. El formato es legible para editar o depurar entradas.
- **La descarga manual protege los archivos.** Si el navegador o un bloqueador impide la descarga, el planner abre una pestaña «Manual download» con el contenido JSON. Pulsa `Ctrl+A`/`Ctrl+C` (`⌘A`/`⌘C` en macOS), pega el texto en un archivo `.json` y guárdalo junto a tus copias de seguridad antes de cerrar la pestaña.
- **Sincroniza con checklists.** Cuando recibas un paquete actualizado, impórtalo, revisa los sellos `Actualizado` en la barra lateral y archiva el JSON anterior para mantener el historial.
- **Comparte sin perder contexto.** Los paquetes recuerdan idioma, tema, logotipo y preferencias para que quien lo abra vea el proyecto como tú, incluso offline.

## Formatos de archivos

- **`project-name.json` (paquete).** Incluye un proyecto y los dispositivos personalizados referenciados (más las reglas automáticas si se incluyeron). Los favoritos, contactos y otros datos globales permanecen locales; utiliza una copia completa del planner si deben acompañar al proyecto. Cambiar la extensión a `.cpproject` no altera la importación.
- **`planner-backup.json` (respaldo completo).** **Configuración → Copia de seguridad y restauración → Copia de seguridad**
  captura proyectos, auto-backups, favoritos, comentarios, reglas, contactos, ajustes, fuentes y branding.
- **`auto-gear-rules-*.json` (reglas).** Exportaciones opcionales desde **Reglas automáticas** con tipo de archivo, versión y metadatos para validar offline. Guarda estas copias junto a los respaldos completos.

## Recorrido por la interfaz

### Referencia rápida

- **Búsqueda global** (`/`, `Ctrl+K`, `⌘K`) salta a funciones, selectores o temas de ayuda, incluso con navegación oculta. Las
  sugerencias muestran primero coincidencias directas de funciones y dispositivos antes que los temas de ayuda para que los flujos
  con teclado lleguen a los controles principales. Las frases exactas ahora suben al principio, así que escribir el nombre completo
  de un control como «battery health» trae esa función antes que coincidencias más amplias. Al vaciar el campo, las coincidencias
  usadas recientemente aparecen arriba para repetir rutinas del equipo sin perder tiempo. Empieza una consulta con `recent` o
  `history` para centrarte primero en los accesos recientes antes de recorrer todo el catálogo.
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
- El cambio de idioma, los modos oscuro/rosa y el diálogo de Configuración permiten ajustar color de acento, tamaño y familia de fuente, alto contraste, logotipo personalizado y acceder a herramientas de respaldo, restauración y restablecimiento (siempre con copia previa). Todos los controles de tema permanecen sincronizados automáticamente.
- El botón de ayuda abre el diálogo buscable y responde a `?`, `H`, `F1` o `Ctrl+/` en cualquier momento.
- El botón 🔄 elimina recursos en caché y recarga la app sin borrar proyectos ni datos de autonomía. Ahora el navegador precarga el paquete actualizado mientras la limpieza termina, así la nueva versión aparece más rápido sin comprometer la seguridad de los datos.

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

- Un service worker almacena todos los recursos para ejecutar la app sin conexión. Las nuevas versiones se activan automáticamente y **Forzar recarga** queda como opción para limpiar cachés cuando necesites un reinicio garantizado.
- Proyectos, comentarios, favoritos, dispositivos, temas y listas viven en el almacenamiento del navegador. Se solicita persistencia cuando está disponible para reducir riesgos de expulsión.
- Las copias automáticas encadenan instantáneas de proyectos cada diez minutos o tras unas 50 modificaciones registradas. Al cambiar de proyecto, importar, exportar o prepararte para recargar, la aplicación captura además una nueva instantánea aunque ese intervalo aún no haya concluido; las descargas completas por hora y los archivos de reglas automáticas en segundo plano completan la línea de tiempo. Activa **Configuración → Copia de seguridad y restauración → Mostrar auto-backups en la lista** para ver la retención y recuperar instantáneas sin conectividad.
- Si el navegador bloquea descargas, la app abre una pestaña de **Descarga manual** con el JSON para que lo copies en un archivo `.json` y lo guardes en medios offline de confianza antes de cerrarla.
- Usa **Configuración → Copia de seguridad y restauración → Comparar versiones** para diferenciar dos guardados, anotar contexto en **Notas del incidente** y exportar un registro para el traspaso.
- Ejecuta **Ensayo de restauración** desde **Configuración → Copia de seguridad y restauración** para cargar un backup en un espacio desechable, revisar la tabla comparativa y confirmar que está íntegro antes de aplicar **Restaurar** sobre los datos activos.
- Ejecutar la app desde disco o una red interna mantiene los datos sensibles fuera de servicios externos. Las exportaciones en JSON son auditables.
- La cabecera muestra el indicador offline cuando cae la conexión; **Forzar recarga** actualiza archivos sin tocar el trabajo guardado y ahora ejecuta un auto-guardado inmediato con copia de seguridad antes de limpiar las cachés.
- **Restablecer fábrica** o borrar datos del sitio sólo se permite tras generar automáticamente una copia.
- Las actualizaciones del service worker se descargan en segundo plano y se activan automáticamente. Cuando veas **Actualización lista**, termina tus cambios, captura un backup para tus registros y usa **Forzar recarga** si deseas limpiar las cachés y reabrir la sesión con los recursos recién cargados.
- Los datos residen en un `localStorage` reforzado; los perfiles restringidos recurren a `sessionStorage`. Cada escritura genera una instantánea `__legacyMigrationBackup` para recuperarse sin pérdidas si aparece un error de cuota o de esquema. Usa las herramientas del navegador para inspeccionar o exportar datos antes de limpiar cachés o realizar pruebas.
- Un guardián de almacenamiento crítico se ejecuta en cada inicio y duplica cada clave esencial en su copia de seguridad antes de que hagas cambios, de modo que incluso los datos heredados conservan siempre una copia redundante lista para restaurar.

## Resumen de datos y almacenamiento

- Abre **Configuración → Datos y almacenamiento** para revisar proyectos, auto-backups, listas, dispositivos personalizados, favoritos, comentarios y la caché de sesión con recuentos en vivo.
- Cada entrada explica qué representa; las secciones vacías permanecen ocultas para que identifiques el estado rápidamente.
- El resumen estima el tamaño del backup usando la exportación más reciente.
- El **registro de diagnósticos** refleja todas las entradas de cineLogging, permite filtrar por severidad o namespace y ofrece controles de retención, reflejo en consola, la captura de consola activada por defecto y captura de errores, todo dentro de Ajustes y sin conexión. Ahora además avisa cuando los filtros ocultan todas las entradas para evitar falsas alarmas durante las auditorías. Cada entrada almacena ahora una marca de tiempo ISO, el valor en milisegundos, un identificador de evento y el canal para que puedas alinear los fallbacks de consola con los diagnósticos guardados incluso si el registrador estructurado no está disponible. Las alertas y fallos de impresión o exportación de la vista general también se registran aquí, incluyendo si fue necesario abrir la ventana de respaldo, para que los ensayos de compartición queden documentados por completo. Ahora el Service Worker también replica su actividad de caché en este registro, de modo que los problemas de precarga sin conexión, los retrocesos de navegación y las reclamaciones diferidas de clientes queden visibles al instante.
  Un resumen en vivo de habilitación ahora muestra si cada severidad alcanzará el reflejo en consola o el historial retenido antes de lanzar diagnósticos pesados, haciendo más seguro activar trazas verbosas durante sesiones sin conexión.
- La línea de tiempo **Actividad reciente** muestra ahora **recordatorios de seguridad** bajo los tres sellos de tiempo. Señalan cuándo los guardados manuales, las instantáneas automáticas o los archivos completos empiezan a quedarse viejos e incluyen la hora exacta para que refresques la salvaguarda adecuada antes de confiar en una sesión sin conexión.
- La fila de estado del **Guardián de copias** expone el informe del guardián de almacenamiento crítico. Duplica cada clave esencial en una ranura redundante antes de aplicar cambios y resume si se generaron nuevas copias, si aún espera el primer guardado o si hay un problema que revisar en la consola. Consultarla antes de viajar confirma que existen salvaguardas espejadas para cada proyecto, lista de equipo y preferencia almacenada en el dispositivo.【F:src/scripts/app-core-new-2.js†L8640-L8740】【F:src/scripts/storage.js†L2800-L2995】
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
  El control de retención ahora parte de 36 copias para ofrecer más margen antes de
  recortar las antiguas.
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
- **Auditoría mensual en el centro de ayuda (usa la lista integrada).** Abre **Ayuda → Revisión mensual de salud de datos**, sigue los pasos guiados para capturar un respaldo completo nuevo desde **Configuración → Datos y almacenamiento → Protecciones rápidas → Descargar respaldo completo**, exporta cada proyecto activo, recarga sin conexión para confirmar la interfaz en caché, finaliza con **Ensayo de restauración**, luego ejecuta `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` y registra la salida de la consola junto con el resultado en tu bitácora de rotación.
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
- Las teclas de flecha (incluidas Inicio y Fin) desplazan el foco entre las tarjetas guardadas de Requisitos del proyecto sin dejar el teclado.
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
| `/`, `Ctrl+K`, `⌘K` | Abrir Paleta de Comandos / Búsqueda Global | Funciona incluso con navegación plegada; `Esc` limpia |
| `Enter`, `Ctrl+S`, `⌘S` | Guardar el proyecto activo | El botón Guardar se habilita tras introducir un nombre |
| `?`, `H`, `F1`, `Ctrl+/` | Abrir la ayuda | El diálogo sigue siendo buscable mientras escribes |
| `D` | Cambiar a modo oscuro | También disponible en **Configuración → Temas**; el selector de onboarding, el interruptor de la barra superior y la casilla de Configuración se mantienen sincronizados automáticamente. |
| `P` | Alternar tema rosa | Compatible con temas claro, oscuro o alto contraste |
| 🔄 | Forzar recarga de recursos | También desde **Configuración → Forzar recarga** |

## Localización

Puedes previsualizar nuevas traducciones sin build:

- **Usa el rastreador de actualizaciones de documentación.** Registra el progreso en el rastreador integrado (**Configuración →
  General**) para que las notas de la versión indiquen qué traducciones, temas de ayuda y guías imprimibles se actualizaron
  antes de enviar paquetes sin conexión.

1. Duplica el README más cercano como `README.<lang>.md` y tradúcelo.
2. Copia un módulo existente en `src/scripts/translations/<locale>.js` y
   traduce cada valor sin conexión. Conserva marcadores como `%s`, atajos de
   teclado y signos de puntuación.
3. Registra el idioma en el cargador `src/scripts/translations.js` para que los
   mapas `LOCALE_SCRIPTS` y de mensajes de carga pre-cachen el módulo en
   arranques offline.
4. Copia y traduce las páginas estáticas (privacidad, aviso legal).
5. Ejecuta `npm test` antes de enviar un pull request.

## Instalación como app

Cine Power Planner es una aplicación web progresiva:

1. Abre `index.html` en un navegador compatible.
2. Usa la opción **Instalar** o **Añadir a la pantalla de inicio**.
   - **Chrome/Edge (escritorio):** Haz clic en el icono de instalación en la barra de direcciones.
   - **Android:** Menú del navegador → *Añadir a pantalla de inicio*.
   - **iOS Safari:** Botón compartir → *Añadir a pantalla de inicio*.
3. Inicia la app desde tu lista de aplicaciones. Funciona offline, se actualiza automáticamente y aún ofrece **Forzar recarga** si quieres limpiar cachés para un reinicio impecable.

## Flujo de datos de dispositivos

Los catálogos viven en `src/data/devices/`. Cada archivo agrupa equipos relacionados para facilitar las auditorías. Ejecuta los siguientes scripts antes de hacer commit:

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

> **Actualización del catálogo.** El catálogo de unidades de mano FIZ ahora incluye los controladores Nucleus-M y Nucleus-M II de Tilta junto con las ruedas de mano Nano y Nano II, el HU4 de Preston, la unidad de mano cPRO de cmotion, la unidad de mano MagNum de Chrosziel, el CTRL.3 de Teradek, las unidades de mano Focus y Focus Pro de DJI además de la RS Focus Wheel (2022), el control de mano YMER-3 de Hedén, el controlador de mano Pilot Pro de Freefly, el controlador de mano microRemote de Redrock y la empuñadura MagicFIZ de SmallRig para que los equipos offline puedan comparar más ecosistemas sin salir de la aplicación.
>
> **Expansión del catálogo de lentes.** La base de datos de lentes ahora incluye Sirui 1.33x & 1.6x Anamorphics, NiSi Athena Cine Primes, Kinefinity Mavo Primes, Spirit Lab Pure Primes, Ancient Optics & Petzval Rehousings y Zero Optik Canon Dream Primes (Rehoused) para que los directores de fotografía puedan planificar con una gama aún más amplia de ópticas modernas.


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

Después de modificar `src/scripts/` o `src/data/`, ejecuta `npm run build:legacy` para regenerar el bundle ES5 que sirve a navegadores antiguos. El comando también actualiza los polyfills locales para preservar la experiencia offline. Además replica los artefactos JSON (por ejemplo `src/data/schema.json`) en `legacy/data/` para que las rutas `require()` legacy funcionen sin conexión y en las pruebas.

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
