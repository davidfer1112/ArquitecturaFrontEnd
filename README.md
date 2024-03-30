# Ramas:

<br>

## Main: 
Esta rama solo debe contener versiones estables de la aplicación. Se debe crear una nueva versión en la rama `main` cada vez que se publique una nueva versión de la aplicación.

## Develop: 
Esta rama se utiliza para el desarrollo activo y la verificación del código. Los cambios se deben realizar en esta rama y luego `fusionarse en la rama main` cuando estén listos para ser publicados.

## Feature: 
Esta rama se utiliza para resolver las issues que se han encontrado en la aplicación. Se debe `crear una nueva rama Feature para cada issue` y luego fusionarse en la rama develop cuando se haya resuelto la issue.

## Nomenclatura commits:

```
  - Feature: "Feature: Nueva función"
  - Fix: "Fix: Solución error en función"
  - Update: "Update: Actualización en función" 
```

## Flujo de trabajo:

   1)  Se crea una nueva rama Feature para cada `nueva issue`.
   2)  Se realizan los cambios necesarios para resolver la issue en la rama `Feature`.
   3)  Se fusiona la rama Feature en la rama `develop`.
   4)  Se realizan pruebas en la rama develop para `verificar` que la issue se haya resuelto correctamente.
   5)  Se fusiona la rama develop en la rama `main`.
   6)  Se publica una nueva versión de la aplicación desde la rama `main`.

## Revisiones de Pull Request:

Todas las solicitudes de cambios (pull requests) deben ser revisadas por al menos un revisor antes de ser fusionadas en cualquier rama. Los revisores deben asegurarse de que los cambios sean correctos y que no introduzcan ningún error nuevo en la aplicación.

## Representación

<div align="center">
  <img height="300" src="https://github.com/LearnHub-Javeriana/Frontend-Electromind/assets/90224781/cd653e6c-118f-4e75-a530-4ece69c2d2ec"  />
</div>


