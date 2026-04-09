# Gestión de Pacientes - Prueba Técnica

Este proyecto corresponde a una prueba técnica donde se desarrolló una aplicación frontend para la gestión de pacientes. Permite listar, crear, editar, eliminar y ver el detalle de pacientes consumiendo una API.

---

## Instalación y ejecución

1. Clonar el repositorio:

git clone https://github.com/AbrahamBass/prueba-tecnica-front.git

2. Entrar al proyecto:

cd prueba-tecnica-front

3. Instalar dependencias:

npm install

4. Ejecutar la aplicación:

ng serve

Abrir en el navegador:

http://localhost:4200

---

## Funcionalidades

* Listado de pacientes con paginación
* Filtros por nombre (contiene) y documento (exacto)
* Crear paciente
* Editar paciente
* Eliminar paciente con confirmación
* Ver detalle de paciente

Extras:

* Exportar listado a CSV
* Generar reporte por fecha de creación

---

## Decisiones de implementación

Se utilizó Angular 16 junto con PrimeNG 16 para la construcción de la interfaz.

El proyecto se desarrolló usando un solo módulo, ya que era un requerimiento de la prueba.

Se intentó aplicar una organización inspirada en arquitectura limpia mediante el uso de features. En este caso solo existe el feature de pacientes.

Dentro del feature:

* Se organizó por page (componente principal) y componentes hijos
* El componente padre contiene la mayor parte de la lógica
* Los componentes hijos (como modales) manejan su propia lógica interna

También dentro del mismo feature se encuentra el servicio correspondiente, encargado de consumir la API.

---

## Organización del proyecto

* features/patients
  Contiene toda la lógica del módulo de pacientes (componentes, servicios, modelos)

* core
  Contiene elementos globales y reutilizables como:

  * Interceptor de errores
  * Constantes
  * Servicio global de manejo de errores

Esta estructura se eligió para mantener el proyecto organizado y facilitar la escalabilidad en caso de agregar nuevos módulos.

---

## Librerías utilizadas

* PrimeNG → componentes UI
* xlsx → generación de archivos Excel
* Jasmine + Karma → pruebas unitarias

---

## Consumo de API

Se implementó un servicio para manejar todas las operaciones relacionadas con pacientes:

* Listar
* Crear
* Actualizar
* Eliminar
* Reportes

Se centralizó la lógica de consumo para mantener el código más limpio.

También se implementó un interceptor para el manejo global de errores.

---

## UI / Comportamiento

* Estados de carga en acciones importantes
* Botones deshabilitados mientras se procesan acciones
* Confirmación antes de eliminar
* Validaciones en formularios
* Mensajes de error cuando ocurre algún problema

---

## Pruebas unitarias

Se implementaron pruebas básicas usando Jasmine y Karma.

Se validan escenarios como:

* Creación de componentes
* Limpieza de filtros
* Paginación
* Acciones principales

Ejecutar pruebas:

ng test

---

## 🐳 Ejecución con Docker

También puedes ejecutar el frontend usando Docker sin necesidad de instalar Node o Angular.

Imagen disponible en Docker Hub:

docker.io/abrahambass/angular-prueba-tecnica

### Ejecutar solo el frontend

docker pull abrahambass/angular-prueba-tecnica
docker run -p 4200:4200 abrahambass/angular-prueba-tecnica

Abrir en:

http://localhost:4200

---

### Ejecutar todo el entorno (recomendado)

Se dejó un repositorio con docker-compose que levanta:

* Frontend
* Backend
* Base de datos

Repositorio:

https://github.com/AbrahamBass/prueba-tecnica-compose.git

Pasos:

1. Clonar:

git clone https://github.com/AbrahamBass/prueba-tecnica-compose.git

2. Entrar:

cd prueba-tecnica-compose

3. Ejecutar:

docker-compose up

Con esto todo queda funcionando automáticamente sin configuración adicional.

---

## Consideraciones finales

Se buscó mantener el proyecto lo más claro y organizado posible, aplicando buenas prácticas sin sobrecomplicar la solución.

La estructura permite escalar fácilmente agregando nuevos módulos en el futuro manteniendo el mismo enfoque por features.
