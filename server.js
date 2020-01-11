const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public/dist'));

app.listen(PORT, () => {
    console.log(`[InterviewPal-Server] Online & listening on port ${PORT}`);
});
