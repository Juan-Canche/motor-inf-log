const express = require('express');
const pl = require('tau-prolog');
require('tau-prolog/modules/lists')(pl);

const fs = require('fs');

const app = express();

app.use(express.json());

const PORT = 3000;

// Cargar base de conocimiento
const knowledgeBase = fs.readFileSync('./knowledge_base.pl', 'utf8');

// Endpoint
app.post('/query', (req, res) => {

    const { query } = req.body;

    console.log("Consulta recibida:", query);

    // Verificar consulta
    if (!query) {
        return res.status(400).json({
            error: 'No se proporcionó una consulta'
        });
    }

    // Crear sesión Prolog
    const session = pl.create(1000);

    // Cargar base de conocimiento
    session.consult(knowledgeBase, {

        success: () => {

            console.log("Base cargada");

            // Ejecutar consulta
            session.query(query, {

                success: () => {

                    console.log("Consulta válida");

                    // Obtener respuesta
                    session.answer(answer => {

                        console.log("Respuesta:", answer);

                        res.json({
                            result: pl.format_answer(answer)
                        });

                    });

                },

                error: err => {

                    console.log("Error query:", err);

                    res.status(500).json({
                        error: err.toString()
                    });

                }

            });

        },

        error: err => {

            console.log("Error consult:", err);

            res.status(500).json({
                error: err.toString()
            });

        }

    });

});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});