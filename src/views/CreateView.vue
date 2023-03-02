<template>

  <!-- Daqui até a proxima etapa é apenas o cabeçalho
  e a barra de navegação lateral-->

  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><img id="logo_corsol_header" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-toolbar-title>
      <div>
        <v-btn link to="/admin">
          Admin
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
    >

      <v-list-item link to="/home">
        <v-list-item-title>

          Home

        </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/create">
        <v-list-item-title>

          Cadastramento Empresarial

        </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin">
        <v-list-item-title>

          Painel administrador

        </v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title id="linkDownload">

          <a id="linkDownload" href="https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/Proposta Comercial.docx">Download Proposta</a>

        </v-list-item-title>
      </v-list-item>
      <v-divider class="my-2"></v-divider>
      <v-list-item link>
        <v-list-item-title @click="logout">

          Logout <v-icon icon="mdi-logout"></v-icon>

        </v-list-item-title>
      </v-list-item>

    </v-navigation-drawer>

    <!--Acaba aqui menu lateral e cabeçalho-->

    <v-main id="principal">
        <v-form @submit.prevent="criaUsuarioEmpresarial" id="formularioGerar">
            <div id="tiutlo_e_cancel_btn">

            <div id="titulo">
              <h2>Cadastrar empresas</h2>
            </div>

              <div id="cancel_btn_div">

                  <v-btn
                      to="/home"
                      id="cancel_btn"
                      color="error"
                      prepend-icon="mdi-cancel"
                  >
                    Cancelar
                  </v-btn>

              </div>
          </div>


          <br><v-divider>
          <!-- Linha divisória horizontal -->
          </v-divider><br>

          <!-- Pedaços do formulário que solicitam a entrada
           tanto do noe quanto o de uma imagem.-->

          <div id="empresa_foto_titulo">

            <v-card id="adc_nome_empresa">
              <v-text-field
                  variant="outlined"
                  label="Nome Fantasia"
                  :rules="rules"
                  hide-details="auto"
                  v-model="nomeEmpresa"
              ></v-text-field>
            </v-card>

            <br>

            <v-card id="card_empresa">

              <div id="nome_empresa">
                <p>{{nomeEmpresa}}</p>
              </div>

              <v-divider><!-- Linha divisória horizontal --></v-divider><br>

              <v-card-actions>
                <v-file-input
                    v-model="fotoEmpresa"
                    color="deep-purple-accent-4"
                    counter
                    label="Foto"
                    multiple
                    placeholder="Select your files"
                    prepend-icon="mdi-camera"
                    variant="outlined"
                    :show-size="1000"
                ></v-file-input>
              </v-card-actions>
            </v-card>

          </div>
          <br>

          <!--Entradas opicionais que devem conectar com
          o banco de dados para receberem as informações
          a serem preenchidas.-->

          <div id="options">
            <v-card>
              <div id="outras_info">
                    <div id="selectCadastroDir">
                      <v-select
                          variant="outlined"
                          :items="usuarioArray"
                          filled
                          label="Responsável"
                          v-model="usuarioAtribuido"
                      >
                      </v-select>

                      <v-select
                          variant="outlined"
                          :items="tiposCadastro"
                          filled
                          label="Tipo de contrato"
                          v-model="cadastroSelecionado"
                          item-title="tipo"
                      >
                      </v-select>
                    </div>
                  <div id="selectCadastro">
                    <v-select
                        variant="outlined"
                        filled
                        v-model="selectedState"
                        :items="states"
                        label="Selecione um estado"
                    />
                    <v-select
                        variant="outlined"
                        filled
                        v-model="selectedCity"
                        :items="cities[selectedState]"
                        label="Selecione uma cidade"
                    />
                  </div>
              </div>

              <!-- A partir deste ponto todas as entradas são
               manuais e terão de ser guardadas como strings e
               postadas por envio deste formulário.-->

              <div id="apenas_inputs">

                  <div id="input_field_cnpj">
                    <div id="input_cnpj">
                      <v-text-field
                          variant="outlined"
                          label="CNPJ ou CPF"
                          :rules="rules"
                          hide-details="auto"
                          v-model="cnpj"
                          v-mask="['###.###.###-##', '##.###.###/####-##']"
                      ></v-text-field>
                    </div>
                    <div id="input_inscriEstadual">
                      <v-text-field
                          variant="outlined"
                          label="Inscrição estadual"
                          :rules="rules"
                          hide-details="auto"
                          v-model="inscri_estadual"
                          v-mask="['##.###-###-###']"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
            </v-card>
            <br>
            <v-divider><!-- Linha divisória horizontal --></v-divider>
              <div id="titulo_user"><h2>Gestor</h2></div>
            <v-divider><!-- Linha divisória horizontal --></v-divider>
            <br>
            <v-card id="user_info">
              <div id="apenas_inputs_user">

                <div id="input_field_user">
                  <div id="input_nomeSobrenome">
                    <v-text-field
                        variant="outlined"
                        label="Nome e Sobrenome"
                        :rules="rules"
                        hide-details="auto"
                        v-model="nomeGestor"
                    ></v-text-field>
                  </div>
                  <div id="btn_email_gestor">

                    <v-checkbox-btn
                        v-model="enabled"
                        class="pe-2"
                    >
                    </v-checkbox-btn>
                    (Use o botão para alterar o e-mail padrão se necessário.)

                  </div>
                  <div id="input_email">
                    <v-text-field
                        variant="outlined"
                        filled
                        :disabled="!enabled"
                        hide-details
                        v-model="emailGestor"
                    ></v-text-field>
                  </div>

                  <div id="input_password">
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                      >
                        <v-text-field
                            variant="outlined"
                            v-model="numberSenha"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            label="Senha"
                            hint="Minimo 8 caracteres"
                            counter
                            @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                      >
                        <v-text-field
                            variant="outlined"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-2"
                            label="confirmar senha"
                            hint="Minimo 8 caracteres"
                            class="input-group--focused"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-card>

            <br><v-divider><!-- Linha divisória horizontal--></v-divider><br>

            <!-- Botão responsável por realizar o submit do
             formulário e acionar a função "Cadastrar()"-->

            <div id="btn_agree">
              <v-dialog
                  v-model="dialog"
                  persistent
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      type="submit"
                      value="Post"
                      v-bind="props"
                      color="success"
                  >
                    Cadastrar
                    <v-icon
                        icon="mdi-checkbox-marked-circle">
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-form @submit.prevent="criarUsuario">
                    <v-card-title>
                      <span class="text-h5">Representante</span>
                    </v-card-title>
                    <v-card-text>
                          <div id="nome_gestor">
                            <v-text-field
                                variant="outlined"
                                filled
                                label="Nome e sobrenome"
                                required
                                v-model="nome_sobrenome"
                            ></v-text-field>
                          </div>
                          <div id="email_gestor">
                            <v-text-field
                                variant="outlined"
                                label="E-mail"
                                :rules="rules"
                                hide-details="auto"
                                v-model="emailAcesso"
                            ></v-text-field>
                          </div>
                          <div id="input_telefone">
                            <v-text-field
                                variant="outlined"
                                label="Telefone"
                                :rules="rules"
                                hide-details="auto"
                                v-model="telefone"
                                v-mask="['(##) ####-####', '(##) #####-####']"
                            ></v-text-field>
                          </div>
                          <div id="input_senhas">
                            <div id="senha_1">
                              <v-text-field
                                  variant="outlined"
                                  v-model="cadastraPassword"
                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="[rules.required, rules.min]"
                                  :type="show1 ? 'text' : 'password'"
                                  label="Senha"
                                  hint="Minimo 8 caracteres"
                                  counter
                                  @click:append="show1 = !show1"
                              ></v-text-field>
                            </div>
                            <div id="senha_2">
                              <v-text-field
                                  variant="outlined"
                                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="[rules.required, rules.min]"
                                  :type="show2 ? 'text' : 'password'"
                                  name="input-10-2"
                                  label="confirmar senha"
                                  hint="Minimo 8 caracteres"
                                  class="input-group--focused"
                                  @click:append="show2 = !show2"
                              ></v-text-field>
                            </div>
                          </div>
                      <div id="visibilidade">
                            <v-select
                                variant="outlined"
                                filled
                                :items="visibilidade"
                                label="Visibilidade"
                                multiple
                            ></v-select>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue-darken-1"
                          variant="text"
                          @click="dialog = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                          color="blue-darken-1"
                          type="submit"
                          value="Post"
                          variant="text"
                          @click="dialog = false, overlay = !overlay"
                      >
                        Enviar
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-form>
      <v-overlay
          :model-value="overlay"
          persistent
          class="align-center justify-center"
      >
        <v-progress-circular
            color="primary"
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import router from "../router";
import statesCities from "../assets/statesCities.json"
import { setDoc, doc} from 'firebase/firestore/lite';
import arquivoTemplate from "@/libraries/templaProposta";


