const express = require('express');
const pl = require('tau-prolog');
require('tau-prolog/modules/lists')(pl);
const fs = require('fs');

const app = express();
app.use(express.json());

const PORT = 3000;

const knowledgeBase = fs.readFileSync('./knowledge_base.pl', 'utf8');

const normalizarConsulta = (query) =>
    String(query)
        .trim()
        .replace(/\s+/g, ' ');

const cargarBase = (session, kb) =>
    new Promise((resolve, reject) => {
        session.consult(kb, {
            success: () => resolve(),
            error: (err) => reject(err)
        });
    });

const ejecutarQuery = (session, query) =>
    new Promise((resolve, reject) => {
        session.query(query, {
            success: () => resolve(),
            error: (err) => reject(err)
        });
    });

const obtenerRespuesta = (session) =>
    new Promise((resolve) => {
        session.answer(answer => resolve(answer));
    });

// Endpoint con async/await
app.post('/query', async (req, res) => {

    const { query } = req.body;
    const consultaNormalizada = normalizarConsulta(query);

    console.log("Consulta recibida:", consultaNormalizada);

    if (!consultaNormalizada) {
        return res.status(400).json({ error: 'No se proporcionó una consulta' });
    }

    const session = pl.create(1000);

    try {
        await cargarBase(session, knowledgeBase);
        console.log("Base cargada");

        await ejecutarQuery(session, consultaNormalizada);
        console.log("Consulta válida");

        const answer = await obtenerRespuesta(session);
        console.log("Respuesta:", answer);

        res.json({ result: pl.format_answer(answer) });

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: err.toString() });
    }

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});