# Agenda Deportiva

Este proyecto es una **Agenda Deportiva** que presenta una interfaz web donde se muestra un calendario de eventos deportivos con detalles sobre los torneos, eventos y las plataformas de transmisión. Los datos se obtienen de un archivo JSON, y la información de las transmisiones (canales y frecuencias) es personalizada con un script en Python.

## Contenido del Proyecto

El proyecto contiene los siguientes archivos:

1. **index.html**: Página principal que muestra la interfaz de la Agenda Deportiva.
2. **agenda.js**: Lógica en JavaScript que genera dinámicamente las pestañas y tablas de la agenda utilizando los datos del archivo `agenda.json`.
3. **agenda.py**: Script en Python que descarga, modifica y guarda los datos del JSON, añadiendo información sobre canales, plataformas y frecuencias.
4. **agenda.json**: Archivo con los datos obtenidos desde la API, modificado por el script Python para incluir información adicional.

## Funcionalidades

### Página Web (HTML + JS)
- **Recarga automática**: La página se recarga automáticamente cada 10 minutos para obtener la información más reciente.
- **Interfaz de usuario**: La agenda presenta diferentes pestañas según las fechas de los eventos. Cada pestaña contiene tarjetas con torneos y eventos, que a su vez incluyen información detallada sobre el canal de transmisión, las plataformas disponibles y las frecuencias.
- **Estilos**: Se utiliza Bootstrap para el diseño responsivo y estilización de la página. También incluye Google Fonts para una mejor presentación tipográfica.

### Script Python (agenda.py)
- **Descarga de datos**: El script descarga el archivo JSON desde una API externa.
- **Modificación de datos**: Agrega frecuencias y plataformas a cada canal, además de personalizar algunos campos según reglas específicas.
- **Guardar el archivo**: El JSON resultante se guarda tanto en la carpeta local como en una ruta de red.
