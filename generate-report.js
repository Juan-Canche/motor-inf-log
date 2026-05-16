'use strict';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const MARGIN = 85;
const BODY = '#000000';
const CODE_BG = '#f5f5f5';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  bufferPages: true,
  info: {
    Title: 'Motor de Inferencia Logica - Proyecto Final',
    Author: 'Juan Angel Canche Gongora, Mauricio Antonio De Lazaro Lara, Christopher May Paat',
    Subject: 'Teoria de Lenguajes de Programacion',
  }
});

const outputPath = path.join(__dirname, 'Reporte_Motor_Inferencia_Logica.pdf');
const output = fs.createWriteStream(outputPath);
doc.pipe(output);

function pW() { return doc.page.width - 2 * MARGIN; }

function checkBreak(needed) {
  if (doc.y + needed > doc.page.height - MARGIN) doc.addPage();
}

function p(text, opts) {
  doc.fontSize(12).font('Times-Roman').fillColor(BODY)
     .text(text, Object.assign({ align: 'justify', lineGap: 3 }, opts || {}));
  doc.moveDown(0.5);
}

function bullet(items) {
  items.forEach(item => {
    doc.fontSize(12).font('Times-Roman').fillColor(BODY)
       .text('• ' + item, { indent: 20, align: 'left', lineGap: 2 });
    doc.moveDown(0.15);
  });
  doc.moveDown(0.4);
}

function h1(num, text) {
  doc.addPage();
  doc.fontSize(14).font('Times-Bold').fillColor(BODY)
     .text(num + '. ' + text, { align: 'left' });
  const ly = doc.y + 3;
  doc.moveTo(MARGIN, ly).lineTo(MARGIN + pW(), ly)
     .strokeColor('#000000').lineWidth(0.75).stroke();
  doc.moveDown(0.9);
  doc.font('Times-Roman').fontSize(12).fillColor(BODY);
}

function h2(label, text) {
  checkBreak(40);
  doc.moveDown(0.5);
  doc.fontSize(13).font('Times-Bold').fillColor(BODY)
     .text(label + ' ' + text, { align: 'left' });
  doc.moveDown(0.4);
  doc.font('Times-Roman').fontSize(12).fillColor(BODY);
}

function h3(text) {
  checkBreak(30);
  doc.moveDown(0.3);
  doc.fontSize(12).font('Times-Bold').fillColor(BODY).text(text, { align: 'left' });
  doc.moveDown(0.25);
  doc.font('Times-Roman').fontSize(12).fillColor(BODY);
}

function codeBlock(text) {
  const w = pW();
  const pad = 8;
  const lines = text.split('\n');
  const blockH = lines.length * 12.5 + 2 * pad;
  checkBreak(blockH + 10);
  const startY = doc.y;
  doc.rect(MARGIN, startY, w, blockH).fill(CODE_BG);
  doc.rect(MARGIN, startY, 2.5, blockH).fill('#444444');
  doc.font('Courier').fontSize(9).fillColor('#1a1a1a')
     .text(text, MARGIN + 2.5 + pad, startY + pad, {
       width: w - pad * 2 - 2.5, lineGap: 1.5,
     });
  doc.moveDown(0.6);
}

// ─── PORTADA ──────────────────────────────────────────────────────────────────

doc.y = 115;

doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('Universidad Autónoma de Yucatán', { align: 'center' });
doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('Facultad de Matemáticas', { align: 'center' });
doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('Lic. en Ingeniería de Software', { align: 'center' });

doc.moveDown(2);

doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('TEORÍA DE LENGUAJES DE PROGRAMACIÓN', { align: 'center' });

doc.moveDown(2);

doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('PROYECTO FINAL', { align: 'center' });

doc.moveDown(2);

