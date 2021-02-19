//------------------------------------------------- Classe hospede -----------------------------------------

//vetor responsavel por gerar o vetor de hospedes
let VETORDEHOSPEDES = [];

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
                                            <input type="text" class="form-control" id="cepHospede" placeholder="CEP do hospede" onkeyup="if((this.value).length > 7){this.value = mascara('cep', this.value);}">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="celularHospede" class="text-primary"><span class="fas fa-phone-volume"></span> Celular:</label>
                                            <input type="text" class="form-control" id="celularHospede" placeholder="Celular do hospede" onkeyup="if((this.value).length > 9){this.value = mascara('phone', this.value);}">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="cpfHospede" class="text-primary"><span class="fas fa-id-card"></span> CPF:</label>
                                            <input type="text" class="form-control" id="cpfHospede" placeholder="CPF do hospede" onkeyup="if((this.value).length > 10){this.value = mascara('cpf', this.value);}">
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
                                            <input type="text" class="form-control" id="placaCarroHospede" placeholder="Placa do carro" onkeyup="if((this.value).length > 6){this.value = mascara('plate', this.value);}">
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
        codigoHTML += `<button type="button" onclick="if(validaDadosCampo(
            [
                '#nomeHospede',
                '#enderecoHospede',
                '#bairroHospede',
                '#cidadeHospede',
                '#celularHospede',
                '#cpfHospede'
            ]
        )){ confirmarAcao('Atualizar os dados deste hospede!','atualizarHospede(this.value)','${id}'); $('#modalClasseHospede').modal('hide'); }else{ mensagemDeErro('Preencha os campos necessarios!'); mostrarCamposIncorrreto(
            [
                'nomeHospede',
                'enderecoHospede',
                'bairroHospede',
                'cidadeHospede',
                'celularHospede',
                'cpfHospede'
            ]
        ); }" class="btn btn-primary">Atualizar</button>`

    } else {
        codigoHTML += `<button type="button" onclick="if(validaDadosCampo(
            [
                '#nomeHospede',
                '#enderecoHospede',
                '#bairroHospede',
                '#cidadeHospede',
                '#celularHospede',
                '#cpfHospede'
            ]
        )){ cadastrarHospede(); }else{ mensagemDeErro('Preencha os campos necessarios!'); mostrarCamposIncorrreto(
            [
                'nomeHospede',
                'enderecoHospede',
                'bairroHospede',
                'cidadeHospede',
                'celularHospede',
                'cpfHospede'
            ]
        ) }" class="btn btn-primary">Cadastrar</button>`
    }
    codigoHTML += `</div>
                        </div>
                    </div>
                </div>`;

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalClasseHospede').modal('show');
}

