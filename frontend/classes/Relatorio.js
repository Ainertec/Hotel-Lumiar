//------------------------------------------ Classe relatorio ---------------------------------------------------------

//funcao responsavel por gerar o modal da tela de relatorio
function telaRelatorio(){
    let codigoHTML = ``;

    codigoHTML+=`<div class="modal fade" tabindex="-1" id="modalClasseRelatorio" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Relatório</h5>
                    <button type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5 class="text-center">Buscar dados</h5>
                    <div class="container">
                        <div class="row justify-content-md-center">
                            <div class="col-4">
                                <label for="nomeHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> De:</label>
                                <input type="date" class="form-control" id="datainicio">
                            </div>
                            <div class="col-4">
                                <label for="nomeHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> Até:</label>
                                <input type="date" class="form-control" id="datafim">
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="col-8">
                                <button onclick="gerarTabelaDeHospedagem();" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:15px">
                                    <span class="fas fa-search"></span> Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div id="resultadoRelatorio"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalClasseRelatorio').modal('show');
}


//funcao responsavel por buscar os dados e gerar a tabela de hospedagens
async function gerarTabelaDeHospedagem(){
    let codigoHTML=``, json = await requisicaoGET(`guests`, null);

    codigoHTML+=`<h5 class="text-center" style="margin-top:30px;">Tabela de hospedagens</h5>`;

    for (const hospede of json.data) {
        let ultimaHospedagem = retornaObjetoComDataMaisRecente(hospede.accommodations)
    
        codigoHTML+=`<table class="table table-bordered">
                <tr class="table-secondary">
                    <th colspan="3" class="text-center">
                        Hospede
                    </th>
                </tr>
                <tr class="table-info">
                    <td colspan="2">
                        Nome: <strong>${hospede.name}</strong>
                    </td>
                    <td>
                        CPF: <strong>${hospede.identification}</strong>
                    </td>
                </tr>
                <tr class="table-info">
                    <td>
                        Checkin: <span class="badge badge-success">${ultimaHospedagem.checkin}</span>
                    </td>
                    <td>
                        Checkout: <span class="badge badge-warning">${ultimaHospedagem.checkout}</span>
                    </td>
                    <td>
                        Valor: <strong style="color:red;">R$${ultimaHospedagem.price}</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <button onclick="document.getElementById('checkinAntigos${hospede._id}').hidden? document.getElementById('checkinAntigos${hospede._id}').hidden = false : document.getElementById('checkinAntigos${hospede._id}').hidden = true" type="button" class="btn btn-outline-primary">
                            <span class="fas fa-eye"></span> Todos os checkins
                        </button>
                    </td>
                </tr>
                <tfoot id="checkinAntigos${hospede._id}" hidden>`
                    for(const accommodation of hospede.accommodations){
                        codigoHTML+=`<tr class="table-warning">
                        <td>
                            Checkin: <span class="badge badge-success">${accommodation.checkin}</span>
                        </td>
                        <td>
                            Checkout: <span class="badge badge-warning">${accommodation.checkout}</span>
                        </td>
                        <td>
                            Valor: <strong style="color:red;">R$${accommodation.price}</strong>
                        </td>
                    </tr>`
                    }
                codigoHTML+=`</tfoot>
            </table>`
    }

    document.getElementById('resultadoRelatorio').innerHTML = codigoHTML;

}

//funcao responsavel por retornar objeto com data mais recente
function retornaObjetoComDataMaisRecente(objetos){
    let objetoFinal = null, dataMaior = {dia:0,mes:0,ano:0};
    
    for (const objeto of objetos) {
        let partesData = (objeto.checkin).split("-");
        if(dataMaior.ano <= parseInt(partesData[0]) && dataMaior.mes <= parseInt(partesData[1]) && dataMaior.dia < parseInt(partesData[2])){
            objetoFinal = objeto;
            dataMaior.dia = parseInt(partesData[2]);
            dataMaior.mes = parseInt(partesData[1]);
            dataMaior.ano = parseInt(partesData[0]);
        }
    }

    return objetoFinal;
}