const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');

const app = express();

const users = [
  {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
  {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'}
]

app.use(morgan('dev'));
app.use(cookieparser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenidos a Henry!</h1>
    ${req.cookies.userId ? `
      <a href='/home'>Perfil</a>
      <form method='post' action='/logout'>
        <button>Salir</button>
      </form>
      ` : `
      <a href='/login'>Ingresar</a>
      <a href='/register'>Registrarse</a>
      `}
  `)
});

app.get('/register', (req, res) => {
  res.send(`
    <h1>Registrarse</h1>
    <form method='post' action='/register'>
      <input name='name' placeholder='Nombre' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Registrarse' />
    </form>
    <a href='/login'>Iniciar sesión</a>
  `)
});

app.get('/login',  (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Ingresar' />
    </form>
    <a href='/register'>Registrarse</a>
  `)
});

app.listen(3000, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:3000');
 }
});