doc.fontSize(14).font('Times-Bold').fillColor(BODY)
   .text('MOTOR DE INFERENCIA LÓGICA COMO SERVICIO', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(13).font('Times-Bold').fillColor(BODY)
   .text('Programación Lógica, Funcional y Asíncrona', { align: 'center' });

doc.moveDown(3);

doc.fontSize(13).font('Times-Bold').fillColor(BODY)
   .text('Integrantes:', { align: 'center' });
doc.moveDown(0.6);
doc.fontSize(12).font('Times-Roman').fillColor(BODY)
   .text('Juan Ángel Canche Góngora', { align: 'center' });
doc.text('Mauricio Antonio De Lázaro Lara', { align: 'center' });
doc.text('Christopher May Paat', { align: 'center' });

doc.moveDown(3);

doc.fontSize(12).font('Times-Roman').fillColor(BODY)
   .text('Mayo 2026', { align: 'center' });

// ─── SECCION 1: INTRODUCCION ──────────────────────────────────────────────────

h1('1', 'Introducción');

p('El presente proyecto implementa un Motor de Inferencia Lógica como Servicio (MLaaS): una API REST construida con Node.js, Express y Tau Prolog que permite ejecutar consultas lógicas contra una base de conocimientos escrita en lenguaje Prolog. Su desarrollo, en el marco de la materia Teoría de Lenguajes de Programación, tiene como propósito central demostrar la aplicación práctica de tres paradigmas fundamentales: la programación lógica, la programación funcional y la programación asíncrona.');

p('Un motor de inferencia es un componente central en los sistemas de inteligencia artificial simbólica. Dado un conjunto de hechos y reglas que conforman la base de conocimientos, el motor es capaz de deducir nuevas conclusiones mediante razonamiento automático. A diferencia de los sistemas de aprendizaje automático, este enfoque simbólico garantiza que las inferencias sean correctas, trazables y explicables.');

p('El proyecto expone esta capacidad de inferencia a través de un servicio HTTP, permitiendo que cualquier cliente —navegador, aplicación móvil u otro microservicio— realice consultas lógicas sin necesidad de integrar directamente un intérprete de Prolog en su entorno.');

h2('1.1', 'Tecnologías Utilizadas');

bullet([
  'Node.js — Entorno de ejecución para JavaScript en el servidor, basado en el motor V8 de Chrome',
  'Express 5.2.1 — Framework web minimalista para construir la capa HTTP de la API REST',
  'Tau Prolog 0.3.4 — Intérprete de Prolog implementado íntegramente en JavaScript, sin dependencias nativas',
  'Nodemon 3.1.14 — Herramienta de desarrollo con reinicio automático del servidor ante cambios en el código',
]);

h2('1.2', 'Problema que Resuelve');

p('La integración de lógica declarativa en aplicaciones modernas suele requerir instalar entornos Prolog nativos (SWI-Prolog, GNU Prolog) y establecer comunicación entre procesos mediante sockets o llamadas al sistema. Este enfoque introduce dependencias nativas que complican el despliegue y la portabilidad.');

p('Este proyecto elimina esa barrera al embeber el intérprete Tau Prolog directamente en el proceso de Node.js, exponiendo sus capacidades mediante una API REST estándar accesible desde cualquier plataforma.');

h2('1.3', 'Dominio de Aplicación');

p('La base de conocimientos modela un sistema de gestión de contratos laborales con los siguientes elementos:');

bullet([
  'Empleados: entidades que participan en contratos (juan, maria)',
  'Contratos: documentos formales con condiciones específicas (contrato1, contrato2)',
  'Condiciones de contrato: incumplimiento, demora, aprobación',
  'Reglas derivadas: penalidad aplicable, advertencia requerida, contrato válido',
]);

// ─── SECCION 2: PARADIGMAS ────────────────────────────────────────────────────

h1('2', 'Paradigmas de Programación Utilizados');

p('El proyecto integra deliberadamente tres paradigmas de programación complementarios. Desde la perspectiva de la teoría de lenguajes, cada paradigma corresponde a un modelo computacional distinto: el cálculo lambda para el funcional, la lógica de primer orden para el lógico, y el modelo de concurrencia por eventos para el asíncrono. La combinación de estos paradigmas produce una arquitectura más expresiva que cualquier enfoque aislado.');

h2('2.1', 'Programación Lógica');

p('La base de conocimientos (knowledge_base.pl) está escrita en Prolog, el lenguaje más representativo de la programación lógica, cuyo fundamento teórico es la lógica de claúsulas definidas (Horn clauses). En este paradigma, los programas no especifican cómo calcular algo, sino qué es verdadero: la computación emerge del proceso de unificación y backtracking del motor de inferencia.');

h3('Hechos de la base de conocimientos:');

codeBlock(
  '% Empleados del sistema\n' +
  'empleado(juan).\n' +
  'empleado(maria).\n' +
  '\n' +
  '% Contratos registrados\n' +
  'contrato(contrato1).\n' +
  'contrato(contrato2).\n' +
  '\n' +
  '% Condiciones de los contratos\n' +
  'incumplimiento(contrato1).\n' +
  'demora(contrato2).\n' +
  'aprobado(contrato2).'
);

h3('Reglas de inferencia:');

codeBlock(
  '% Si un contrato tiene incumplimiento, aplica penalidad\n' +
  'penalidad_aplicable(X) :- incumplimiento(X).\n' +
  '\n' +
  '% Si un contrato tiene demora, se requiere advertencia\n' +
  'advertencia_requerida(X) :- demora(X).\n' +
  '\n' +
  '% Un contrato es valido si esta aprobado\n' +
  'contrato_valido(X) :- aprobado(X).'
);

p('El motor Tau Prolog aplica resolución SLD (Selective Linear Definite clause resolution): busca unificaciones de manera sistemática en el orden de declaración de las cláusulas, explorando el árbol de búsqueda con backtracking automático para encontrar todas las soluciones posibles.');

h2('2.2', 'Programación Funcional');

p('El servidor implementa un estilo funcional mediante funciones puras, composición de promesas y abstracción por funciones de orden superior. Estas técnicas tienen su fundamento teórico en el cálculo lambda: las funciones son ciudadanos de primera clase que pueden pasarse como argumentos y componerse entre sí.');

codeBlock(
  '// Funcion pura: mismo input -> mismo output, sin efectos secundarios\n' +
  'function normalizarConsulta(query) {\n' +
  '  return query.trim().replace(/\\s+/g, \' \');\n' +
  '}\n' +
  '\n' +
  '// Promisificacion: abstraccion funcional sobre la API callback de Tau Prolog\n' +
  'function cargarBase(session, kb) {\n' +
  '  return new Promise((resolve, reject) => {\n' +
  '    session.consult(kb, { success: resolve, error: reject });\n' +
  '  });\n' +
  '}\n' +
  '\n' +
  'function ejecutarQuery(session, query) {\n' +
  '  return new Promise((resolve, reject) => {\n' +
  '    session.query(query, { success: resolve, error: reject });\n' +
  '  });\n' +
  '}\n' +
  '\n' +
  'function obtenerRespuesta(session) {\n' +
  '  return new Promise((resolve) => {\n' +
  '    session.answer({ success: resolve, fail: resolve, error: resolve });\n' +
  '  });\n' +
  '}'
);

p('Las funciones cargarBase, ejecutarQuery y obtenerRespuesta son una cadena de transformaciones componibles: cada una recibe el resultado de la anterior, formando un pipeline funcional que convierte el API callback de Tau Prolog en un modelo de datos basado en Promises.');

h2('2.3', 'Programación Asíncrona');

p('Node.js emplea un modelo de concurrencia basado en un event loop de un solo hilo. Para operaciones de I/O —como cargar la base de conocimientos y ejecutar consultas en Tau Prolog—, se utiliza el patrón async/await, que permite escribir código asíncrono con sintaxis síncrona sin bloquear el servidor.');

codeBlock(
  'app.post(\'/query\', async (req, res) => {\n' +
  '  try {\n' +
  '    const { query } = req.body;\n' +
  '    if (!query) return res.status(400).json({ error: \'Consulta vacia\' });\n' +
  '\n' +
  '    const normalizedQuery = normalizarConsulta(query);\n' +
  '    const session = pl.create(1000);               // 1000 choice points\n' +
  '    await cargarBase(session, kb);                 // Paso 1: cargar hechos\n' +
  '    await ejecutarQuery(session, normalizedQuery); // Paso 2: analizar consulta\n' +
  '    const answer = await obtenerRespuesta(session);// Paso 3: obtener respuesta\n' +
  '\n' +
  '    res.json({ result: pl.format_answer(answer) });\n' +
  '  } catch (error) {\n' +
  '    res.status(500).json({ error: error.toString() });\n' +
  '  }\n' +
  '});'
);

p('Este patrón permite que el servidor maneje múltiples solicitudes concurrentemente: mientras una solicitud aguarda la inferencia de Tau Prolog, el event loop puede procesar otras peticiones entrantes, sin necesidad de crear hilos adicionales del sistema operativo.');

// ─── SECCION 3: ARQUITECTURA ──────────────────────────────────────────────────

h1('3', 'Arquitectura');

h2('3.1', 'Vista General del Sistema');

p('El sistema se organiza en tres capas que siguen el principio de separación de responsabilidades: la capa de presentación (cliente HTTP), la capa de lógica de aplicación (Express + Tau Prolog) y la capa de datos (base de conocimientos Prolog).');

codeBlock(
  '  +----------------------------------+\n' +
  '  |          Cliente HTTP            |\n' +
  '  |  (Postman / cURL / PowerShell)  |\n' +
  '  +---------------+------------------+\n' +
  '                  |\n' +
  '     POST /query  { "query": "..." }\n' +
  '                  |\n' +
  '  +---------------v------------------+\n' +
  '  |        Servidor Express          |\n' +
  '  |           (server.js)            |\n' +
  '  |                                  |\n' +
  '  |  1. Validar y normalizar         |\n' +
  '  |  2. Crear sesion Tau Prolog      |\n' +
  '  |  3. Cargar base de conocimiento  |\n' +
  '  |  4. Ejecutar consulta Prolog     |\n' +
  '  |  5. Formatear y retornar JSON    |\n' +
  '  +---------------+------------------+\n' +
  '                  |\n' +
  '  +---------------v------------------+\n' +
  '  |         Motor Tau Prolog         |\n' +
  '  |  Unificacion | SLD | Backtrack   |\n' +
  '  +---------------+------------------+\n' +
  '                  |\n' +
  '  +---------------v------------------+\n' +
  '  |      Base de Conocimientos       |\n' +
  '  |       (knowledge_base.pl)        |\n' +
  '  |  Hechos + Reglas en Prolog       |\n' +
  '  +----------------------------------+'
);

h2('3.2', 'Descripción de Componentes');

h3('server.js — Controlador Principal (74 líneas)');

p('Punto de entrada de la aplicación. Inicializa Express con middleware JSON, lee la base de conocimientos del sistema de archivos al arrancar, define el endpoint POST /query con su manejador asíncrono, y provee las funciones auxiliares promisificadas para interactuar con Tau Prolog. Incluye manejo de errores con códigos HTTP apropiados y logging de cada paso por consola.');

h3('knowledge_base.pl — Base de Conocimientos (27 líneas)');

p('Archivo Prolog independiente que contiene los hechos y reglas del dominio. Su independencia de la capa de infraestructura es un diseño deliberado: puede modificarse y extenderse sin necesidad de tocar el código del servidor, respetando el principio de separación de responsabilidades.');

h3('package.json — Manifiesto del Proyecto');

p('Define las dependencias de producción (express, tau-prolog), dependencias de desarrollo (nodemon) y los scripts de ejecución. El proyecto usa CommonJS (require/module.exports) por compatibilidad con Tau Prolog.');

h2('3.3', 'Flujo de Datos Completo');

codeBlock(
  '1.  CLIENTE  -> POST http://localhost:3000/query\n' +
  '                Body: { "query": "penalidad_aplicable(contrato1)." }\n' +
  '\n' +
  '2.  EXPRESS  -> Parsea JSON, extrae campo "query"\n' +
  '\n' +
  '3.  SERVER   -> normalizarConsulta(): elimina espacios redundantes\n' +
  '\n' +
  '4.  SERVER   -> pl.create(1000): nueva sesion Prolog\n' +
  '\n' +
  '5.  SERVER   -> cargarBase(): session.consult(kb)\n' +
  '                Carga todos los hechos y reglas en la sesion\n' +
  '\n' +
  '6.  SERVER   -> ejecutarQuery(): session.query(query)\n' +
  '                Analiza sintaxis y prepara la resolucion\n' +
  '\n' +
  '7.  PROLOG   -> Resolucion SLD:\n' +
  '                ?- penalidad_aplicable(contrato1).\n' +
  '                -> Regla: penalidad_aplicable(X) :- incumplimiento(X).\n' +
  '                -> Unifica: X = contrato1\n' +
  '                -> Cuerpo: ?- incumplimiento(contrato1). -> HECHO: true\n' +
  '\n' +
  '8.  SERVER   -> obtenerRespuesta() -> pl.format_answer() -> "true ;"\n' +
  '9.  CLIENTE  <- { "result": "true ;" }'
);

h2('3.4', 'Especificación de la API REST');

codeBlock(
  'Endpoint:    POST /query\n' +
  'URL base:    http://localhost:3000\n' +
  '\n' +
  'Peticion:\n' +
  '  Headers:  Content-Type: application/json\n' +
  '  Body:     { "query": "<consulta Prolog>" }\n' +
  '\n' +
  'Respuestas:\n' +
  '  200 OK:          { "result": "<respuesta formateada>" }\n' +
  '  400 Bad Request: { "error": "La consulta no puede estar vacia" }\n' +
  '  500 Server Err:  { "error": "<mensaje de error Tau Prolog>" }\n' +
  '\n' +
  'Formatos de resultado:\n' +
  '  "true ;"      Consulta satisfecha, mas soluciones disponibles\n' +
  '  "false."      Consulta insatisfecha\n' +
  '  "X = val ;"   Variable unificada con valor concreto'
);

// ─── SECCION 4: EJEMPLO DE EJECUCION ─────────────────────────────────────────

h1('4', 'Ejemplo de Ejecución');

h2('4.1', 'Instalación y Arranque del Servidor');

codeBlock(
  '# Instalar dependencias\n' +
  '$ npm install\n' +
  '\n' +
  '# Iniciar en modo produccion\n' +
  '$ npm start\n' +
  '\n' +
  '> motor-inferencia-logica@1.0.0 start\n' +
  '> node server.js\n' +
  'Servidor escuchando en http://localhost:3000'
);

h2('4.2', 'Verificación de un Hecho Simple');

p('La consulta más básica verifica si un hecho existe directamente en la base de conocimientos.');

h3('Solicitud:');
codeBlock(
  'POST http://localhost:3000/query\n' +
  'Content-Type: application/json\n' +
  '\n' +
  '{ "query": "empleado(juan)." }'
);

h3('Proceso de inferencia:');
codeBlock(
  '?- empleado(juan).\n' +
  '   -> empleado(juan).  [ENCONTRADO]\n' +
  'Resultado: true'
);

h3('Respuesta:');
codeBlock('{ "result": "true ;" }');

h2('4.3', 'Consulta con Variable y Backtracking');

p('Al utilizar una variable Prolog (identificada por iniciar con mayúscula), el motor busca todas las unificaciones posibles. El carácter ";" en la respuesta indica que existen más soluciones mediante backtracking.');

h3('Solicitud:');
codeBlock(
  'POST http://localhost:3000/query\n' +
  'Content-Type: application/json\n' +
  '\n' +
  '{ "query": "empleado(X)." }'
);

h3('Proceso de inferencia:');
codeBlock(
  '?- empleado(X).\n' +
  '   -> empleado(juan).  X = juan   [PRIMERA SOLUCION]\n' +
  '   -> empleado(maria). X = maria  [DISPONIBLE VIA BACKTRACKING]\n' +
  'Retorna primera solucion. ";" indica que hay mas.'
);

h3('Respuesta:');
codeBlock('{ "result": "X = juan ;" }');

h2('4.4', 'Inferencia Mediante Reglas — Caso Central');

p('Este caso ilustra el poder de la inferencia lógica: Tau Prolog deriva una conclusión que no está almacenada explícitamente, aplicando una regla sobre los hechos existentes.');

h3('Solicitud:');
codeBlock(
  'POST http://localhost:3000/query\n' +
  'Content-Type: application/json\n' +
  '\n' +
  '{ "query": "penalidad_aplicable(contrato1)." }'
);

h3('Resolución SLD paso a paso:');
codeBlock(
  '?- penalidad_aplicable(contrato1).\n' +
  '\n' +
  'Paso 1: Busca penalidad_aplicable/1 -> es cabeza de regla:\n' +
  '        penalidad_aplicable(X) :- incumplimiento(X).\n' +
  '\n' +
  'Paso 2: Unifica: X = contrato1\n' +
  '\n' +
  'Paso 3: Debe probar el cuerpo:\n' +
  '        ?- incumplimiento(contrato1). -> HECHO ENCONTRADO\n' +
  '\n' +
  'Conclusion: penalidad_aplicable(contrato1) es VERDADERO'
);

h3('Respuesta:');
codeBlock('{ "result": "true ;" }');

h2('4.5', 'Consulta Negativa — Closed World Assumption');

p('Cuando la consulta no puede satisfacerse con ningún hecho ni regla, Tau Prolog aplica la Closed World Assumption: lo que no puede probarse se asume falso.');

h3('Solicitud:');
codeBlock(
  'POST http://localhost:3000/query\n' +
  'Content-Type: application/json\n' +
  '\n' +
  '{ "query": "empleado(pedro)." }'
);

p('Pedro no existe en ningún hecho. Tau Prolog agota todas las posibilidades y concluye:');
codeBlock('{ "result": "false." }');

h2('4.6', 'Ejecución desde PowerShell (Windows)');

codeBlock(
  '# Hecho simple\n' +
  '$body = @{ query = \'empleado(juan).\' } | ConvertTo-Json -Compress\n' +
  'Invoke-RestMethod -Method Post -Uri "http://localhost:3000/query" `\n' +
  '  -ContentType "application/json" -Body $body\n' +
  '# result: true ;\n' +
  '\n' +
  '# Inferencia por regla\n' +
  '$body = @{ query = \'penalidad_aplicable(contrato1).\' } | ConvertTo-Json -Compress\n' +
  'Invoke-RestMethod -Method Post -Uri "http://localhost:3000/query" `\n' +
  '  -ContentType "application/json" -Body $body\n' +
  '# result: true ;\n' +
  '\n' +
  '# Consulta negativa\n' +
  '$body = @{ query = \'empleado(pedro).\' } | ConvertTo-Json -Compress\n' +
  'Invoke-RestMethod -Method Post -Uri "http://localhost:3000/query" `\n' +
  '  -ContentType "application/json" -Body $body\n' +
  '# result: false.'
);

// ─── SECCION 5: CONCLUSIONES ──────────────────────────────────────────────────

h1('5', 'Conclusiones y Extensiones');

h2('5.1', 'Conclusiones');

p('Este proyecto demuestra con éxito la integración de tres paradigmas de programación en un sistema cohesivo y funcional. El resultado es un microservicio de inferencia lógica completamente operativo que puede integrarse en cualquier arquitectura web moderna.');

h3('Logros Técnicos');

bullet([
  'Integración exitosa de Prolog en Node.js mediante Tau Prolog sin dependencias nativas ni procesos externos',
  'API REST completamente funcional que expone capacidades de inferencia lógica a cualquier cliente HTTP',
  'Diseño asíncrono que maneja múltiples solicitudes concurrentemente sin bloquear el servidor',
  'Separación clara entre lógica de dominio (knowledge_base.pl) e infraestructura (server.js)',
  'Base de conocimientos extensible: nuevos hechos y reglas se integran sin modificar el servidor',
]);


// ─── FIN ──────────────────────────────────────────────────────────────────────
doc.end();
output.on('finish', () => console.log('PDF generado: ' + outputPath));
output.on('error', (err) => { console.error('Error:', err); process.exit(1); });
