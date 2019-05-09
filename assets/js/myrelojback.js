const Sabertiempo = FechaFutura => {
  let ahora = new Date(), tiempofutura= new Date(FechaFutura);
  let tiempoRemanente = (tiempofutura - ahora + 1000) / 1000;
  let segundos = ('0' + Math.floor(tiempoRemanente % 60)).slice(-2);
  let minutos =  ('0' + Math.floor(tiempoRemanente / 60  % 60)).slice(-2);
  let horas =  ('0' + Math.floor(tiempoRemanente / 3600  % 96)).slice(-2);

  // Aui dejo el como se sacarian los ias si los llego a necesitar en el futuro 'May 07 2019 15:59:00'

  //let dias =  Math.floor(tiempoRemanente / (3600  * 24));

  return {
      tiempoRemanente,
      segundos,
      minutos,
      horas
  }

};

const contadorRegresoivo = (Fechafutura, elemenHTML, MensajeFinal) => {
    const elemento = document.getElementById(elemenHTML);
    const actualizarTiempo = setInterval(() => {
        let Time = Sabertiempo(Fechafutura);
        elemento.innerHTML =  `${Time.horas}:${Time.minutos}:${Time.segundos}`;
        if(Time.tiempoRemanente <= 1){
            clearInterval(actualizarTiempo);
            elemento.innerHTML = MensajeFinal;
        }
    }, 1000);
};

contadorRegresoivo('May 12 2019 21:00:00 GMT+0200', 'reloj', 'La Oferta ha Finalizado');