//---------------------------------------- Classe impressao --------------------------------------

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
                    label{
                        font-size:14px;
                    }
                    table{
                        font-size:14px;
                    }
                    .btn{
                        display:none;
                    }
                </style>
            </head>

        <body>
            <img src="img/logo.png" class="rounded mx-auto d-block" style="width: 100px; margin: 20px;" alt="...">
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

//funcao responsavel por imprimir a via do hospede
async function imprimirViaHospede(idHospede) {
    let conteudo = ``;
    let dado = VETORDEHOSPEDES.find((element) => element._id == idHospede);
    let hospedagem = retornaObjetoMaisRecente(dado.accommodations);
    let json = await requisicaoGET(`rules`, null);

    conteudo += `<!doctype html>
        <html lang="pt-br">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <title>Impressao</title>
            </head>
            <body>

                <div class="container">
                    <div class="card border-dark mb-3" style="max-width: 100vw;">
                        <div class="card-header">Dados do Hospede</div>
                        <div class="card-body text-dark">
                            <h4 class="card-title"><em><u>Seja bem vindo ao Hotel Lumiar</u></em></h4>
                            <div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Nome: ${dado.name}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Tel.: (**)***${dado.phone.substr(7)}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">CPF: ***.**${dado.identification.substr(5)}</p>
                                </div>
                            </div>
                            <div div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Email: *****${dado.email.substr(5)}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Nascido em: ****${dado.dateBirth.substr(4)}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">CEP: ${dado.address.cep}</p>
                                </div>
                            </div>
                            <div div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Cidade: ${dado.address.city}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Bairro: ${dado.address.district}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Rua: ******${dado.address.street.substr(6)}</p>
                                </div>
                            </div>
                            <div div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Veiculo: ${dado.car.model}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Placa: **${dado.car.plate.substr(2)}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Entrada: ${hospedagem.checkin}</p>
                                </div>
                            </div>
                            <div div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Saída: ${hospedagem.checkout}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Quarto: ${hospedagem.fourth}</p>
                                </div>
                                <div class="col-sm">
                                    <p class="card-text">Preço: R$${(parseFloat(hospedagem.price)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div div class="row">
                                <div class="col-sm">
                                    <p class="card-text">Acompanhente: ${dado.escort}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card border-dark mb-3" style="max-width: 100vw; heigth:100%;">
                        <div class="card-header">Informações do Hotel</div>
                        <div class="card-body text-dark" style="display:grid; grid-template-columns: auto auto;">`
                            for (const iterator of json.data) {
                                conteudo+=`<p class="card-text">${iterator.atention? '<strong>':''}* ${iterator.description}${iterator.atention? '</strong>':''}</p>`
                            }
                        conteudo+=`</div>
                    </div>
                </div>

                <script>
                    const $ = require('jquery');
                    require('bootstrap');
                </script>
            </body>
        </html>`

    let tela_impressao = window.open('about:blank', '_blank', 'nodeIntegration=yes');

    tela_impressao.document.write(conteudo);
    setTimeout(() => {
        tela_impressao.window.print();
        tela_impressao.window.close();
    }, 1000);
}

//funcao responsavel por buscar objeto masi recente
function retornaObjetoMaisRecente(objetos){
    let newData = 0, objeto = null;

    for (const iterator of objetos) {
        let partesData = (iterator.checkin).replace(/-/g,'');
        if(parseInt(partesData) > newData){
            newData = parseInt(partesData);
            objeto = iterator;
        }
    }

    return objeto;
}