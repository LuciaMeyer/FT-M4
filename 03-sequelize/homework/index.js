const app = require('./server');
const { db } = require('./db');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true });
});




// cuando entra a escuchar el servidor, automáticamente crea la base de datos (sincroniza), y con el force: true la resetea para que arranque de cero