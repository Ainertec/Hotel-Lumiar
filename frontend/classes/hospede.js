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
                                            <input type="text" class="form-control" id="obsHospede" placeholder="Observação" value="Nenhuma.">
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
async function gerarListaDeHospedes(tipo) {
    let codigoHTML = ``, json = null;

    VETORDEHOSPEDES = [];

    if (tipo == 'nome') {
        json = await requisicaoGET(`guests/${document.getElementById('nomeDoHospede').value}`, null);
    } else if (tipo == 'todos') {
        json = await requisicaoGET(`guests`, null);
    }

    codigoHTML += `<div class="list-group">`
    for (let hospede of json.data) {
        VETORDEHOSPEDES.push(hospede)
        codigoHTML += `<a href="#" onclick="modalExibirDadosHospede('${hospede._id}');" class="list-group-item list-group-item-action list-group-item-warning shadow-lg p-3 mb-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Nome: ${hospede.name}</h5>
                            <small>Celular: ${hospede.phone}</small>
                        </div>
                        <p class="mb-1">CPF: ${hospede.identification}</small></p>
                    </a>`
    }
    codigoHTML += `</div>`

    document.getElementById(`listaDeHospedes`).innerHTML = ``;
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
                            <div class="modal-body" id="dadosHospedeImpressao">

                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-id-card"></span> Nome:</label>
                                            <h6>${dado.name}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Endereço:</label>
                                            <h6>${dado.address.street}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Bairro:</label>
                                            <h6>${dado.address.district}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Cidade:</label>
                                            <h6>${dado.address.city}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> CEP:</label>
                                            <h6>${dado.address.cep}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-phone-volume"></span> Celular:</label>
                                            <h6>${dado.phone}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-id-card"></span> CPF:</label>
                                            <h6>${dado.identification}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-info"></span> Observação:</label>
                                            <h6>${dado.note}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-at"></span> Email:</label>
                                            <h6>${dado.email}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-calendar-alt"></span> Data de nascimento:</label>
                                            <h6>${dado.dateBirth}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Carro:</label>
                                            <h6>${dado.car.model}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Placa do carro:</label>
                                            <h6>${dado.car.plate}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-user-friends"></span> Acompanhante:</label>
                                            <h6>${dado.escort}</h6>
                                        </div>
                                    </div>
                                    <div class="mx-auto">
                                        <button type="button" onclick="carregarDadosHospede('${dado._id}');" data-dismiss="modal" class="btn btn-outline-primary btn-sm" style="margin-top:20px;">
                                            <span class="fas fa-edit"></span> Editar hospede
                                        </button>
                                        <button type="button" onclick="confirmarAcao('Excluir este hospede!','excluirHospede(this.value)','${dado._id}');" class="btn btn-outline-danger btn-sm" data-dismiss="modal" style="margin-top:20px;">
                                            <span class="fas fa-trash"></span> Excluir hospede
                                        </button>
                                        <button type="button" onclick="imprimirImpressora('dadosHospedeImpressao')" class="btn btn-outline-warning btn-sm" style="margin-top:20px;">
                                            <span class="fas fa-print"></span> Imprimir dados
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
    for (let hospedagem of dado.accommodations) {
        codigoHTML += `<tr>
                                                <th><span class="badge badge-success">${hospedagem.checkin}</span></th>
                                                <th><span class="badge badge-warning">${hospedagem.checkout}</span></th>
                                                <th>Nº ${hospedagem.fourth}</th>
                                                <th class="text-danger">R$${(parseFloat(hospedagem.price)).toFixed(2)}</th>
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

    document.getElementById('nomeHospede').value = dado.name;
    document.getElementById('enderecoHospede').value = dado.address.street;
    document.getElementById('bairroHospede').value = dado.address.district;
    document.getElementById('cidadeHospede').value = dado.address.city;
    document.getElementById('cepHospede').value = dado.address.cep;
    document.getElementById('celularHospede').value = dado.phone;
    document.getElementById('cpfHospede').value = dado.identification;
    document.getElementById('obsHospede').value = dado.note;
    document.getElementById('emailHospede').value = dado.email;
    document.getElementById('nascimentoHospede').value = dado.dateBirth;
    document.getElementById('carroHospede').value = dado.car.model;
    document.getElementById('placaCarroHospede').value = dado.car.plate;
    document.getElementById('acompanhanteHospede').value = dado.escort;
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

    $('#modalClasseHospede').modal('hide');
    document.getElementById(`modal`).innerHTML = ``;
    modalExibirDadosHospede(dado._id);
}

//funcao responsavel por cadastrar o hospede
async function cadastrarHospede() {
    try {
        let dado = {
            name: document.getElementById('nomeHospede').value,
            address: {
                street: document.getElementById('enderecoHospede').value,
                district: document.getElementById('bairroHospede').value,
                city: document.getElementById('cidadeHospede').value,
                cep: document.getElementById('cepHospede').value,
            },
            phone: document.getElementById('celularHospede').value,
            identification: document.getElementById('cpfHospede').value,
            note: document.getElementById('obsHospede').value,
            email: document.getElementById('emailHospede').value,
            dateBirth: document.getElementById('nascimentoHospede').value,
            car: {
                model: document.getElementById('carroHospede').value,
                plate: document.getElementById('placaCarroHospede').value,
            },
            escort: document.getElementById('acompanhanteHospede').value,
            accommodations: [],
        }

        await aguardeCarregamento(true);
        let result = await requisicaoPOST(`guests`, dado, null);
        mensagemDeAviso(`Hospede cadastrado com sucesso!`);
        $('#modalClasseHospede').modal('hide');
        document.getElementById('modal').innerHTML = ``;
        VETORDEHOSPEDES = [];
        VETORDEHOSPEDES.push(result.data);
        modalExibirDadosHospede(result.data._id);
        await aguardeCarregamento(false);
    } catch (error) {
        mensagemDeErro(`Erro ao salvar dados do hospede!`);
    }
}

//funcao responsavel por atualizar o hospede
async function atualizarHospede(id) {
    try {
        let dado = VETORDEHOSPEDES.find((element) => element._id == id);

        dado.name = document.getElementById('nomeHospede').value;
        dado.address.street = document.getElementById('enderecoHospede').value;
        dado.address.district = document.getElementById('bairroHospede').value;
        dado.address.city = document.getElementById('cidadeHospede').value;
        dado.address.cep = document.getElementById('cepHospede').value;
        dado.phone = document.getElementById('celularHospede').value;
        dado.identification = document.getElementById('cpfHospede').value;
        dado.note = document.getElementById('obsHospede').value;
        dado.email = document.getElementById('emailHospede').value;
        dado.dateBirth = document.getElementById('nascimentoHospede').value;
        dado.car.model = document.getElementById('carroHospede').value;
        dado.car.plate = document.getElementById('placaCarroHospede').value;
        dado.escort = document.getElementById('acompanhanteHospede').value;
        dado.accommodations

        delete dado._id;
        delete dado.address._id;
        delete dado.car._id;
        delete dado.__v;
        delete dado.createdAt;
        delete dado.updatedAt;

        await aguardeCarregamento(true);
        let result = await requisicaoPUT(`guests/${id}`, dado, null)
        mensagemDeAviso(`Dados do Hospede atualizado com sucesso!`);
        document.getElementById('modal').innerHTML = ``;
        modalExibirDadosHospede(result._id);
        await aguardeCarregamento(false);
    } catch (error) {
        mensagemDeErro(`Erro ao atualizar dados do hospede!`)
    }
}

//funcao responsavel por apagar o hospede
async function excluirHospede(id) {
    try {
        let posicao = VETORDEHOSPEDES.findIndex((element) => element._id == id);

        await aguardeCarregamento(true);
        await requisicaoDELETE(`guests/${id}`, '', null)
        mensagemDeAviso(`Hospede excluído com sucesso!`);
        document.getElementById('modal').innerHTML = ``;
        await aguardeCarregamento(false);
    } catch (error) {
        mensagemDeErro(`Erro ao excluir hospede!`)
    }
}