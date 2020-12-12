// importação
const $ = require('jquery');
require('bootstrap');
const Highcharts = require('highcharts');
const { format, parseISO } = require('date-fns');
const io = require('socket.io-client');

//funcao para gerar mensagem de erro
function mensagemDeErro(mensagem) {
    document.getElementById('mensagemDeErro').innerHTML = `<div class="toast shadow-lg mb-5 bg-white rounded" role="alert" data-delay="5000" aria-atomic="true" style="opacity:0.9;">
        <div class="toast-header bg-danger text-light">
            <span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span>
            <strong class="mr-auto">Atenção</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            <strong>${mensagem}</strong>
        </div>
    </div>`

    $('.toast').toast('show')
}

//funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem) {
    document.getElementById('mensagemDeErro').innerHTML = `<div class="toast shadow-lg mb-5 bg-white rounded" role="alert" data-delay="5000" aria-atomic="true" style="opacity:0.9;">
        <div class="toast-header bg-success text-light">
            <span class="fas fa-check-double" style="margin-right:5px;"></span>
            <strong class="mr-auto">Informação</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            <strong>${mensagem}</strong>
        </div>
    </div>`

    $('.toast').toast('show')
}

//funcao responsavel por imprimir na impressora
function imprimirImpressora(idReferencia) {
    let conteudo;

    conteudo = `<!doctype html>
        <html lang="pt-br">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <link href="fontawesome-free/css/all.css" rel="stylesheet">
                <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <title>Impressao</title>
                <link rel="stylesheet" type="text/css" href="./bootstrap/css/escopo-css-pagina.css">
                <style>
                    .text-center{
                        text-align: center;
                    }
                </style>
            </head>

        <body>
            <h3 class="text-center">Impressão dados hospede<h3>`
    conteudo += document.getElementById(idReferencia).innerHTML

    conteudo += `<script>
                    const $ = require('jquery');
                    require('bootstrap');
                    const Highcharts = require('highcharts');
                    const { format, parseISO } = require('date-fns');
            <script>
        </body>
    </html>`

    let tela_impressao = window.open('about:blank', '_blank', 'nodeIntegration=yes');

    tela_impressao.document.write(conteudo);
    setTimeout(() => {
        tela_impressao.window.print();
        tela_impressao.window.close();
    }, 1000);
}

//funcao reponsavel por alertar o usuario sobre executar determinada acao
function confirmarAcao(mensagem, funcao, value) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalAviso" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">
                        <span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span> Atenção
                    </h5>
                </div>
                <div class="modal-body"> 
                    <p><strong>${mensagem} Deseja continuar?</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Não</button>`
    if (value != null) {
        codigoHTML += `<button onclick="${funcao}; document.getElementById('modal').innerHTML='';" value="${value}" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>`
    } else {
        codigoHTML += `<button onclick=${funcao}; document.getElementById('modal').innerHTML='';" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>`
    }
    codigoHTML += `</div>
            </div>
        </div>
    </div>`

    document.getElementById('alert2').innerHTML = codigoHTML;

    $('#modalAviso').modal('show');
}

//funcao responsavel por gerar a tela de aguarde o carregamento
let timerCarregador;
function aguardeCarregamento(tipo) {
    let contCarregador = 0, codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.4vh; width: 100vw; z-index:1055;">
      <h5 class="text-center text-light">
        <img src="./img/loading.gif" class="rounded mx-auto d-block" style="height: 30px; width: 30px; margin-top: 48vh;">
        Aguarde...
      </h5>
    <div>`

    if (tipo) {
        document.getElementById('carregamento').innerHTML = codigoHTML;
        clearInterval(timerCarregador);
        timerCarregador = setInterval(function () {
            contCarregador++;

            if (contCarregador > 20) {
                codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.4vh; width: 100vw; z-index:1055; border-radius:10px;">
            <h5 class="text-center text-light" style="margin-top: 48vh;">
              Ops... Ouve algum problema! Tente novamente.
            </h5>
            <h6 class="text-center text-light">
              Aguarde 10 segundos para tentar novemante.
            </h6>
          <div>`

                document.getElementById('carregamento').innerHTML = codigoHTML;
                clearInterval(timerCarregador);

                setTimeout(function () { document.getElementById('carregamento').innerHTML = '' }, 10000)
            }

        }, 1000)
    } else {
        clearInterval(timerCarregador);
        setTimeout(function () { document.getElementById('carregamento').innerHTML = ''; }, 300)
    }
}