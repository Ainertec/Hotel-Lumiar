//------------------------------------------------- Classe hospede -----------------------------------------

//vetor responsavel por gerar o vetor de hospedes
let VETORDEHOSPEDES = [], VETORDEHOSPEDAGEM = [];

//funcao responsavel por gerar a tela de cadastro e atualizacao de hospede
function telaHospede(id) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalClasseHospede" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-user"></span> Dados do hospede</h5>
                                <button onclick="" type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div id="mensagemDeErroModal" class="justify-content-center"></div>
                            </div>
                            <div class="modal-body">

                                <form>
                                    <div class="form-group">
                                        <label for="nomeHospede" class="text-primary"><span class="fas fa-id-card"></span> Nome:</label>
                                        <input type="text" class="form-control" id="nomeHospede" placeholder="Nome do hospede">
                                    </div>
                                    <div class="form-group">
                                        <label for="enderecoHospede" class="text-primary"><span class="fas fa-map-marker-alt"></span> Endereço:</label>
                                        <input type="text" class="form-control" id="enderecoHospede" placeholder="Endereço do hospede">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="bairroHospede" class="text-primary"><span class="fas fa-map-marker-alt"></span> Bairro:</label>
                                            <input type="text" class="form-control" id="bairroHospede" placeholder="Bairro do hospede">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="cidadeHospede" class="text-primary"><span class="fas fa-map-marker-alt"></span> Cidade:</label>
                                            <input type="text" class="form-control" id="cidadeHospede" placeholder="Cidade do hospede">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="cepHospede" class="text-primary"><span class="fas fa-map-marker-alt"></span> CEP:</label>
                                            <input type="text" class="form-control" id="cepHospede" placeholder="CEP do hospede">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="celularHospede" class="text-primary"><span class="fas fa-phone-volume"></span> Celular:</label>
                                            <input type="text" class="form-control" id="celularHospede" placeholder="Celular do hospede">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="cpfHospede" class="text-primary"><span class="fas fa-id-card"></span> CPF:</label>
                                            <input type="text" class="form-control" id="cpfHospede" placeholder="CPF do hospede">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="obsHospede" class="text-primary"><span class="fas fa-info"></span> Observação:</label>
                                            <input type="text" class="form-control" id="obsHospede" placeholder="Observação">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="emailHospede" class="text-primary"><span class="fas fa-at"></span> Email:</label>
                                            <input type="email" class="form-control" id="emailHospede" placeholder="Email do hospede">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="nascimentoHospede" class="text-primary"><span class="fas fa-calendar-alt"></span> Data de Nascimento:</label>
                                            <input type="date" class="form-control" id="nascimentoHospede" placeholder="Data de nascimento">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="carroHospede" class="text-primary"><span class="fas fa-car"></span> Carro:</label>
                                            <input type="text" class="form-control" id="carroHospede" placeholder="Carro do hospede">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="placaCarroHospede" class="text-primary"><span class="fas fa-car"></span> Placa do carro:</label>
                                            <input type="text" class="form-control" id="placaCarroHospede" placeholder="Placa do carro">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="acompanhanteHospede" class="text-primary"><span class="fas fa-user-friends"></span> Acompanhante:</label>
                                        <input type="text" class="form-control" id="acompanhanteHospede" placeholder="Acompanhante do hospede">
                                    </div>
                                </form>
                          
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>`
    if (id) {
        codigoHTML += `<button type="button" onclick="atualizarHospede('${id}');" class="btn btn-primary">Atualizar</button>`
    } else {
        codigoHTML += `<button type="button" onclick="cadastrarHospede();" class="btn btn-primary">Cadastrar</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseHospede').modal('show');
}

//funcao responsavel por gerar a lista de hospedes de acordo com a busca
function gerarListaDeHospedes() {
    let codigoHTML = ``;

    codigoHTML += `<div class="list-group">`
    for (let hospede of VETORDEHOSPEDES) {
        codigoHTML += `<a href="#" onclick="modalExibirDadosHospede('${hospede._id}');" class="list-group-item list-group-item-action list-group-item-warning shadow-lg p-3 mb-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Nome: ${hospede.nome}</h5>
                            <small>Celular: ${hospede.celular}</small>
                        </div>
                        <p class="mb-1">CPF: ${hospede.cpf}</small></p>
                    </a>`
    }
    codigoHTML += `</div>`

    document.getElementById(`listaDeHospedes`).innerHTML = codigoHTML;
}

