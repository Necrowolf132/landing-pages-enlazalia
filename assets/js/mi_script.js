
$(document).ready(function () {
  var aqui = $('#sacar-imagen').offset().top
  console.log(aqui)
  $('a[href^="#Packs"]').click(function () {
    var destino = $(this.hash)
    if (destino.length == 0) {
      destino = $('a[name="' + this.hash.substr(1) + '"]')
    }
    if (destino.length == 0) {
      destino = $('html')
    }
    $('html, body').animate({ scrollTop: destino.offset().top }, 2000)
    return false
  })
  // Ajax compras
  var timeAleatorio = Math.floor(Math.random() * (9000 - 4000)) + 4000
  var data = $.ajax({
    method: 'GET',
    url: 'assetbuild/dataApr.json',
    dataType: 'json'
  }).always(function () {
    console.log('Se ejecuto')
  }).done(
    generate(timeAleatorio)
  ).fail(function () {
    console.log('Fallo el recurso')
  })
  function generate (numver) {
    if (numver < 1000) {
      numver = 1000
    }
    timeAleatorio = Math.floor(Math.random() * (12001 - 8000)) + 8000
    setTimeout(function () {
      var sujetoaleatorio = Math.floor(Math.random() * (299 - 1)) + 1
      var myData = data.responseJSON
      $.notify({
        // options
        icon: 'fa fa-exclamation-triangle',
        title: 'Atención!',
        message: '<i>' + myData[sujetoaleatorio].nombre + ' ' + myData[sujetoaleatorio].apellido + '</i>,' + '<br> <i>ha aprovechado la oferta.</i>' + '<br> <i>Recuerda que es por tiempo limitada</i>'
      }, {
        // settings
        element: 'body',
        position: null,
        type: 'info',
        allow_dismiss: true,
        newest_on_top: true,
        showProgressbar: false,
        placement: {
          from: 'bottom',
          align: 'right'
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 2000,
        timer: 4000,
        url_target: '_blank',
        mouse_over: 'pause',
        animate: {
          enter: 'animated bounceIn',
          exit: 'animated bounceOut'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="myalerts alert alert-{0}" role="alert" style="width: auto; min-width: 200px;">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<span data-notify="icon"></span> ' +
                    '<span class="titleMislalertas" data-notify="title">{1}</span><br> ' +
                    '<span class="mensaje" data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a>' +
                    '</div>'
      })
      generate(timeAleatorio)
    }, numver)
  }
});
(function () {
  'use strict'
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
})()
