const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

/**
 * Lo principa que nos deja hacer un observador es poder emitir varios valores
 * Angular va a utilizar esto en muchos campos, formularios reactivos, peticiones, paraescuchar cosas o eventos dinamicos
 * La principal ventala es que me permite transmitir muchos datos
 * Permite hacer transformacion y cancelar el Observable en algun momento dado
 * Stream de datos (puede emitir multiples valores)
 * es posible escuchar constantemente: eventos, responsive, fetchs
 * se puede cancelar
 */

const doSomething = () => {
  return new Promise((resolve) => {
    // resolve('valor 1');
    // resolve('valor 2');
    setTimeout(() => {
      resolve('valor 3');
    }, 3000)
  });
}

const doSomething$ = () => { // el signo $ indica que es un observador
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next('valor 4 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 3000)
    setTimeout(() => {
      observer.next(null);
    }, 5000)
    setTimeout(() => {
      observer.next('valor 6 $');
    }, 8000)
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();