//funcao responsavel por gerar o modal de exibir os dados do hospede
function modalExibirDadosHospede(id) {
    let codigoHTML = ``;
    let dado = VETORDEHOSPEDES.find((element) => element._id == id);

    codigoHTML += `<div class="modal fade" id="modalExibirDadosHospede" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel"><span class="fas fa-user"></span> Dados do hospede</h5>
                                <button onclick="" type="button" class="close btn-danger" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div id="mensagemDeErroModal" class="justify-content-center"></div>
                            </div>
                            <div class="modal-body">

                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-id-card"></span> Nome:</label>
                                            <h6>${dado.nome}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Endereço:</label>
                                            <h6>${dado.endereco}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Bairro:</label>
                                            <h6>${dado.bairro}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Cidade:</label>
                                            <h6>${dado.cidade}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> CEP:</label>
                                            <h6>${dado.cep}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-phone-volume"></span> Celular:</label>
                                            <h6>${dado.celular}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-id-card"></span> CPF:</label>
                                            <h6>${dado.cpf}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-info"></span> Observação:</label>
                                            <h6>${dado.observacao}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-at"></span> Email:</label>
                                            <h6>${dado.email}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-calendar-alt"></span> Data de nascimento:</label>
                                            <h6>${dado.nascimento}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Carro:</label>
                                            <h6>${dado.carro}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Placa do carro:</label>
                                            <h6>${dado.placa}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-user-friends"></span> Acompanhante:</label>
                                            <h6>${dado.acompanhante}</h6>
                                        </div>
                                    </div>
                                    <div class="mx-auto">
                                        <button type="button" onclick="carregarDadosHospede('${dado._id}');" data-dismiss="modal" class="btn btn-primary btn-sm" style="margin-top:20px;">
                                            <span class="fas fa-edit"></span> Editar hospede
                                        </button>
                                        <button type="button" onclick="excluirHospede('${dado._id}');" class="btn btn-outline-danger btn-sm" data-dismiss="modal" style="margin-top:20px;">
                                            <span class="fas fa-trash"></span> Excluir hospede
                                        </button>
                                    </div>

                                </div>
                                <div class="container">
                                    <hr />
                                    <div id="areaDeListagemDeHospedagem">
                                        <h5 class="text-center">Lista de hospedagem</h5>

                                        <div class="col-8 mx-auto">
                                            <button type="button" onclick="$('#areaDeListagemDeHospedagem').fadeOut(); $('#areaDeAdicionarHospedagem').fadeIn();" class="btn btn-primary btn-block" style="margin-top:20px;">
                                                <span class="fas fa-plus"></span> Adicionar nova hospedagem <span class="fas fa-bed"></span>
                                            </button>
                                        </div>

                                        <table class="table table-sm" style="margin-top: 30px;">
                                            <thead>
                                                <tr class="bg-dark text-light">
                                                    <th scope="col">CheckIn</th>
                                                    <th scope="col">CheckOut</th>
                                                    <th scope="col">Quarto</th>
                                                    <th scope="col">Valor</th>
                                                    <th scope="col">Editar</th>
                                                    <th scope="col">Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody>`
    for (let hospedagem of dado.hospedagem) {
        codigoHTML += `<tr>
                                                <th><span class="badge badge-success">${hospedagem.checkin}</span></th>
                                                <th><span class="badge badge-warning">${hospedagem.checkout}</span></th>
                                                <th>Nº ${hospedagem.quarto}</th>
                                                <th class="text-danger">R$${(parseFloat(hospedagem.valor)).toFixed(2)}</th>
                                                <td>
                                                    <button type="button" class="btn btn-primary btn-sm">
                                                        <span class="fas fa-edit"></span> Editar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" class="btn btn-outline-danger btn-sm">
                                                        <span class="fas fa-trash"></span> Excluir
                                                    </button>
                                                </td>
                                            </tr>`
    }
    codigoHTML += `</tbody>
                                        </table>
                                    </div>
                                    <div id="areaDeAdicionarHospedagem">
                                        <form>
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
                                        <div class="mx-auto">
                                            <button type="button" onclick="adicionarHospedagem('${dado._id}');" class="btn btn-primary" style="margin-top:10px;">
                                                Cadastrar
                                            </button>
                                            <button type="button" onclick="$('#areaDeAdicionarHospedagem').fadeOut(); $('#areaDeListagemDeHospedagem').fadeIn();" class="btn btn-outline-secondary" style="margin-top:10px;">
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>`;

    document.getElementById('modal').innerHTML = codigoHTML;
    $(`#areaDeAdicionarHospedagem`).fadeOut();

    $('#modalExibirDadosHospede').modal('show');
}

