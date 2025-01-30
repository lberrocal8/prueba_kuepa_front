# Prueba Fullstack Dev: Kuepa
Esta sección abarca el stack del front-end de la aplicación. Las siguientes son las tecnologias utilizadas para la construcción del mismo:

- **Next.js** (última versión disponible: v15.1.6).
- **Node** (última versión disponible: v22.12.0).
- **Tailwind CSS** (última versióin disponible: v4.0).


## Instalación

El proceso de Instalación solo incluye los siguientes pasos:

- Clonar el repositorio de github:

```bash
  git clone https://github.com/lberrocal8/prueba_kuepa_front.git
```

- Desde la carpeta raiz del proyecto, abrir una terminal de comandos y ejecutar en modo desarrollador:

```bash
  npm run dev
```

Ingresar en tu navegador preferido y visitar la página http://localhost:3000 para ver el proyecto en funcionamiento.


## Documentación

El flujo de trabajo de la aplicación es el siguiente:

- Antes de iniciar sesión, el usuario debe estar registrado, por lo que si no lo ha hecho, es el primer paso.
- Luego del registro exitoso, se debe iniciar sesión con las credenciales registradas (tenga presente que no es posible reestablecer la contraseña de un usuario, por lo que si la olvida, es imposible volver a acceder con dicha cuenta).
- Un vez el ingreso sea exitoso, se mostrará un panel de control. Del lado izquierdo, la clase en vivo en formato video y del lado derecho, el chat en vivo de la sala, en el cual puede interactuar con otros usuarios en tiempo real.
