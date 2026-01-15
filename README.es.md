# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icono de Cine Power Planner" width="160">

**Versión actual:** 1.0.53 | **Licencia:** ISC | **Node:** >=18 (herramientas de desarrollo)

Cine Power Planner es una aplicación web independiente para crear, auditar y
compartir planes de energía de cámaras profesionales sin que los datos salgan
de tu máquina. Planifica rigs V‑Mount, B‑Mount o Gold‑Mount, modela la duración,
recoge requisitos del proyecto y exporta paquetes compartibles — todo dentro
del navegador y también sin conexión. Todas las dependencias viven en este
repositorio, por lo que la misma experiencia funciona en estaciones de set,
portátiles de campo o archivos aislados.

## Promesa de protección de datos

- **Almacenamiento solo local.** Proyectos, listas de equipo, feedback de
  runtime, exportaciones y copias de seguridad permanecen en tu equipo en
  IndexedDB, con OPFS como destino de respaldo donde esté disponible; el
  localStorage heredado queda como fallback. La app no depende de servicios
  externos.
- **Sincronización en la nube opcional.** Conéctate a Firebase Studio para
  sincronizar proyectos entre dispositivos sin perder la propiedad local.
- **Capas de seguridad.** Guardar, autoguardado, compartir, importar, backup y
  restaurar crean siempre snapshots de seguridad para recuperar datos antes de
  promoverlos.
- **Diseño offline.** Todos los iconos, fuentes, Uicons y scripts auxiliares
  están en este repo, así que el uso offline no degrada la usabilidad ni la
  protección de datos.

## Empieza aquí (ensayo corto)

1. Abre `index.html` en un navegador compatible. Mantén la estructura del
   repositorio para que los iconos, fuentes y ayudas offline carguen en local.
2. Ejecuta **Help → Quick start checklist** para ensayar guardar, compartir,
   importar, backup y restaurar de extremo a extremo en esta estación.
3. Exporta enseguida un backup del planner y un bundle de proyecto. Guarda
   ambos en medios offline separados para tener un punto de restauración seguro.
4. Desconecta la red y recarga. Comprueba que proyectos, ayuda y **Force
   reload** siguen funcionando sin tocar los datos guardados.

## Flujo de seguridad de datos (cada sesión)

1. **Guardar + autoguardado.** Guarda después de cambios importantes; el
   autoguardado mantiene snapshots locales continuos por si necesitas volver
   atrás.
2. **Compartir/exportar = copiar, no mover.** Los bundles de proyecto y los
   backups del planner siempre duplican datos. Guarda al menos dos copias
   offline antes de borrar nada.
3. **Importar/restaurar con verificación.** Cada restauración crea un backup
   previo y lista notas de compatibilidad antes de promover los datos.
4. **Ensayo de recuperación.** Ejecuta periódicamente una restauración desde un
   backup o bundle compartido para confirmar que esta estación puede recuperar
   datos de extremo a extremo.

## Índice de documentación

El hub canónico de documentación está en [`docs/README.md`](docs/README.md).
Agrupa la guía offline por audiencia (usuarios, operaciones, desarrollo) y por
workflow para que cada rutina se documente una sola vez.

- **Usuarios:** empieza con el
  [User Guide](docs/user/user-guide.md) y la
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md).
- **Operaciones:** ensaya con la
  [Operations Checklist](docs/ops/operations-checklist.md) y el
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Desarrollo:** sigue el
  [Development & Maintenance Guide](docs/dev/development.md) y la
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Funciones clave

- **Base de datos de consumo.** Consulta valores integrados o amplía el catálogo
  local con tus propios equipos.
- **Planificación de baterías.** Combina capacidades, voltajes y feedback de
  runtime para estimaciones realistas.
- **Configuraciones de rig personalizadas.** Mezcla cámaras, accesorios y
  requisitos de crew, y exporta bundles o backups sin riesgo de pérdida.
- **Funcionamiento offline-first.** Cada asset está en el repo, por lo que
  autoguardado, backup, restauración, compartir y ayuda funcionan sin red.
- **Integración con Firebase Studio.** Sincroniza opcionalmente tus proyectos en la nube para colaboración en tiempo real y acceso desde múltiples dispositivos.
- **Resúmenes de compatibilidad al restaurar.** Cada restauración muestra
  secciones faltantes y crea un backup previo para verificar cambios.

## Nuevo: Interfaz de Usuario V2

La aplicación ahora cuenta con una interfaz de usuario V2 completamente rediseñada y responsiva.

### Dashboard y Navegación
- **Dashboard Moderno**: Gestiona todos tus proyectos desde una vista de cuadrícula unificada y buscable con fichas codificadas por color que muestran el estado del proyecto, fechas y acciones rápidas.
- **Barra Lateral de Navegación**: Accede rápidamente a Proyectos, Biblioteca de Dispositivos, Contactos, Equipo Propio, Reglas Automáticas de Equipo, Configuración y Ayuda desde una barra lateral persistente y colapsable.
- **Diseño Mobile-First**: Diseño completamente responsivo con toggle de barra lateral móvil y controles optimizados para táctil.

### Gestión de Proyectos
- **Seguimiento de Estado del Proyecto**: Rastrea proyectos a través de etapas del flujo de trabajo—Borrador, Planificación, Esperando Aprobación, Aprobado, Rodaje, Completado y Archivado—con indicadores de estado codificados por color.
- **Vistas de Proyecto por Pestañas**: Navega entre Paquete de Cámara, Resumen de Potencia, Requisitos y Lista de Equipo dentro de cada proyecto.
- **Menús Contextuales**: Haz clic derecho en las fichas de proyecto para acciones rápidas como duplicar, archivar, exportar o eliminar.

### Herramientas y Datos
- **Biblioteca de Dispositivos**: Navega y gestiona tu base de datos de equipos con filtrado y búsqueda.
- **Gestión de Contactos**: Mantén un directorio de equipo con roles, datos de contacto y fotos de perfil. Importa contactos desde archivos vCard.
- **Seguimiento de Equipo Propio**: Cataloga tu inventario personal de equipos con cantidades y notas de origen.
- **Reglas Automáticas de Equipo**: Configura adiciones o eliminaciones de equipos activadas por escenario.

### Mejoras Visuales
- **Modo Oscuro Mejorado**: Tema oscuro refinado con mejor contraste y legibilidad.
- **Modo Rosa**: Tema de acento divertido con efecto animado de "lluvia de iconos".
- **Controles de Tema**: Botones de acceso rápido en la barra lateral para modo oscuro, modo rosa y recarga forzada.

## Instalación

1. Clona o descarga este repositorio en un disco confiable:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   npm install
   ```
   (Si recibiste un bundle offline, descomprímelo en una carpeta local.)
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Esto abre la app en `http://localhost:3000` con hot module replacement.
3. Para builds de producción:
   ```bash
   npm run build      # Build a dist/
   npm run preview    # Vista previa del build de producción
   ```
4. (Uso offline) Abre `index.html` directamente en un navegador compatible
   para uso completamente offline. Los assets cargan sin conexión a red.

## Traducciones

Mantén los README localizados sincronizados con este README cuando cambien los
workflows, especialmente los de guardar, compartir, importar, backup o
restaurar.

- [Deutsch](README.de.md)
- [English](README.en.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Italiano](README.it.md)

## Licencia

Distribuido bajo la licencia ISC. Consulta `package.json` para más detalles.
