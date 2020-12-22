// --------------------------------------------- Classe Hospedagem -------------------------------------

//funcao responsavel por gerar a tela de cadastrar hospedagem
function telaDeHospedagem(id, tipo) {
    codigoHTML = ``;

    codigoHTML += `<form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="checkinHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> CheckIn:</label>
                            <input type="date" class="form-control" id="checkinHospede">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="checkoutHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> CheckOut:</label>
                            <input type="date" class="form-control" id="checkoutHospede">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="numeroQuartoHospede" class="text-primary"><span class="fas fa-hotel"></span> Quarto:</label>
                            <input type="number" class="form-control" id="numeroQuartoHospede" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="valorHospedagem" class="text-primary"><span class="fas fa-dollar-sign"></span> Valor:</label>
                            <input type="number" class="form-control" id="valorHospedagem">
                        </div>
                    </div>
                </form>
                <div class="mx-auto">`

    if (tipo == 'cadastrar') {
        codigoHTML += `<button type="button" onclick="adicionarHospedagem('${id}');" class="btn btn-primary" style="margin-top:10px;">
                                Cadastrar
                            </button>`
    } else if (tipo == 'atualizar') {
        codigoHTML += `<button type="button" onclick="atualizarHospedagem('${id}');" class="btn btn-primary" style="margin-top:10px;">
                                Atualizar
                            </button>`
    }

    codigoHTML += `<button type="button" onclick="$('#areaDeAdicionarHospedagem').fadeOut(); $('#areaDeListagemDeHospedagem').fadeIn();" class="btn btn-outline-secondary" style="margin-top:10px;">
                        Cancelar
                    </button>
                </div>`

    document.getElementById(`areaDeAdicionarHospedagem`).innerHTML = codigoHTML;
}

//funcao responsavel por cadastrar uma hospedagem
async function cadastrarHospedagem() {
    try {
        let dado = {
            checkin: document.getElementById(`checkinHospede`).value,
            checkout: document.getElementById(`checkoutHospede`).value,
            fourth: document.getElementById(`numeroQuartoHospede`).value,
            price: document.getElementById(`valorHospedagem`).value
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
            price: document.getElementById(`valorHospedagem`).value
        }

        await aguardeCarregamento(true);
        await requisicaoPUT(`accommodations/${id}`, dado, null);
        mensagemDeAviso(`Hospedagem atualizada com sucesso!`);
        await aguardeCarregamento(false);
        $('#modalExibirDadosHospede').modal('hide');
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
    } catch (error) {
        mensagemDeErro(`Erro ao excluir dados de hospedagem!`);
    }
}