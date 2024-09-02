// Esta utilidad nos permite arrojar errores personalizados
// En vez de usar los errores genericos de node con New Error(), podemos importar utils/error.js y usar la funcion err() para arrojar errores personalizados con un code determinado.
const err = (message, code) => {
  let e = new Error(message);
  if (code) {
    e.statusCode = code;
  }
  return e;
};

export default err;
