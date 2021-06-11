//------------------------------------------ Classe regra ---------------------------------------------------------

let VETORDEREGRAS = [];

//funcao responsavel por gerar o modal da tela de rules
async function telaRegras(){
    let codigoHTML = ``;

    let json = await requisicaoGET(`rules`, null);

    codigoHTML+=`<div class="modal fade" tabindex="-1" id="modalClasseRegra" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-balance-scale"></span> Regras</h5>
                    <button type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="shadow-lg p-3 mb-4 bg-white rounded">
                            <div class="row justify-content-md-center">
                                <div class="col-8">
                                    <button onclick="buttonsCriarAtualizar('cadastrar');" type="button" class="btn btn-outline-primary btn-block btn">
                                        <span class="fas fa-plus"></span> Criar regra
                                    </button>
                                </div>
                            </div>
                            <div class="row justify-content-md-center">
                                <div class="col-8">
                                    <div id="cadatrarOuModificarRegra" style="margin-top:5vh">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="shadow-lg p-3 mb-4 bg-white rounded">
                            <div class="row justify-content-md-center" style="margin-top:5vh">
                                <div class="col-10">
                                    <h5 class="text-center">Lista de regras</h5>
                                    <div class="col-12 layer1" style="position: relative; height: 40vh; z-index: 1; overflow: scroll; margin-right: 0px;">
                                        <ul class="list-group">`
                                            VETORDEREGRAS=[];
                                            for (const iterator of json.data) {
                                                VETORDEREGRAS.push(iterator);
                                                codigoHTML+=`<li class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div class="col-10" style="padding:1vh">`    
                                                        if(iterator.atention){
                                                            codigoHTML+=`<strong>${iterator.description}</strong>`
                                                        }else{
                                                            codigoHTML+=`${iterator.description}`
                                                        }
                                                    codigoHTML+=`</div>
                                                    <div class="col-2" style="padding:0">
                                                        <button onclick="carregarDadosRegra('${iterator._id}');" class="btn btn-info btn-sm">
                                                            <span class="fas fa-edit"></span>
                                                        </button>
                                                        <button onclick="confirmarAcao('Excluir regra!','excluirRegra(this.value)','${iterator._id}');" class="btn btn-outline-danger btn-sm" data-dismiss="modal">
                                                            <span class="fas fa-trash-alt"></span>
                                                        </button>
                                                    </div>
                                                </li>`
                                            }
                                        codigoHTML+=`</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

  document.getElementById('modal').innerHTML = codigoHTML;
  $('#modalClasseRegra').modal('show');
}

//funcao responsavel por gerar os botoes de cadastrar e atualizar
function buttonsCriarAtualizar(tipo, id){
    let codigoHTML = ``;

    codigoHTML+= `<div class="input-group mb-3">
        <input id="inputRegra" type="text" class="form-control" placeholder="Escreva a regra" aria-describedby="buttonCadastrarAtualizarRegra">`

    if(tipo=='cadastrar'){
        codigoHTML+=`<div class="input-group-append">
                <button onclick="if(validaDadosCampo(['#inputRegra'])){ cadastrarRegra() }else{ mensagemDeErro('Preencha o campo de regra!'); mostrarCamposIncorrreto(['inputRegra']);}" class="btn btn-primary" type="button" id="buttonCadastrarAtualizarRegra">Adicionar regra</button>
            </div>`
    }else{
        codigoHTML+=`<div class="input-group-append">
            <button onclick="if(validaDadosCampo(['#inputRegra'])){$('#modalClasseRegra').modal('hide'); confirmarAcao('Atualizar regra!','atualizarRegra(this.value)','${id}') }else{ mensagemDeErro('Preencha o campo de regra!'); mostrarCamposIncorrreto(['inputRegra']);}" class="btn btn-primary" type="button" id="buttonCadastrarAtualizarRegra">Atualizar regra</button>
        </div>`;
    }
    codigoHTML+=`</div>
    <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="regraAtencao">
        <label class="form-check-label" for="regraAtencao">Colocar em negrito</label>
    </div>`

    document.getElementById('cadatrarOuModificarRegra').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados de uma regra
function carregarDadosRegra(id){
    let dado = VETORDEREGRAS.find((element) => element._id == id);
    
    buttonsCriarAtualizar('atualizar',id);

    document.getElementById('inputRegra').value = dado.description;
    document.getElementById('regraAtencao').checked = dado.atention;
}

//funcao responsavel por cadastrar uma regra
async function cadastrarRegra() {
    try {
        let dado = {
            description: document.getElementById(`inputRegra`).value,
            atention: document.getElementById(`regraAtencao`).checked? true:false
        }

        await aguardeCarregamento(true);
        await requisicaoPOST(`rules`, dado, null);
        mensagemDeAviso(`Regra cadastrada com sucesso!`);
        await aguardeCarregamento(false);
        $('#modalClasseRegra').modal('hide');
        document.getElementById('modal').innerHTML = '';
        telaRegras();
    } catch (error) {
        mensagemDeErro(`Erro ao salvar regra!`);
    }
}

//funcao responsavel por atualizar uma regra
async function atualizarRegra(id) {
    try {
        let dado = {
            description: document.getElementById(`inputRegra`).value,
            atention: document.getElementById(`regraAtencao`).checked? true:false
        }

        await aguardeCarregamento(true);
        await requisicaoPUT(`rules/${id}`, dado, null);
        mensagemDeAviso(`Regra atualizada com sucesso!`);
        await aguardeCarregamento(false);
        document.getElementById('modal').innerHTML = '';
        telaRegras();
    } catch (error) {
        mensagemDeErro(`Erro ao atualizar regra!`);
    }
}

//funcao responsavel por excluir uma regra
async function excluirRegra(id) {
    try {
        await aguardeCarregamento(true);
        await requisicaoDELETE(`rules/${id}`, '', null);
        mensagemDeAviso(`Regra excluida com sucesso!`);
        await aguardeCarregamento(false);
        document.getElementById('modal').innerHTML = '';
        telaRegras();
    } catch (error) {
        mensagemDeErro(`Erro ao excluir regra!`);
    }
}