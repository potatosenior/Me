const date_time = document.getElementById("date_time");
const week_days = [
  "segunda-feira",
  "terçar-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
];
const month_days = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
// data inicial
date_time.innerHTML =
  new Date().getDate() +
  "/" +
  new Date().getMonth() +
  "/" +
  new Date().getFullYear() +
  "<br>" +
  new Date().toLocaleTimeString();

// atualizar a data a cada segundo
setInterval(() => {
  let date = new Date();

  date_time.innerHTML =
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    "<br>" +
    date.toLocaleTimeString();

  date_time.title =
    week_days[date.getDay() - 1] +
    ", " +
    date.getDate() +
    " de " +
    month_days[date.getMonth() - 1] +
    " de " +
    date.getFullYear();
}, 1000);
