<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title id="header"><img id="logo_corsol_header" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-toolbar-title>

    <div>
      <v-btn>
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
  <v-main id="principal">
    <v-container>
      <v-table id="tabela">
        <tr>
          <th>
            Nomes
          </th>
          <th>
            Email representante
          </th>
          <th>
            Senha representante
          </th>
          <th>
            Email Gestor
          </th>
          <th>
            Senha Gestor
          </th>
          <th>
            Iframe
          </th>
        </tr>
        <tr v-for="(item, index) in ids">
          <td>
            {{ this.integradoresNome[index] }}
          </td>
          <td>
            {{ this.integradoresEmailRepre[index] }}
          </td>
          <td>
            {{ this.integradoresSenhaRepre[index] }}
          </td>
          <td>
            {{ this.integradoresEmailGestor[index] }}
          </td>
          <td>
            {{ this.integradoresPassGestor[index] }}
          </td>
          <td>
            <textarea id="bar"><div><iframe src="https://solicitasol.cordeiro.com.br/simulador-solar/{{ this.integradoresTokenIframe[index] }}" name="iframeSimulador" frameborder="0" scrolling="no" allowfullscreen style="width: 100%;height: 100%;"> </iframe> <script> let iframe = document.querySelector("iframe[name=iframeSimulador]"); iframe.style.width = "100%"; window.addEventListener("message", function(e) { let { height } = e.data; iframe.style.height = height + "px"; } , false); </script> </div></textarea>
          </td>
        </tr>
      </v-table>
    </v-container>
  </v-main>
</template>


<script>
import axios from "axios";
import router from "@/router";
import firebase from "firebase/compat";
import { doc, getDoc } from "firebase/firestore/lite";
import {proxyRefs} from "vue";

export default {
  name: "PainelAdminView",
  data: () => {
    return ({
      deslogar: false,
      drawer: null,
      ids: [],
      integradoresNome: [],
      integradoresEmailRepre: [],
      integradoresEmailGestor: [],
      integradoresPassGestor: [],
      integradoresTokenIframe: [],
      integradoresSenhaRepre: [],
      /*
      ---------------------------
       */
      cordeiro: [],
      cordeiroContacts: [],

    })
  },
  beforeMount() {
    this.listarEmpresas()

  },
  methods: {

    async listarEmpresas(){
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
            "first": 10,
            "offset": 0,
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
            for (var i = 0; i < data.data.data.listarEmpresas.length; i++) {
              this.ids.push(data.data.data.listarEmpresas[i].id)
            }
            this.getIntegrador()

          })

      console.log(this.ids)

    },
    async getIntegrador() {
      for (var i = 0;i < this.ids.length; i++) {
        let ref = doc(db, `/databases/cordeiro/contacts/svIntegrador.${this.ids[i]}`)

        const docSnap = await getDoc(ref)
        if (docSnap.exists()) {
          this.integradoresNome.push(docSnap.data().name)
          this.integradoresEmailRepre.push(docSnap.data().email)
          this.integradoresEmailGestor.push(docSnap.data().ownerId)
          this.integradoresPassGestor.push(docSnap.data().ownerPass)
          this.integradoresTokenIframe.push(docSnap.data().tokenIframe)
          this.integradoresSenhaRepre.push(docSnap.data().reprePass)
        } else {
          console.log("No integrador")
        }

      }

      console.log(this.integradoresNome)
      console.log(this.integradoresEmailRepre)
      console.log(this.integradoresTokenIframe)

    },
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
              router.push('/')
          )

    }
  },

}
</script>
<style scoped>
#principal{
  height: 100%;
}
#tabela{
  background-color: #2e2e2e;
  color: #bdbdbd;
  border-radius: 8px;
  width: 100%;
  padding: 0.4rem;
  box-shadow: 2px 3px 8px 0px #222222;
}
#bar{
  color: #bdbdbd;
}
tr{
  line-height: 2rem;
}
</style>