//funcao responsavel por carregar os dados do hospede para atualizar
function carregarDadosHospede(id) {

    telaHospede(id);

    let dado = VETORDEHOSPEDES.find((element) => element._id == id);

    document.getElementById('nomeHospede').value = dado.nome;
    document.getElementById('enderecoHospede').value = dado.endereco;
    document.getElementById('bairroHospede').value = dado.bairro;
    document.getElementById('cidadeHospede').value = dado.cidade;
    document.getElementById('cepHospede').value = dado.cep;
    document.getElementById('celularHospede').value = dado.celular;
    document.getElementById('cpfHospede').value = dado.cpf;
    document.getElementById('obsHospede').value = dado.observacao;
    document.getElementById('emailHospede').value = dado.email;
    document.getElementById('nascimentoHospede').value = dado.nascimento;
    document.getElementById('carroHospede').value = dado.carro;
    document.getElementById('placaCarroHospede').value = dado.placa;
    document.getElementById('acompanhanteHospede').value = dado.acompanhante;
}

//funcao responsavel por adicionar uma hospedagem
function adicionarHospedagem(id) {
    let dado = VETORDEHOSPEDES.find((element) => element._id == id);

    dado.hospedagem.push({
        checkin: document.getElementById('checkinHospede').value,
        checkout: document.getElementById('checkoutHospede').value,
        quarto: document.getElementById('numeroQuartoHospede').value,
        valor: document.getElementById('valorHospedagem').value,
    })
}

//funcao responsavel por cadastrar o hospede
function cadastrarHospede() {
    let dado = {
        nome: document.getElementById('nomeHospede').value,
        endereco: document.getElementById('enderecoHospede').value,
        bairro: document.getElementById('bairroHospede').value,
        cidade: document.getElementById('cidadeHospede').value,
        cep: document.getElementById('cepHospede').value,
        celular: document.getElementById('celularHospede').value,
        cpf: document.getElementById('cpfHospede').value,
        observacao: document.getElementById('obsHospede').value,
        email: document.getElementById('emailHospede').value,
        nascimento: document.getElementById('nascimentoHospede').value,
        carro: document.getElementById('carroHospede').value,
        placa: document.getElementById('placaCarroHospede').value,
        acompanhante: document.getElementById('acompanhanteHospede').value,
        hospedagem: [],
    }

    console.log(dado)
    dado._id = parseInt(VETORDEHOSPEDES.length + 1);
    VETORDEHOSPEDES.push(dado)
}

//funcao responsavel por atualizar o hospede
function atualizarHospede(id) {
    let dado = VETORDEHOSPEDES.find((element) => element._id == id);

    dado.nome = document.getElementById('nomeHospede').value;
    dado.endereco = document.getElementById('enderecoHospede').value;
    dado.bairro = document.getElementById('bairroHospede').value;
    dado.cidade = document.getElementById('cidadeHospede').value;
    dado.cep = document.getElementById('cepHospede').value;
    dado.celular = document.getElementById('celularHospede').value;
    dado.cpf = document.getElementById('cpfHospede').value;
    dado.observacao = document.getElementById('obsHospede').value;
    dado.email = document.getElementById('emailHospede').value;
    dado.nascimento = document.getElementById('nascimentoHospede').value;
    dado.carro = document.getElementById('carroHospede').value;
    dado.placa = document.getElementById('placaCarroHospede').value;
    dado.acompanhante = document.getElementById('acompanhanteHospede').value;
    dado.hospedagem

    console.log(dado)

    let posicao = VETORDEHOSPEDES.findIndex((element) => element._id == id);

    VETORDEHOSPEDES[posicao] = dado;

}

//funcao responsavel por apagar o hospede
function excluirHospede(id) {
    let posicao = VETORDEHOSPEDES.findIndex((element) => element._id == id);

    delete VETORDEHOSPEDES[posicao];
}