# Cine Power Planner

![Icono de Cine Power Planner](icon.svg)

Cine Power Planner es una aplicación web con funcionamiento sin conexión para planificar rigs de cámara profesionales alimentados por baterías V‑Mount, B‑Mount o Gold‑Mount. Calcula el consumo total, comprueba que cada batería pueda suministrar con seguridad la corriente necesaria, estima autonomías realistas a partir de datos de campo ponderados y mantiene unidas a la vez a la crew, los escenarios y las listas de equipo para que ninguna información se pierda entre departamentos.

---

## Destacados

### Diseña configuraciones complejas sin improvisar
- Combina cámaras, placas de batería, enlaces inalámbricos, monitores, motores y accesorios mientras ves la potencia total, la corriente a 14,4 V/12 V (y 33,6 V/21,6 V para B‑Mount) y el tiempo de funcionamiento estimado.
- Compara baterías compatibles en paralelo y recibe avisos cuando la demanda supera los límites de D‑Tap o de pines.
- Visualiza los rigs con un diagrama interactivo con arrastre, zoom, exportación SVG/JPG y avisos de compatibilidad.

### Mantén a todos los departamentos alineados
- Guarda varios proyectos con requisitos, contactos de la crew, escenarios de rodaje y notas personalizadas.
- Genera listas de equipo listas para imprimir que agrupan el material por categoría, combinan duplicados, incluyen metadatos técnicos y añaden accesorios según el escenario.
- Comparte paquetes JSON que contienen selecciones de dispositivos, feedback de autonomía, listas de equipo y dispositivos personalizados para restaurar todo de principio a fin.

### Lista para viajar y privada
- Funciona por completo en el navegador: abre `index.html` directamente o aloja el repositorio mediante HTTPS para activar el service worker.
- La caché sin conexión conserva idioma, tema, favoritos y proyectos disponibles en cualquier lugar sin enviar datos a servidores externos.
- Vacía la caché local o usa el botón de recarga forzada para actualizar archivos en caché sin tocar tus proyectos.

### Adáptala a tu equipo
- Cambia al instante entre English, Deutsch, Español, Italiano y Français; la aplicación recuerda el último idioma utilizado.
- Elige temas oscuro, rosa o de alto contraste, define un color de acento, ajusta el tamaño de fuente y selecciona la tipografía que mejor se adapte a tu marca o requisitos de accesibilidad.
- Los desplegables con búsqueda, los favoritos fijados y la ayuda al pasar el cursor mantienen productiva a la crew en el set.

---

## Puesta en marcha

1. Clona o descarga el repositorio.
2. Abre `index.html` en un navegador moderno (Chromium, Firefox o Safari). No es necesario compilar nada.
3. Opcional: sirve la carpeta mediante HTTPS para instalar el service worker y recibir actualizaciones sin conexión. Cualquier servidor estático funciona (`npx http-server -S`, por ejemplo).
4. La aplicación almacena los datos en tu navegador. Usa **Ajustes → Copia de seguridad** para exportar instantáneas JSON antes de cambiar de equipo.

---

## Flujo de trabajo habitual

1. **Crea o carga un proyecto.** Pulsa Intro o `Ctrl+S` (`⌘S` en macOS) para guardar al instante. Se generan instantáneas automáticas cada 10 minutos.
2. **Selecciona cámara, alimentación y accesorios.** Los desplegables se filtran mientras escribes y los favoritos permanecen anclados.
3. **Revisa los resultados de potencia.** Consulta vatios, corriente, avisos de seguridad de batería y autonomías en el panel comparativo.
4. **Registra los requisitos.** Documenta roles de la crew, días de rodaje, escenarios y notas para que cada exportación incluya el contexto adecuado.
5. **Genera entregables.** Produce listas de equipo, vistas imprimibles y paquetes de proyecto compartidos y restáuralos más adelante con una sola subida.

---

## Elementos clave de la interfaz

- **Búsqueda global** (`/` o `Ctrl+K`/`⌘K`) te lleva a cualquier función, selector o tema de ayuda incluso con el menú lateral plegado.
- **Centro de ayuda** (`?`, `H`, `F1` o `Ctrl+/`) ofrece guías buscables, preguntas frecuentes, atajos y ayuda contextual opcional.
- **Diagrama del proyecto** visualiza conexiones; mantén pulsada Mayús al descargar para exportar un JPG en lugar de SVG.
- **Panel de comparación de baterías** muestra el rendimiento de cada pack compatible y resalta riesgos de sobrecarga.
- **Generador de listas de equipo** transforma tus selecciones en tablas categorizadas con metadatos, correos de la crew y añadidos según escenario.
- **Indicador sin conexión y recarga forzada** muestran el estado de conectividad y actualizan archivos en caché sin perder proyectos.

