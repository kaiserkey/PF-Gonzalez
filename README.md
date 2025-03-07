# 📌 PF-GONZALEZ

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.4.

---

## 🚀 Iniciar el Proyecto

Para ejecutar el proyecto en modo desarrollo, sigue los siguientes pasos:

### 1️⃣ **Levantar el servidor Angular**

Ejecuta el siguiente comando en la terminal dentro del directorio del proyecto:

```bash
ng serve -o


Esto iniciará el servidor en `http://localhost:4200/` y abrirá automáticamente el navegador.

### 2️⃣ **Levantar JSON-Server**

El proyecto utiliza `json-server` como backend falso para simular la base de datos. Para iniciarlo, ejecuta:

```
json-server --watch db.json --port 3000


Esto levantará el servidor en `http://localhost:3000/` y expondrá los datos simulados.

---

## 🔑 Usuarios y Contraseñas

| **Usuario**   | **Email**                                                  | **Contraseña** | **Rol** |
| ------------- | ---------------------------------------------------------- | -------------- | ------- |
| Administrador | [admin@example.com](https://mailto:admin@example.com/)     | admin123       | Admin   |
| Usuario       | [usuario@example.com](https://mailto:usuario@example.com/) | usuario123     | Usuario |

> ⚠ Nota: Estos son los usuarios predefinidos en db.json. Puedes modificarlos según sea necesario.
> 

---

## 🛠 Comandos Útiles

### 📌 Generar un componente

Si necesitas generar un nuevo componente, usa:

```
ng generate component nombre-del-componente


También puedes usar la forma corta:

```
ng g c nombre-del-componente


### 📌 Construir el proyecto

Para compilar el proyecto y generar los archivos listos para producción:

```
ng build


Esto generará los archivos en la carpeta `dist/`.

---

## 🧪 Ejecutar Pruebas Unitarias

El proyecto usa Karma y Jasmine para pruebas unitarias. Para ejecutarlas, usa:

```
ng test


Si solo quieres ejecutar pruebas de un archivo específico (por ejemplo, las pruebas de inscripciones):

```
ng test --include=src/app/Tests/inscripciones.service.spec.ts


---

## 📚 Recursos Adicionales

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Guía de JSON-Server](https://github.com/typicode/json-server)
- [Documentación de Karma](https://karma-runner.github.io/latest/index.html)
- [Guía de Jasmine](https://jasmine.github.io/)