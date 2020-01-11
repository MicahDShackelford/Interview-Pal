const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public/dist'));

app.get('/register', (req,res) => {
    res.sendFile("index.html", { root: "./public/dist" });
});

app.get('/login', (req,res) => {
    res.sendFile("index.html", { root: "./public/dist" });
});

app.listen(PORT, () => {
    console.log(`[InterviewPal-Server] Online & listening on port ${PORT}`);
});
