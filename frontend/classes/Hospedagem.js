// --------------------------------------------- Classe Hospedagem -------------------------------------

//funcao responsavel por gerar a tela de cadastrar hospedagem
function telaDeHospedagem(id, tipo) {
    codigoHTML = ``;

    codigoHTML += `<form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="checkinHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> CheckIn:</label>
                            <input type="date" class="form-control" id="checkinHospede" value="${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="checkoutHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> CheckOut:</label>
                            <input type="date" class="form-control" id="checkoutHospede">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="numeroQuartoHospede" class="text-primary"><span class="fas fa-hotel"></span> Quarto:</label>
                            <input type="text" class="form-control" id="numeroQuartoHospede" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="valorHospedagem" class="text-primary"><span class="fas fa-dollar-sign"></span> Valor:</label>
                            <input type="text" class="form-control" id="valorHospedagem" onkeypress="return permiteApenasNumeros();" onkeyup="this.value = mascara('money', this.value);">
                        </div>
                    </div>
                </form>
                <div class="mx-auto">`

    if (tipo == 'cadastrar') {
        codigoHTML += `<button type="button" onclick="if(validaDadosCampo(
            [
                '#checkinHospede',
                '#checkoutHospede',
                '#numeroQuartoHospede',
                '#valorHospedagem'
            ]) && validaValoresCampo(
                [
                    '#valorHospedagem'
                ])){ adicionarHospedagem('${id}'); }else{ mensagemDeErro('Preencha os campos necessarios!'); mostrarCamposIncorrreto(
                    [
                        'checkinHospede',
                        'checkoutHospede',
                        'numeroQuartoHospede',
                        'valorHospedagem'
                    ]); }" class="btn btn-primary" style="margin-top:10px;">
                                Cadastrar
                            </button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button type="button" onclick="if(validaDadosCampo(
            [
                '#checkinHospede',
                '#checkoutHospede',
                '#numeroQuartoHospede',
                '#valorHospedagem'
            ]) && validaValoresCampo(
                [
                    '#valorHospedagem'
                ])){ confirmarAcao('Atualizar esta hospedagem!','atualizarHospedagem(this.value);','${id}'); $('#modalExibirDadosHospede').modal('hide'); }else{ mensagemDeErro('Preencha os campos necessarios!'); mostrarCamposIncorrreto(
                    [
                        'checkinHospede',
                        'checkoutHospede',
                        'numeroQuartoHospede',
                        'valorHospedagem'
                    ]); }" class="btn btn-primary" style="margin-top:10px;">
                                Atualizar
                            </button>`
    }

    codigoHTML += `<button type="button" onclick="$('#areaDeAdicionarHospedagem').fadeOut(); $('#areaDeListagemDeHospedagem').fadeIn();" class="btn btn-outline-secondary" style="margin-top:10px;">
                        Cancelar
                    </button>
                </div>`

    document.getElementById(`areaDeAdicionarHospedagem`).innerHTML = codigoHTML;
}

//funcao responsavel por confirmar a excluisao de uma hospedagem
function confirmarExclusaoHospedagem(id, id_cliente) {
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
                    <p><strong>Excluir esta hospedagem! Deseja continuar?</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Não</button>
                    <button onclick="apagarReferenciaHospedagem('${id}','${id_cliente}');" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('alert2').innerHTML = codigoHTML;

    $('#modalAviso').modal('show');
}

//funcao responsavel por cadastrar uma hospedagem
async function cadastrarHospedagem() {
    try {
        let dado = {
            checkin: document.getElementById(`checkinHospede`).value,
            checkout: document.getElementById(`checkoutHospede`).value,
            fourth: document.getElementById(`numeroQuartoHospede`).value,
            price: parseFloat(document.getElementById(`valorHospedagem`).value)
        }

        await aguardeCarregamento(true);
        let result = await requisicaoPOST(`accommodations`, dado, null);
        mensagemDeAviso(`Hospedagem cadastrada com sucesso!`);
        await aguardeCarregamento(false);
        return result;
    } catch (error) {
        mensagemDeErro(`Erro ao salvar dados de hospedagem!`);
    }
}

//funcao responsavel por atualizar uma hospedagem
async function atualizarHospedagem(id) {
    try {
        let dado = {
            checkin: document.getElementById(`checkinHospede`).value,
            checkout: document.getElementById(`checkoutHospede`).value,
            fourth: document.getElementById(`numeroQuartoHospede`).value,
            price: parseFloat(document.getElementById(`valorHospedagem`).value)
        }

        await aguardeCarregamento(true);
        await requisicaoPUT(`accommodations/${id}`, dado, null);
        mensagemDeAviso(`Hospedagem atualizada com sucesso!`);
        await aguardeCarregamento(false);
        document.getElementById('modal').innerHTML = ``;
        if (validaDadosCampo(['#nomeDoHospede'])) {
            gerarListaDeHospedes('nome');
        } else {
            gerarListaDeHospedes('todos');
        }
    } catch (error) {
        mensagemDeErro(`Erro ao atualizar dados de hospedagem!`);
    }
}

//funcao responsavel por excluir uma hospedagem
async function excluirHospedagem(id) {
    try {
        await aguardeCarregamento(true);
        await requisicaoDELETE(`accommodations/${id}`, '', null);
        mensagemDeAviso(`Hospedagem excluida com sucesso!`);
        await aguardeCarregamento(false);
        if (validaDadosCampo(['#nomeDoHospede'])) {
            gerarListaDeHospedes('nome');
        } else {
            gerarListaDeHospedes('todos');
        }
    } catch (error) {
        mensagemDeErro(`Erro ao excluir dados de hospedagem!`);
    }
}