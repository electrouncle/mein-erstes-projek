const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
