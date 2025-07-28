# 🎥 Planificador de Consumo de Cámara

Esta herramienta en el navegador ayuda a planificar configuraciones profesionales con baterías V‑Mount. Calcula **consumo total**, **corriente** (a 14,4 V y 12 V) y **autonomía estimada**, comprobando que la batería pueda entregar la potencia necesaria.

---

## 🌍 Idiomas
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇪🇸 Español (predeterminado si el navegador está en español)
- 🇮🇹 Italiano
- 🇫🇷 Français

El idioma puede cambiarse en la esquina superior derecha y se recuerda para la próxima visita.

---

## 🔧 Funciones

### ✅ Gestión de Configuraciones
- Guardar, cargar y borrar múltiples configuraciones
- Todos los datos se guardan localmente mediante `localStorage`
- Importar y exportar configuraciones en JSON
- Generar un resumen imprimible de cualquier configuración guardada
- Funciona totalmente sin conexión: idioma, modo oscuro, configuraciones y datos de dispositivos se conservan
- En cámaras compatibles, elegir placa **B‑Mount** o **V‑Mount**; la lista de baterías se actualiza automáticamente

### 📦 Categorías de Dispositivos
- **Cámara** (1)
- **Monitor** (opcional)
- **Video inalámbrico** (opcional)
- **Motores FIZ** (0–4)
- **Controles FIZ** (0–4)
- **Sensor de distancia** (0–1)
- **Placa de batería** (solo en cámaras con V‑ o B‑Mount)
- **Batería V‑Mount** (0–1)

### ⚙️ Cálculos de Potencia
- Consumo total en vatios
- Corriente a 14,4 V y 12 V
- Autonomía estimada en horas

### 🔋 Comprobación de Salida de la Batería
- Avisa si la corriente supera el límite de Pin o D‑Tap
- Indica cuando la corriente está cerca del límite (80 %)

### 📊 Comparación de Baterías (opcional)
- Comparar autonomías entre todas las baterías
- Gráfico de barras para referencia rápida

### 🖼 Diagrama de Configuración
- Visualiza las conexiones de energía y video entre los dispositivos seleccionados
- Avisa si se combinan marcas FIZ incompatibles
- Arrastra los nodos para ordenarlos, usa los botones para acercar/alejar y descarga el diagrama en SVG o JPG
- Las ventanas emergentes muestran detalles de cada dispositivo
- Utiliza iconos de [OpenMoji](https://openmoji.org/) cuando hay conexión y pasa a emoji si no están disponibles:
  🔋 batería, 🎥 cámara, 🖥️ monitor, 📡 video, ⚙️ motor,
  🎮 controlador, 📐 distancia, 🎮 empuñadura y 🔌 placa de batería

### 🔍 Búsqueda y Filtros
- Filtrar cualquier lista o menú desplegable con un campo de búsqueda
- Escribir dentro de los desplegables para encontrar rápido

### 🛠 Base de Datos de Dispositivos
- Añadir, editar o eliminar dispositivos de todas las categorías
- Importar o exportar la base completa en JSON
- Restablecer a la base por defecto de `data.js`

### 🌓 Modo Oscuro
- Conmutable con el botón de la luna junto al selector de idioma
- La preferencia se guarda en el navegador
- Color rosa opcional con el botón del caballo/unicornio
- El diálogo de ayuda incluye búsqueda y preguntas frecuentes. Ábrelo con ? o con las teclas `?`/`H`/`F1` y ciérralo con Escape o al hacer clic fuera.

---

## 🎨 Diseño
- Diseño limpio con títulos azules y campos grises
- Usa la fuente "Open Sans" de Google Fonts
- Diseño adaptable para pantallas pequeñas
- Temas claro y oscuro

---

## ▶️ Uso
1. **Abrir la app:** cargar `index.html` en cualquier navegador moderno
2. **Seleccionar dispositivos:** elegir en cada categoría desde los menús desplegables
3. **Ver cálculos:** al seleccionar una batería se muestran consumo, corriente y autonomía
4. **Comprobar límites:** los avisos indican si se sobrepasa la salida de la batería
5. **Guardar y cargar configuraciones:** nombrar y exportar/importar configuraciones, además de generar un resumen imprimible
6. **Gestionar lista de dispositivos:** “Editar datos de dispositivos…” abre el editor para modificarlos o restablecer la base

---

## 🗂️ Estructura de Archivos
```bash
index.html       # Página principal
style.css        # Estilos y diseño
script.js        # Lógica de la aplicación
data.js          # Base de datos por defecto
storage.js       # Utilidades de LocalStorage
README.*.md      # Documentación en distintos idiomas
```
Las fuentes se cargan desde Google Fonts en `index.html`.
Una vez almacenadas las fuentes en caché, la aplicación puede usarse totalmente sin conexión.

## 🛠️ Desarrollo
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar el lint:
   ```bash
   npm run lint
   ```
3. Ejecutar pruebas:
   ```bash
   npm test
   ```