---

## Gestión de datos y exportaciones

- Los proyectos, ajustes, listas de equipo, favoritos y dispositivos personalizados viven en `localStorage`; las copias y restauraciones mantienen todo intacto.
- El diálogo de ajustes incluye recordatorios horarios de copia de seguridad, exportaciones manuales, restauración en un clic y un botón de **Borrar caché local**.
- Los archivos de proyecto compartidos agrupan selecciones, requisitos, feedback de autonomía, listas de equipo y dispositivos personalizados para entregas entre equipos.
- Las vistas imprimibles incluyen el nombre del proyecto, datos de producción, un logotipo opcional y la lista de equipo generada.
- Las instantáneas automáticas se ejecutan en segundo plano para volver fácilmente a un estado anterior.

---

## Inteligencia de baterías y autonomía

- Calcula el consumo total, el número de baterías necesarias para días de 10 horas y la corriente que debe aportar cada conexión.
- Avisa al superar el 80 % de uso y bloquea cargas inseguras cuando la demanda sobrepasa el valor continuo o el D‑Tap de la batería.
- Las estimaciones ponderadas tienen en cuenta temperatura, resolución, fotogramas por segundo, códec, uso de Wi‑Fi, brillo de monitor y la cuota de consumo de cada dispositivo.
- Un panel de autonomía ordena el feedback por peso, muestra porcentajes de contribución y destaca valores atípicos.
- El feedback enviado por usuarios mejora las estimaciones para rodajes reales.

---

## Personalización y accesibilidad

- Cambia entre temas oscuro, rosa o de alto contraste y ajusta la tipografía sin recargar la página.
- Sube un logotipo personalizado para las vistas imprimibles, define roles de monitor predeterminados y configura requisitos de proyecto por defecto.
- La navegación con teclado, los indicadores de foco visibles y los enlaces de salto favorecen el uso con lectores de pantalla y en el set.
- Las búsquedas en desplegables, los favoritos fijados y los botones de duplicado en las listas de equipo agilizan la entrada de datos repetitiva.

---

## Atajos de teclado

| Acción | Atajo |
| --- | --- |
| Enfocar la búsqueda global | `/`, `Ctrl+K`, `⌘K` |
| Abrir el diálogo de ayuda | `?`, `H`, `F1`, `Ctrl+/` |
| Guardar proyecto | `Intro`, `Ctrl+S`, `⌘S` |
| Alternar tema oscuro | `D` |
| Alternar tema rosa | `P` |
| Recarga forzada | Haz clic en el icono 🔄 del encabezado |

---

## Desarrollo

- Instala las dependencias con `npm install` (se usan para linting, pruebas y scripts de datos; no hay paso de compilación).
- Ejecuta `npm run lint` y `npm run test` antes de hacer commit. Hay suites específicas con `npm run test:unit`, `npm run test:data`, `npm run test:dom` y `npm run test:script`.
- Scripts útiles:
  - `npm run check-consistency` valida la coherencia de los datos.
  - `npm run normalize` y `npm run unify-ports` mantienen ordenado el catálogo.
  - `npm run generate-schema` regenera el esquema de dispositivos.

---

## Traducciones

La documentación está disponible en varios idiomas y la aplicación detecta automáticamente el idioma del navegador en el primer inicio. Cambia en cualquier momento desde el menú de idioma de la esquina superior derecha:

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

¿Quieres colaborar? Sigue la [guía de traducción](docs/translation-guide.md) para añadir nuevos idiomas tanto a la interfaz como a la documentación.

---

## Contribuciones y soporte

Se agradecen los informes de errores, nuevas ideas y correcciones de datos. Abre un issue o envía un pull request con todos los detalles posibles. Si detectas autonomías incorrectas o equipos faltantes, adjunta el archivo de proyecto o datos de ejemplo para mantener fiable el catálogo.

---

## Licencia

Cine Power Planner se distribuye bajo la licencia ISC.
