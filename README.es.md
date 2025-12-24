# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icono de Cine Power Planner" width="160">

Cine Power Planner es una aplicación web independiente para crear, auditar y
compartir planes de energía de cámaras profesionales sin que los datos salgan
de tu máquina. Planifica rigs V‑Mount, B‑Mount o Gold‑Mount, modela la duración,
recoge requisitos del proyecto y exporta paquetes compartibles — todo dentro
del navegador y también sin conexión. Todas las dependencias viven en este
repositorio, por lo que la misma experiencia funciona en estaciones de set,
portátiles de campo o archivos aislados.

## Promesa de protección de datos

- **Almacenamiento solo local.** Proyectos, listas de equipo, feedback de
  runtime, exportaciones y copias de seguridad permanecen en tu equipo; la app
  no depende de servicios externos.
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
- **Resúmenes de compatibilidad al restaurar.** Cada restauración muestra
  secciones faltantes y crea un backup previo para verificar cambios.

## Instalación

1. Clona o descarga este repositorio en un disco confiable:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   ```
   (Si recibiste un bundle offline, descomprímelo en una carpeta local.)
2. Abre `index.html` directamente en un navegador compatible. Los assets se
   cargan desde el repositorio, así que puedes desconectarte de inmediato.
3. (Opcional) Sirve la carpeta con `http://localhost` para habilitar el service
   worker y el aviso de instalación PWA. Cualquier servidor estático funciona
   offline:
   ```bash
   python -m http.server
   # o
   npm run serve
   ```

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