export default {
  data: () => {
    return ({

      /*
      Método de organização das variaveis que guardam e
      respondem pela seleção de estados/cidades
       */

      selectedState: null,
      selectedCity: null,
      states: Object.keys(statesCities),
      cities: statesCities,

      /*
      Rules é a sequencia de regras que deve seguir o input
      de nome fantasia.
      */

      rules: [
        value => !!value || 'Obrigatório',
        value => (value && value.length >= 3) || 'Minino 3 caractéres',
      ],

      /*
      Arrays feitos para substituir momentaneamente as
      informações a serem extraidas da API
      */

      usuarioAtribuido: null,
      usuarioArray: [],
      tratarArray: [],

      cadastroSelecionado: {tipo: "Aprovado"},
      tiposCadastro: [
        {tipo: "Aprovado"},
        {tipo: "Pendente"},
        {tipo: "Rejeitado"}
      ],

      visibilidade: ['Usuário', 'Grupo', 'Completa', 'Somente dele(a)'],

      /* Variaveis responsáveis por guardas os v-models dos inputs */

      permissaoKey: ["1","2","27","28","29","32","36","37",
      "38","39","40","41","42","43","45","46","94","96","99",
      "100","102","103","104","105","106"],
      paper: null,
      papelId: null,
      empresa: null,
      empresaId: null,
      financiamento: null,
      representanteId: null,
      templateId: null,
      nomeGestor: '',
      numeroGestor: '',
      emailGestor: '',
      numberSenha:'',
      numberPapel:'',
      imgPreview: '',
      nomeEmpresa: '',
      fotoempresa: '',
      cnpj: '',
      inscri_estadual: '',
      nome_sobrenome: '',
      emailAcesso: '',
      telefone: '',
      cadastraPassword: '',
      arquivoTemplate: arquivoTemplate,
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Minimo 8 caracteres',

      /*--------------------------------------------------------*/
      /* Apenas dados responsáveis pelas estilizações,
      tais como o deslize da barra de menu lateral.*/

      enabled: false,
      drawer: null,
      dialog: false,
      ex11: 'primary',
      show1: false,
      show2: true,
      erro: [],
      response: '',
      overlay: false,

    });
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 100000)
    },
  },
  /*
    Método que separa em um array (ususarioArray)
    os ususarios responsáveis cadastrados na plataforma
     */
  async created(){
    const url = "https://solicitasol.cordeiro.com.br/graphql"

    const query = "query ListarUsuarios($first: Int, $offset:" +
          " Int, $empresaId: ID) {\n  listarUsuarios(first: $first," +
          " offset: $offset, empresaId: $empresaId) {\n    id\n" +
          "    foto\n    nome\n    email\n    telefone\n" +
          "    dataInclusao\n  }\n}\n"

    const headers = {
      "Authorization": `Bearer ${window.token}`,
      "content-type": "application/json"
    }

    const queryGraphql = {
      "operationName": "ListarUsuarios",
      "query": query,
      "variables": {
        "first": null
      }
    }

    const response = await axios({
      url: url,
      method: 'post',
      headers: headers,
      data: queryGraphql
    })

        .then(data => {
          this.tratarArray = data.data.data.listarUsuarios
          for (var i = 0; i < this.tratarArray.length; i++) {
            this.usuarioArray.push(this.tratarArray[i].nome)
          }
          this.listarEmpresa()
          this.contarEmpresas()
        })

    let array1 = this.tratarArray
    const found = array1.find(data => data.email == window.email)
    this.voce = found
    console.log(this.voce.id)
  },
  methods: {
    /*
    Função responsável pela criação inicial da empresa e logo
    após ela inicia as outras requisições
     */
    async criaUsuarioEmpresarial() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation CriarUsuarioEmpresarial($input: UserCreateInput!," +
          " $empresaInput: EmpresaCreateInput!)" +
          " {\n  criarUsuarioEmpresarial(input:" +
          " $input, empresaInput: $empresaInput)" +
          " {\n    nome\n    empresa {\n      nome\n" +
          "    }\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "CriarUsuarioEmpresarial",
        "query": query,
        "variables": {
          'empresaInput': {
            'nome': `${this.nomeEmpresa}`,
            'cidade': `${this.selectedCity}`,
            'cnpjCpf': `${this.cnpj}`,
            'estado': `${this.selectedState}`,
            'inscricaoEstadual': `${this.inscri_estadual}`,
            'status': true
          },
          'input': {
            'email': `${this.emailGestor}`,
            'senha': `${this.numberSenha}`,
            'nome': `${this.nomeGestor}`,
          },
          'nome_sobrenome': `${this.nome_sobrenome}`
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

      /*
      Inicia o listarEmpresa para pegar o id da empresa que
       acabou de ser criada
       */

      this.listarEmpresa()

          .then(data => {
            this.logarComoEmpresa()
            this.enviaEmpresaFirestore()
          })


          .catch(errors => {
            console.log(errors.message)
          })

    },
    /*
    Quando foi pego o id em listarEmpresa inicia-se o processo
    de logar como empresa, para que se possa dar continuidade
    na criação de um gestor.
     */
    async logarComoEmpresa(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation LogarComoEmpresa($empresaId: Int!)" +
          " {\n  logarComoEmpresa(empresaId: $empresaId)" +
          " {\n    id\n    nome\n    email\n    telefone\n" +
          "    foto\n    distribuidor {\n      id\n    }\n" +
          "    unidade {\n      id\n      nome\n    }\n " +
          "   empresa {\n      id\n      codigo\n      nome\n " +
          "     logo\n      dataExpiracao\n      distribuidores" +
          " {\n        id\n        nome\n        " +
          "habilitadoParaOrcamento\n        habilitadoParaEmpresa\n" +
          "        statusIntegracao\n        " +
          "kitAbertoTopologiasDisponiveis\n        " +
          "kitFechadoTopologiasDisponiveis\n      }\n      " +
          "fornecedores {\n        id\n        nome\n      }\n" +
          "    }\n    papel {\n      id\n      permissoes {\n" +
          "        id\n        nome\n      }\n    }\n" +
          "    filtrosPropostas {\n      nome\n      colunas\n" +
          "      estruturaExpressao\n    }\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "LogarComoEmpresa",
        "query": query,
        "variables": {
          "empresaId": parseInt(this.empresa)
        },
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data =>{
            this.empresaId = data.data.data.logarComoEmpresa.papel.id
            console.log(this.empresaId)
            this.criarPapel()
          })

    },
    /*
    Criar o papel é o responsável por criar uma vertente para
    o usuario gestor que é a vertente "representante".
     */
    async  criarPapel(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation CriarPapel($input: PapelCreateInput!) {\n " +
          " criarPapel(input: $input) {\n    id\n    nome\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "CriarPapel",
        "query": query,
        "variables": {
          "input": {
            "nome": "Representante"
          }
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.listarPapeis()
          })

    },
    /*
    listarPapeis pega os dados dos dois papeis, do admin e do
     usuario gestor, e automaticamente vincula o usuario ao
     seu papel designado.
       */
    async listarPapeis(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ListarPapeis($first: Int, $offset: Int)" +
          " {\n  listarPapeis(first: $first, offset: $offset)" +
          " {\n    id\n    nome\n    dataInclusao\n    usuarios" +
          " {\n      id\n      nome\n    }\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ListarPapeis",
        "query": query,
        "variables": {
          "first": null,
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data =>{
            this.papelId = data.data.data.listarPapeis[1].id
            console.log(this.papelId)
            this.paper = this.papelId
          })

    },
    /*
    Método esta sendo ultilizado apenas para dar um numero
    ao email do gestor, apenas para não ficar em branco.
     */
    async contarEmpresas(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ContarEmpresas($input: ContarEmpresaInput!)" +
          " {\n  contarEmpresas(input: $input)\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ContarEmpresas",
        "query": query,
        "variables": {
          "input": {}
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.numeroGestor = data.data.data.contarEmpresas
            this.emailGestor = `gestor${this.numeroGestor}@corsolar.com`
          })
    },
    /*
    este método é o que efetivamente sobe os dados do usuario
    gestor para a API.
     */
    async criarUsuario() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation CriarUsuario($input: UserCreateInput!)" +
          " {\n criarUsuario(input: $input)" +
          " {\n id\n nome\n }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "CriarUsuario",
        "query": query,
        "variables": {
          'input': {
            "nome": `${this.nomeEmpresa}`,
            'email': `${this.emailAcesso}`,
            'telefone': "",
            'senha': `${this.cadastraPassword}`,
            'papel': `${this.papelId}`,
            'comissao': null,
            'visibilidade': {
              'equipe': null,
              'usuarioAlvo': null,
              'isCompleto': false
            }
          }
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          /*
          chama muitas funções que são detalhes de como deve ser
          mapeado um usuario, tais como as permissões que
          ele pode exercer na plataforma.
           */

          .then(
            this.enviaRepresentanteFirestore(),
                this.listarPapeis(),
                this.adcionarPermissaoAoPapel(),
                this.alterarPremissa(),
                this.listarTemplate(),
          )

          .catch(err => {
            console.log(err)
          })

    },
    /*
    Método feito para listar os templates existentes e guardar
    numa variavel o valor nescessario para alteração do mesmo.
     */
    async listarTemplate(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ListarTemplates($first: Int, $offset:" +
          " Int, $tipo: TemplateTipo, $nome: String) {\n" +
          "  listarTemplates(first: $first, offset: $offset, tipo:" +
          " $tipo, nome: $nome) {\n    id\n    tipo\n    nome\n" +
          "    assunto\n    template\n    padrao\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ListarTemplates",
        "query": query,
        "variables": {
          "first": null,
          "tipo": "proposta"
        },
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.templateId = data.data.data.listarTemplates[0].id
            console.log(this.templateId)
          })
    },
    /*
    Método responsável por enviar a empresa bara o banco do firestore
    até o momento no banco de testes.
     */
    async enviaEmpresaFirestore(){

      window.db

      try {
        const docRef = await setDoc(doc(db, "empresa", `EMPRESA.${this.empresa}`), {
          nome: this.nomeEmpresa,
          cidade: this.selectedCity,
          cnpjCpf: this.cnpj,
          estado: this.selectedState,
          responsavelCriacao: this.usuarioAtribuido,
          nomeUserResponsavel: this.nomeGestor,
          emailUserResponsavel: this.emailGestor,
          senhaUserResponsavel: this.numberSenha,
          telefoneUserResponsavel: this.telefone
        });
        console.log("Document written with ID: ", this.empresa);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    /*
    Já este é responsável para enviar os dados dos gestores até o
    firestore
     */
    async enviaRepresentanteFirestore(){

      window.db

      try {
        const docRef = await setDoc(doc(db, "representante", `REPRESENTANTE.${this.numeroGestor}`),{
          nome: this.nomeEmpresa,
          email: this.emailAcesso,
          senha: this.cadastraPassword
        });
        console.log("Document written with ID: ", this.numeroGestor);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    /*
    Lista as empresas existentes para pegar o numero do id da
    empresa atual e gerar a criação de usuarios e a troca de
    informações como premissas.
      */
    async listarEmpresa() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ListarEmpresas($input: ListarEmpresaInput!)" +
          " {\n listarEmpresas(input: $input) {\n" +
          " id\n codigo\n nome" +
          "\n status\n estado\n" +
          " cidade\n usuarios\n" +
          " propostasMes\n propostas\n" +
          " dataInclusao\n dataExpiracao\n" +
          " statusPagamento\n creditos\n }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ListarEmpresas",
        "query": query,
        "variables": {
          "input": {
            "first": 1,
            "offset": 0,
            "nome": `${this.nomeEmpresa}`
          }
        }
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data =>{
            this.empresa = data.data.data.listarEmpresas[0].id
            console.log(this.empresa)
          })

    },
    /*
    Esta função seta automaticamente quais são as permissões
    do usuario dentro da plataforma.
     */
    async adcionarPermissaoAoPapel() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation AdicionarPermissaoAoPapel($id: ID!," +
          " $permissaoId: ID!) {\n adicionarPermissaoAoPapel(id:" +
          " $id, permissaoId: $permissaoId) {\n id\n permissoes" +
          " {\n id\n nome\n }\ }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      for (var i = 0; i < this.permissaoKey.length; i++) {

        const queryGraphql = {
          "operationName": "AdicionarPermissaoAoPapel",
          "query": query,
          "variables": {
            "id": `${this.paper}`,
            "permissaoId": `${this.permissaoKey[i]}`
          },
        }

        const response = await axios({
          url: url,
          method: 'post',
          headers: headers,
          data: queryGraphql
        })

            .then(data => {
              console.log(`Permissão numero ${i}`)
            })

      }
      if (i == this.permissaoKey.length){
        this.deslogarComoEmpresa()
      }
    },
    /*
    Altera os dados de premissas como os que foram solicitados,
    automaticamente.
     */
    async alterarPremissa(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation AlterarPremissa($input:" +
          " ConfigEmpresaInputPremissa!) {\n alterarPremissa(input:" +
          " $input)\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "AlterarPremissa",
        "query": query,
        "variables": {
          "input": {
            "sistemaPerdaEficiencia": {
              "tradicional": 0.008,
              "microinversor": 0.005,
              "otimizador": 0.006
            },
            "sistemaTrocaInversorAnos": {
              "tradicional": 15,
              "microinversor": 15,
              "otimizador": 0
            },
            "sistemaTrocaInversorCustoProjeto": {
              "tradicional": 0.2,
              "microinversor": 0.2,
              "otimizador": 0.05
            },
            "sistemaMargemPotencia": 0,
            "aplicarCustoDisponibilidadeFinanceiro": 1,
            "aplicarCustoDisponibilidadeSistema": 1,
            "considerarKitsQueNecessitamDeTransformador": 1,
            "financeiroInflacaoEnergetica": 0.095,
            "financeiroInflacaoIpca": 0.065,
            "financeiroTaxaDesconto": 0.12,
            "financeiroKitMargem": null,
            "financeiroKitImposto": null,
            "financeiroImpostoComercio": 0,
            "financeiroMargemPadrao": 0.2,
            "financeiroMargemCategoria": "venda",
            "padraoBaseIrradiancia": "IrradianciaAtlasBrasileiroSegundaEdicao",
            "padraoSobreDimensionamento": 0.7,
            "padraoDesempenho": {
              "tradicional": 0.77,
              "microinversor": 0.78,
              "otimizador": 0.8
            },
            "padraoDesvio": "0º",
            "padraoInclinacao": "20º",
            "padraoTipoTelhado": "ceramico",
            "padraoFase": "Trifásico",
            "padraoTensao": "127/220V",
            "areaTipoTelhado": {
              "carport": 1.3,
              "ceramico": 1.2,
              "fibrocimento": 1.2,
              "laje": 1.2,
              "shingle": 1.2,
              "metalico": 1.2,
              "zipado": 1.2,
              "solo": 1.6
            },
            "tipoKits": [
              "fechado",
              "aberto"
            ],
            "topologia": [
              "tradicional",
              "microinversor",
              "otimizador"
            ],
            "grupoTarifario": "BT",
            "impostoSobreEnergia": 0,
            "fatorSimultaneidade": 0,
            "outrosEncargosAtual": 0,
            "outrosEncargosNovo": 0,
            "tarifa": 0,
            "tarifaTEPonta": 0,
            "tarifaTUSDPonta": 0,
            "tarifaTEForaPonta": 0,
            "tarifaTUSDForaPonta": 0,
            "precoDemanda": 0,
            "fornecedores": null,
            "tipoPreco": "equipamentos"
          }
        }
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data =>{
            console.log(`Premissa Feita`)
            this.atualizarCustosInstalação()
            this.listarFinanciamento()
          })

    },
    /*
    Altera os custos de instalação como os que foram solictados,
    automaticamente.
     */
    async atualizarCustosInstalação(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation AtualizarCustosInstalacao($input:" +
          " CustosUpdateInput!) {\n atualizarCustos(input: $input)" +
          " {\n instalacao {\n status\n distanciaMaxima\n custos" +
          " {\n rangeEnd\n precoKwp\n precoKm\n }\n precoKwpMax\n" +
          " precoKmMax\n imposto\n margemLucro\n condicao\n" +
          " modoAvancado\n estruturaExpressao\n }\n }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "AtualizarCustosInstalacao",
        "query": query,
        "variables": {
          "input": {
            "instalacao": {
              "status": true,
              "distanciaMaxima": 0,
              "custos": [
                {
                  "rangeEnd": 2,
                  "precoKwp": 1250,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 3,
                  "precoKwp": 1040,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 4,
                  "precoKwp": 940,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 5,
                  "precoKwp": 900,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 6,
                  "precoKwp": 890,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 8,
                  "precoKwp": 1000,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 10,
                  "precoKwp": 1100,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 15,
                  "precoKwp": 900,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 20,
                  "precoKwp": 880,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 25,
                  "precoKwp": 850,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 35,
                  "precoKwp": 700,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 45,
                  "precoKwp": 680,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 55,
                  "precoKwp": 640,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 65,
                  "precoKwp": 660,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 70,
                  "precoKwp": 750,
                  "precoKm": 0
                },
                {
                  "rangeEnd": 75,
                  "precoKwp": 820,
                  "precoKm": 0
                }
              ],
              "precoKwpMax": 555,
              "precoKmMax": 0,
              "imposto": null,
              "margemLucro": null,
              "condicao": null,
              "modoAvancado": null,
              "estruturaExpressao": null
            }
          }
        },
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            console.log(`Atualizado custos instalação`)
          })

    },
    /*
    Lista o id dos financiamentos existentes para que seja
    possivel identificar o id desta empresa e configurar
     um novo financiamento
     */
    async listarFinanciamento(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ListarFinanciamentos($first: Int, $offset:" +
          " Int) {\n  listarFinanciamentos(first: $first, offset:" +
          " $offset) {\n    id\n    nome\n    status\n    dadosOpcoes" +
          " {\n      id\n      taxa\n      prazo\n      carencia\n " +
          "     entrada\n    }\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ListarFinanciamentos",
        "query": query,
        "variables": {
          "first": null
        }
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.financiamento = data.data.data.listarFinanciamentos[0].id

            console.log(`${this.financiamento}`)
            this.listarRepresentantes()
            this.alteraFinanciamento()
          })

    },
    /*
    Lista a quantidade e o ID de representantes para que seja
    possivel identifica o representante que será responsável
    pelo simulador Solar
     */
    async listarRepresentantes(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "query ListarRepresentantes {\n" +
          "  listarRepresentantes {\n    id\n    nome\n" +
          "    email\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "ListarRepresentantes",
        "query": query,
        "variables": {}
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.representanteId = data.data.data.listarRepresentantes[0].id
            this.alterarIntegracaoSimuladorSolar()
            console.log(this.representanteId)
          })
    },
    /*
    Altera as necessidades de financiamento de cada projeto,
    automaticamente.
     */
    async alteraFinanciamento(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation AlterarFinanciamento($id: ID!," +
          " $input: FinanciamentoUpdateInput!) {\n  " +
          "alterarFinanciamento(id: $id, input: $input) " +
          "{\n    id\n    nome\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "AlterarFinanciamento",
        "query": query,
        "variables": {
          "id": `${this.financiamento}`,
          "input": {
            "nome": "Financiamento (Exemplo)",
            "status": true,
            "dadosOpcoes": [
              {
                "taxa": 0.027999999999999997,
                "prazo": 12,
                "carencia": 0,
                "entrada": 0
              },
              {
                "taxa": 0.027999999999999997,
                "prazo": 24,
                "carencia": 0,
                "entrada": 0
              },
              {
                "taxa": 0.027999999999999997,
                "prazo": 36,
                "carencia": 0,
                "entrada": 0
              },
              {
                "taxa": 0.027999999999999997,
                "prazo": 48,
                "carencia": 0,
                "entrada": 0
              },
              {
                "taxa": 0.027999999999999997,
                "prazo": 60,
                "carencia": 0,
                "entrada": 0
              },
              {
                "taxa": 0.027999999999999997,
                "prazo": 72,
                "carencia": 0,
                "entrada": null
              }
            ]
          }
        }
      }
        const response = await axios({
          url: url,
          method: 'post',
          headers: headers,
          data: queryGraphql
        })
    },
    /*
    Função responsável por setar automaticamente dados de
    integrações.
     */
    async alterarIntegracaoSimuladorSolar(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation AlterarIntegracaoSimuladorSolar($input:" +
          " InputSimuladorSolar!) {\n alterarIntegracaoSimuladorSolar" +
          "(input: $input) {\n id\n token\n simuladorSolar {\n ativo\n" +
          " tarifaCliente\n enviarNotificacaoSistema\n" +
          " enviarNotificacaoEmail\n faturaCampoCustomizado\n" +
          " topologia\n tipoTelhado\n fase\n taxaDesempenho\n" +
          " tensaoRede\n desvioAzimutal\n inclinacao\n distribuidorID\n" +
          " fornecedorID\n estilos {\n corPlanoFundo\n corTexto\n" +
          " corBotaoFundo\n corBotaoTexto\n }\n captarLead {\n" +
          " enviarNotificacao\n responsavelID\n usuariosEmail\n" +
          " representanteID\n }\n criarProjeto {\n responsavelID\n" +
          " etapaID\n representanteID\n }\n camposDimensionamento {\n" +
          " distribuidorID\n campos {\n chave\n valor\n }\n }\n tarifas" +
          " {\n AC\n AL\n AP\n AM\n BA\n CE\n DF\n ES\n GO\n MA\n MT\n" +
          " MS\n MG\n PA\n PB\n PR\n PE\n PI\n RJ\n RN\n RS\n RO\n RR\n" +
          " SC\n SP\n SE\n TO\n }\n textos {\n avisoLegal\n" +
          " tituloPrincipal\n tituloDados\n tituloResultadoSimulacao\n" +
          " infoSucesso\n botaoSimular\n botaoVoltar\n" +
          " botaoSolicitarOrcamento\n botaoProsseguir\n potenciaTitulo\n" +
          " potenciaInfo\n areaTitulo\n areaInfo\n precoTitulo\n" +
          " precoInfo\n paybackTitulo\n paybackInfo\n retornoTitulo\n" +
          " retornoInfo\n }\n }\n }\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "AlterarIntegracaoSimuladorSolar",
        "query": query,
        "variables": {
          "input": {
            "ativo": true,
            "tarifaCliente": false,
            "captarLead": {
              "enviarNotificacao": [
                `${this.representanteId}`
              ],
              "responsavelID": `${this.representanteId}`,
              "usuariosEmail": [
                `${this.representanteId}`
              ],
              "representanteID": `${this.representanteId}`
            },
            "faturaCampoCustomizado": "",
            "criarProjeto": {
              "responsavelID": [
                `${this.representanteId}`
              ],
              "etapaID": null,
              "representanteID": [
                `${this.representanteId}`
              ]
            },
            "distribuidorID": [
              "1"
            ],
            "fornecedorID": null,
            "enviarNotificacaoSistema": [
              `${this.representanteId}`
            ],
            "enviarNotificacaoEmail": [
              `${this.representanteId}`
            ],
            "estilos": {
              "corPlanoFundo": "#0097ce",
              "corTexto": "#0097ce",
              "corBotaoFundo": "#fed924",
              "corBotaoTexto": "#1b3255"
            },
            "tarifas": {
              "AC": 0.77,
              "AL": 0.8,
              "AP": 0.8,
              "AM": 0.8,
              "BA": 0.8,
              "CE": 0.8,
              "DF": 0.8,
              "ES": 0.8,
              "GO": 0.8,
              "MA": 0.8,
              "MT": 0.8,
              "MS": 0.8,
              "MG": 0.8,
              "PA": 0.8,
              "PB": 0.8,
              "PR": 0.9,
              "PE": 0.9,
              "PI": 0.9,
              "RJ": 0.9,
              "RN": 0.9,
              "RS": 0.9,
              "RO": 0.9,
              "RR": 0.9,
              "SC": 0.9,
              "SP": 0.66,
              "SE": 0.8,
              "TO": 0.8
            },
            "topologia": "tradicional",
            "taxaDesempenho": 0.8,
            "tipoTelhado": "ceramico",
            "fase": "trifasico",
            "tensaoRede": "127/220V",
            "desvioAzimutal": 90,
            "inclinacao": 20,
            "camposDimensionamento": [
              {
                "distribuidorID": "1",
                "campos": [
                  {
                    "chave": "[cdd_tipo_estrutura]",
                    "valor": "Cerâmico"
                  },
                  {
                    "chave": "[cdd_marca_estrutura]",
                    "valor": "SPIN"
                  }
                ]
              }
            ],
            "textos": {
              "avisoLegal": "Área útil",
              "tituloPrincipal": "Calculadora Solar",
              "tituloResultadoSimulacao": "Resultado da simulação",
              "infoSucesso": "Solicitação do orçamento realizada com sucesso!",
              "botaoSimular": "Simular",
              "botaoVoltar": "Voltar",
              "botaoSolicitarOrcamento": "Solicitar Orçamento",
              "botaoProsseguir": "Prosseguir",
              "potenciaInfo": "Potência total estimada para geração de energia equivalente ao consumo informado.",
              "areaInfo": "Área total estimada para a instalação dos equipamentos.",
              "precoInfo": "Valor total estimado para execução do projeto.",
              "potenciaTitulo": "Potência Total",
              "areaTitulo": "Área útil",
              "precoTitulo": "Preço do Projeto",
              "paybackTitulo": "Payback",
              "retornoTitulo": "Retorno em 25 anos",
              "paybackInfo": "Tempo total estimado para o retorno do investimento.",
              "retornoInfo": "Valor total estimado de retorno financeiro ao final de 25 anos."
            }
          }
        }
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            this.alteraTemplate()
            console.log("Alterar nitegração simulador solar feito.")
          })
    },
    /*
    Método para adiconar o raquivo doc na área de download do
    template
     */
    async alteraTemplate(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation CriarTemplate($input: TemplateCreateInput!) {\n  criarTemplate(input: $input) {\n    id\n    tipo\n    nome\n  }\n}\n"


      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "CriarTemplate",
        "query": query,
        "variables": {
          "input": {
            "nome": "Template Proposta Corsolar",
            "template": `${this.arquivoTemplate}`,
            "tipo": "proposta"
          }
        }
      }

      const response = await axios ({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

    },
    /*
    Faz o logout de admin que é usado para realizar a criação
    do usuário gestor.
     */
    async deslogarComoEmpresa(){
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation DeslogarComo {\n  deslogarComo\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "DeslogarComo",
        "query": query,
        "variables": {}
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(data => {
            console.log(`Deslogado como empresa`)
            router.push('/home')
          })

    },
    /*
    Realiza o logout da aplicação quando soplicitado na barra
    de menu lateral.
     */
    async logout() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"

      const query = "mutation Deslogar {\n deslogar\n}\n"

      const headers = {
        "Authorization": `Bearer ${window.token}`,
        "content-type": "application/json"
      }

      const queryGraphql = {
        "operationName": "Deslogar",
        "query": query,
        "variables": {}
      }

      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })

          .then(
              router.push('/'),
          )

    }
  }
}
</script>
<style>
#linkDownload{
  color: #222222;
  text-decoration: none;
}
#principal{
  background-image: linear-gradient(to left top, #051937, #002a47, #003c52, #004d58, #035e5a);
  color: #c9c7c7;
}
#logo_corsol_header{
  width: 11rem;
}
#formularioGerar {
  padding: 3rem;
  width: 100%;
}
#user_info,
#outras_info,
#card_empresa,
#adc_nome_empresa,
#apenas_inputs{
  background-color: #1e1f22;
  color: #b7b7b7;
}
#tiutlo_e_cancel_btn{
  display: flex;
  width: 100%;
  align-items: center;
}
#titulo{
  width: 50%;
  display: inline-block;
}
#cancel_btn_div{
  width: 50%;
  display: inline-block;
  text-align: right;
}
#outras_info{
  padding: 2.5rem 2.5rem 0.5rem 2.5rem;
  display: flex;
  width: 100%;
}
#apenas_inputs{
  padding: 0.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  width: 100%;
}
#apenas_inputs_user,
#adc_nome_empresa,
#card_empresa{
  padding: 2.5rem;
}
#input_field_cnpj{
  width: 98%;
  margin-top: -1.2rem;
}
#input_field_user{
  width: 100%;
}
#nome_empresa{
  text-align: center;
  font-size: 18pt;
  font-style: italic;
}
#selectCadastro,#selectCadastroDir{
  display: inline-block;
  width: 48%;
  margin: auto;
}
#input_password{
  margin-top: 1.3%;
}
#input_cnpj,
#input_inscriEstadual,
#input_nomeSobrenome,
#input_email,
#input_password{
  display: inline-block;
  width: 100%;
  margin: 1% 1% 1% 1%;
}
#btn_agree{
  text-align: right;
}
#btn_email_gestor{
  display: flex;
  width: 100%;
  margin: 1rem;
  align-items: center;
}
#email_gestor,
#input_telefone,
#nome_gestor,
#input_senhas,
#senha_1,
#senha_2{
  margin: auto;
  margin-bottom: 2%;
  width: 100%;
}
@media screen and (max-width: 720px) {
  #formularioGerar,
  #apenas_inputs_user,
  #adc_nome_empresa,
  #card_empresa,
  #formularioGerar{
    padding: 1rem;
  }
  #outras_info,
  #apenas_inputs{
    padding: 1rem;
    display: inline-block;
    width: 100%;
  }
  #adc_nome_empresa{
    padding: 0.5rem;
    text-align: center;
  }
  #input_field_cnpj{
    width: 100%;
    margin-top: -2rem;
  }
  #selectCadastro,
  #selectCadastroDir{
    width: 100%;
    display: inline-block;
  }
}
</style>