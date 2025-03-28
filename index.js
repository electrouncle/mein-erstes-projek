const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware für JSON-Parsing
app.use(express.json());

// Basis-Route
app.get('/', (req, res) => {
    res.send('Willkommen bei meiner ersten Web-Anwendung!');
});

// Die Addier-Funktion als API-Endpunkt
app.get('/addiere/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const ergebnis = a + b;
    res.json({ ergebnis });
});

// Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Etwas ist schief gelaufen!');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('Seite nicht gefunden');
});

// Server starten
app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf Port ${port}`);
});
