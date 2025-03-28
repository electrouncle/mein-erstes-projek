const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware für JSON-Parsing
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Basis-Route
app.get('/', (req, res) => {
    console.log('Basis-Route wurde aufgerufen');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('Willkommen bei meiner ersten Web-Anwendung!');
});

// Die Addier-Funktion als API-Endpunkt
app.get('/addiere/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const ergebnis = a + b;
    console.log(`Addiere ${a} + ${b} = ${ergebnis}`);
    res.setHeader('Content-Type', 'application/json');
    res.json({ ergebnis });
});

// Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error('Fehler aufgetreten:', err.stack);
    res.status(500).send('Etwas ist schief gelaufen!');
});

// 404 Handler
app.use((req, res) => {
    console.log('404 für URL:', req.url);
    res.status(404).send('Seite nicht gefunden');
});

// Server starten
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf Port ${port}`);
    console.log(`Server ist bereit für Anfragen`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM Signal empfangen. Server wird beendet...');
    server.close(() => {
        console.log('Server wurde beendet');
        process.exit(0);
    });
});