//funcao responsavel por gerar a lista de hospedes de acordo com a busca
async function gerarListaDeHospedes(tipo,idRetorno) {
    let codigoHTML = ``, json = null;

    VETORDEHOSPEDES = [];

    if (tipo == 'nome') {
        json = await requisicaoGET(`guests/${document.getElementById('nomeDoHospede').value}`, null);
    } else if (tipo == 'todos') {
        json = await requisicaoGET(`guests`, null);
    }
    if(idRetorno){
        let busca = await requisicaoGET(`guests`, null);
        let data = [];
        data.push(busca.data.find((item)=> item._id == idRetorno));
        json = {'data':data}
    }

    codigoHTML += `<div class="list-group">`
    for (let hospede of json.data) {
        VETORDEHOSPEDES.push(hospede)
        codigoHTML += `<a href="#" onclick="modalExibirDadosHospede('${hospede._id}');" class="list-group-item list-group-item-action list-group-item-warning shadow-lg">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1" title="${hospede.name}">Nome: ${corrigirTamanhoString(30, hospede.name)}</h5>
                            <small title="${hospede.phone}">Celular: ${corrigirTamanhoString(15, hospede.phone)}</small>
                        </div>
                        <p class="mb-1" title="${hospede.identification}">CPF: ${corrigirTamanhoString(15, hospede.identification)}</p>
                    </a>
                    <button class="btn btn-sm btn-outline-warning mb-2" type="button" onclick="document.getElementById('collapse${hospede._id}').hidden? document.getElementById('collapse${hospede._id}').hidden = false : document.getElementById('collapse${hospede._id}').hidden = true">
                        <span class="fas fa-eye"></span> Visualização simplificada
                    </button>
                    <div id="collapse${hospede._id}" hidden style="margin-bottom:3vh;">
                        <div class="card card-body">
                            <table class="table table-bordered">
                                <tr class="table-secondary">
                                    <th colspan="3" class="text-center">
                                        Hospede
                                    </th>
                                </tr>
                                <tr class="table-info">
                                    <td>
                                        Nome: <strong>${hospede.name}</strong>
                                    </td>
                                    <td>
                                        CPF: <strong>${hospede.identification}</strong>
                                    </td>
                                    <td>
                                        Data de nascimento: <strong>${hospede.dateBirth}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td colspan="3">
                                        Endereço: <strong>${hospede.address.street}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td>
                                        Bairro: <strong>${hospede.address.district}</strong>
                                    </td>
                                    <td>
                                        Cidade: <strong>${hospede.address.city}</strong>
                                    </td>
                                    <td>
                                        CEP: <strong>${hospede.address.cep}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td>
                                        Telefone: <strong>${hospede.phone}</strong>
                                    </td>
                                    <td colspan="2">
                                        Email: <strong>${hospede.email}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td colspan="3">
                                        Observação: <strong>${hospede.note}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td>
                                        Carro: <strong>${hospede.car.model}</strong>
                                    </td>
                                    <td colspan="2">
                                        Placa do carro: <strong>${hospede.car.plate}</strong>
                                    </td>
                                </tr>
                                <tr class="table-info">
                                    <td colspan="3">
                                        Observação: <strong>${hospede.escort}</strong>
                                    </td>
                                </tr>
                                <td colspan="3">
                                    <button onclick="document.getElementById('checkinsTelaPrincipal${hospede._id}').hidden? document.getElementById('checkinsTelaPrincipal${hospede._id}').hidden = false : document.getElementById('checkinsTelaPrincipal${hospede._id}').hidden = true" type="button" class="btn btn-outline-primary">
                                        <span class="fas fa-eye"></span> Todos os checkins
                                    </button>
                                </td>
                                </tr>
                                <tfoot id="checkinsTelaPrincipal${hospede._id}" hidden>`
                                    for(const accommodation of hospede.accommodations){
                                        codigoHTML+=`<tr class="table-secondary">
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
                            </table>
                        </div>
                    </div>`
    }
    codigoHTML += `</div>`

    document.getElementById(`listaDeHospedes`).innerHTML = ``;
    if (json.data[0] == null) {
        document.getElementById(`listaDeHospedes`).innerHTML = `<h5 class="text-center" style="margin-top: 20vh;"><span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span>Nenhum hospede encontrado!</h5>`;
    } else {
        document.getElementById(`listaDeHospedes`).innerHTML = codigoHTML;
    }
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
                                            <h6 title="${dado.name}">${corrigirTamanhoString(30, dado.name)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Endereço:</label>
                                            <h6 title="${dado.address.street}">${corrigirTamanhoString(30, dado.address.street)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Bairro:</label>
                                            <h6 title="${dado.address.district}">${corrigirTamanhoString(15, dado.address.district)}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> Cidade:</label>
                                            <h6 title="${dado.address.city}">${corrigirTamanhoString(15, dado.address.city)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-map-marker-alt"></span> CEP:</label>
                                            <h6 title="${dado.address.cep}">${corrigirTamanhoString(10, dado.address.cep)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-phone-volume"></span> Celular:</label>
                                            <h6 title="${dado.phone}">${corrigirTamanhoString(15, dado.phone)}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-id-card"></span> CPF:</label>
                                            <h6 title="${dado.identification}">${corrigirTamanhoString(15, dado.identification)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-info"></span> Observação:</label>
                                            <h6 title="${dado.note}">${corrigirTamanhoString(45, dado.note)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-at"></span> Email:</label>
                                            <h6 title="${dado.email}">${corrigirTamanhoString(25, dado.email)}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-calendar-alt"></span> Data de nascimento:</label>
                                            <h6 title="${dado.dateBirth}">${corrigirTamanhoString(11, dado.dateBirth)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Carro:</label>
                                            <h6 title="${dado.car.model}">${corrigirTamanhoString(15, dado.car.model)}</h6>
                                        </div>
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-car"></span> Placa do carro:</label>
                                            <h6 title="${dado.car.plate}">${corrigirTamanhoString(9, dado.car.plate)}</h6>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="text-primary"><span class="fas fa-user-friends"></span> Acompanhante:</label>
                                            <h6 title="${dado.escort}">${corrigirTamanhoString(30, dado.escort)}</h6>
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
                                            <button type="button" onclick="$('#areaDeListagemDeHospedagem').fadeOut(); $('#areaDeAdicionarHospedagem').fadeIn(); telaDeHospedagem('${dado._id}', 'cadastrar');" class="btn btn-primary btn-block" style="margin-top:20px;">
                                                <span class="fas fa-plus"></span> Adicionar nova hospedagem <span class="fas fa-bed"></span>
                                            </button>
                                        </div>`

    if (dado.accommodations[0] == null) {
        codigoHTML += `<h5 class="text-center" style="margin-top: 30px; margin-bottom: 30px;"><span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span>Nenhuma hospedagem encontrada!</h5>`
    } else {
        codigoHTML += `<table class="table table-sm" style="margin-top: 30px;">
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
                                                    <button onclick="alterarHospedagem('${hospedagem._id}','${dado._id}');" type="button" class="btn btn-primary btn-sm">
                                                        <span class="fas fa-edit"></span> Editar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onclick="confirmarExclusaoHospedagem('${hospedagem._id}','${dado._id}');" type="button" class="btn btn-outline-danger btn-sm">
                                                        <span class="fas fa-trash"></span> Excluir
                                                    </button>
                                                </td>
                                            </tr>`
        }
        codigoHTML += `</tbody>
                                        </table>`
    }

    codigoHTML += `</div>
                                    <div id="areaDeAdicionarHospedagem">
                                        
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
async function adicionarHospedagem(id) {
    try {
        let dado = VETORDEHOSPEDES.find((element) => element._id == id);

        await aguardeCarregamento(true);
        let result = await cadastrarHospedagem();
        setTimeout(async function () {
            result
            await dado.accommodations.push({ _id: result.data._id });

            delete dado._id;
            delete dado.address._id;
            delete dado.car._id;
            delete dado.__v;
            delete dado.createdAt;
            delete dado.updatedAt;

            let serializadedAccommodations = []

            for (let accommodations of dado.accommodations) {
                serializadedAccommodations.push(accommodations._id)
            }

            dado.accommodations = serializadedAccommodations

            await requisicaoPUT(`guests/${id}`, dado, null)
            $('#modalExibirDadosHospede').modal('hide');
            document.getElementById('modal').innerHTML = ``;
            gerarListaDeHospedes(null,id);
        }, 300)
        await aguardeCarregamento(false);

    } catch (error) {
        mensagemDeErro('Não foi possível adicionar a hospedagem para este hospede!')
    }
}

//funcao responsavel por delegar atualizacao de hospedagem
async function alterarHospedagem(id, id_cliente) {

    try {

        let dado = VETORDEHOSPEDES.find((element) => element._id == id_cliente);
        let dado2 = dado.accommodations.find((element) => element._id == id);

        telaDeHospedagem(id, 'atualizar');

        $('#areaDeAdicionarHospedagem').fadeIn();
        $('#areaDeListagemDeHospedagem').fadeOut();

        document.getElementById(`checkinHospede`).value = dado2.checkin;
        document.getElementById(`checkoutHospede`).value = dado2.checkout;
        document.getElementById(`numeroQuartoHospede`).value = dado2.fourth;
        document.getElementById(`valorHospedagem`).value = (parseFloat(dado2.price)).toFixed(2);
        await aguardeCarregamento(false);

    } catch (error) {
        mensagemDeErro(`Erro ao atualizar dados do hospede!`)
    }

}

//funcao responsavel por excluir referencia de hospedagem do hospede
async function apagarReferenciaHospedagem(id, id_cliente) {

    try {
        let dado = VETORDEHOSPEDES.find((element) => element._id == id_cliente);

        await aguardeCarregamento(true);

        delete dado._id;
        delete dado.address._id;
        delete dado.car._id;
        delete dado.__v;
        delete dado.createdAt;
        delete dado.updatedAt;

        let serializadedAccommodations = []

        for (let accommodations of dado.accommodations) {
            if (accommodations._id != id) {
                serializadedAccommodations.push(accommodations._id)
            }
        }

        dado.accommodations = serializadedAccommodations

        await requisicaoPUT(`guests/${id_cliente}`, dado, null)
        await excluirHospedagem(id);
        $('#modalExibirDadosHospede').modal('hide');
        document.getElementById('modal').innerHTML = ``;
        gerarListaDeHospedes(null,id_cliente);
        await aguardeCarregamento(false);

    } catch (error) {
        mensagemDeErro('Não foi excluir a hospedagem para este hospede!')
    }
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
                cep: validaDadosCampo(['#cepHospede']) ? document.getElementById('cepHospede').value : "00000-000",
            },
            phone: document.getElementById('celularHospede').value,
            identification: document.getElementById('cpfHospede').value,
            note: validaDadosCampo(['#obsHospede']) ? document.getElementById('obsHospede').value : "Nenhuma.",
            email: validaDadosCampo(['#emailHospede']) ? document.getElementById('emailHospede').value : "Nenhum.",
            dateBirth: validaDadosCampo(['#nascimentoHospede']) ? document.getElementById('nascimentoHospede').value : "0000-00-00",
            car: {
                model: validaDadosCampo(['#carroHospede']) ? document.getElementById('carroHospede').value : "Nenhum.",
                plate: validaDadosCampo(['#placaCarroHospede']) ? document.getElementById('placaCarroHospede').value : "Nenhum.",
            },
            escort: validaDadosCampo(['#acompanhanteHospede']) ? document.getElementById('acompanhanteHospede').value : "Nenhum.",
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
        dado.address.cep = validaDadosCampo(['#cepHospede']) ? document.getElementById('cepHospede').value : "00000-000";
        dado.phone = document.getElementById('celularHospede').value;
        dado.identification = document.getElementById('cpfHospede').value;
        dado.note = validaDadosCampo(['#obsHospede']) ? document.getElementById('obsHospede').value : "Nenhuma.";
        dado.email = validaDadosCampo(['#emailHospede']) ? document.getElementById('emailHospede').value : "Nenhum.";
        dado.dateBirth = validaDadosCampo(['#nascimentoHospede']) ? document.getElementById('nascimentoHospede').value : "0000-00-00";
        dado.car.model = validaDadosCampo(['#carroHospede']) ? document.getElementById('carroHospede').value : "Nenhum.";
        dado.car.plate = validaDadosCampo(['#placaCarroHospede']) ? document.getElementById('placaCarroHospede').value : "Nenhum.";
        dado.escort = validaDadosCampo(['#acompanhanteHospede']) ? document.getElementById('acompanhanteHospede').value : "Nenhum.";
        dado.accommodations


        let serializadedAccommodations = []
        for (let accommodations of dado.accommodations) {
            serializadedAccommodations.push(accommodations._id)
        }
        dado.accommodations = serializadedAccommodations

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
        gerarListaDeHospedes(null,id);
        await aguardeCarregamento(false);
    } catch (error) {
        mensagemDeErro(`Erro ao atualizar dados do hospede!`)
    }
}

//funcao responsavel por apagar o hospede
async function excluirHospede(id) {
    try {
        await aguardeCarregamento(true);
        await requisicaoDELETE(`guests/${id}`, '', null)
        mensagemDeAviso(`Hospede excluído com sucesso!`);
        document.getElementById('modal').innerHTML = ``;
        await aguardeCarregamento(false);
        gerarListaDeHospedes(null,id);
    } catch (error) {
        mensagemDeErro(`Erro ao excluir hospede!`)
    }
}