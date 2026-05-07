# Motor de Inferencia Lógica como Servicio

Proyecto desarrollado con Node.js, Express y Tau Prolog que permite ejecutar consultas lógicas sobre una base de conocimiento escrita en Prolog mediante una API REST.

---

# Descripción

El sistema funciona como un motor de inferencia simbólica capaz de recibir consultas en formato Prolog y retornar resultados inferidos automáticamente utilizando reglas declarativas.

El proyecto integra distintos paradigmas de programación estudiados en la materia:

- Programación lógica
- Programación funcional
- Programación asíncrona

---

# Tecnologías utilizadas

- Node.js
- Express
- Tau Prolog
- Nodemon
- JavaScript
- Prolog

---

# Estructura del proyecto

```txt
motor-inferencia-logica/
│
├── server.js
├── knowledge_base.pl
├── package.json
├── README.md
├── .gitignore
└── reporte.pdf
```

---

# Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al directorio:

```bash
cd motor-inferencia-logica
```

Instalar dependencias:

```bash
npm install
```

---

# Instalación manual de dependencias

```bash
npm install express tau-prolog
npm install --save-dev nodemon
```

---

# Ejecución

Modo normal:

```bash
npm start
```

Modo desarrollo con reinicio automático usando Nodemon:

```bash
npm run dev
```

El servidor se ejecutará en:

```txt
http://localhost:3000
```

---

# Endpoint disponible

## POST /query

Permite enviar consultas Prolog al motor de inferencia lógica.

---

# Ejemplo de consulta

## Request

```json
{
  "query": "employee(juan)."
}
```

---

## Response

```json
{
  "result": "true ;"
}
```

---

# Consulta con variables

## Request

```json
{
  "query": "employee(X)."
}
```

---

## Response

```json
{
  "result": "X = juan ;"
}
```

---

# Base de conocimiento

La base de conocimiento se encuentra en el archivo:

```txt
knowledge_base.pl
```

Ejemplo:

```prolog
% =========================
% HECHOS
% =========================

employee(juan).
employee(maria).

contract(contract1).
contract(contract2).

breach(contract1).
delay(contract2).

approved(contract2).

% =========================
% REGLAS
% =========================

penalty_applicable(X) :-
    breach(X).

warning_required(X) :-
    delay(X).

valid_contract(X) :-
    approved(X).
```

---

# Flujo de ejecución

1. El cliente envía una consulta lógica mediante HTTP.
2. El servidor Express recibe la consulta.
3. Tau Prolog carga la base de conocimiento.
4. El motor lógico ejecuta la inferencia.
5. El resultado se retorna en formato JSON.

---

# Paradigmas de programación utilizados

## Programación lógica

Implementada mediante Prolog utilizando:

- hechos
- reglas
- inferencia lógica

Ejemplo:

```prolog
penalty_applicable(X) :-
    breach(X).
```

---

## Programación funcional

Aplicada en JavaScript mediante:

- funciones
- transformación de datos
- modularidad

---

## Programación asíncrona

Implementada con Node.js utilizando:

- callbacks
- async/await
- manejo concurrente de solicitudes HTTP

---

# Arquitectura del sistema

```txt
Cliente
   ↓
API REST (Express)
   ↓
Tau Prolog
   ↓
Base de conocimiento
```

---

# Herramientas de prueba

La API puede probarse utilizando:

- Postman
- Thunder Client
- curl

---

# Ejemplo usando curl

```bash
curl -X POST http://localhost:3000/query \
-H "Content-Type: application/json" \
-d "{\"query\":\"employee(juan).\"}"
```

---

# Resultados esperados

Consulta:

```json
{
  "query": "penalty_applicable(contract1)."
}
```

Resultado:

```json
{
  "result": "true ;"
}
```

---

Consulta:

```json
{
  "query": "warning_required(contract2)."
}
```

Resultado:

```json
{
  "result": "true ;"
}
```

---

Consulta:

```json
{
  "query": "employee(pedro)."
}
```

Resultado:

```json
{
  "result": "false."
}
```

---

# Autor

Juan Ángel Canché Góngora