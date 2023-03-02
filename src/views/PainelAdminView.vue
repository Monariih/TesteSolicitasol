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
        <td id="arrayRepreEmail">
          <tr class="list">E-mail representante</tr>
          <hr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayRepreEmail[n] }}
            </tr>
          </template>
        </td>
        <td id="arrayRepreNome">
          <tr class="list">Representante</tr>
          <hr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayRepreNome[n] }}
            </tr>
          </template>
        </td>
        <td id="arrayGestorEmail">
          <tr class="list">Gestor</tr>
          <hr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayGestorEmail[n] }}
            </tr>
          </template>
        </td>
        <td id="arrayGestorSenha">
          <tr class="list">Senha</tr>
          <hr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayGestorSenha[n] }}
            </tr>
          </template>
        </td>
      </v-table>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "@/router";
import firebase from "firebase/compat";
import {el} from "vuetify/locale";

export default {
  name: "PainelAdminView",
  data: () => {
    return ({
      deslogar: false,
      drawer: null,
      arrayRepreEmail: [],
      arrayRepreEmailTratado: [],
      arrayRepreNome: [],
      arrayRepreNomeTratado: [],
      arrayGestorEmail: [],
      arrayGestorEmailTratado: [],
      arrayGestorSenha: [],
      arrayGestorSenhaTratado: [],
      gestor: [],
      representante: []
    })
  },
  beforeMount() {
    this.getRepresentante()
    this.getGestor()
  },
  methods: {
    getRepresentante(){
      const db = firebase.firestore()

      db.collection('representante').get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              doc.data()
              this.representante = doc.data()

                this.arrayRepreEmail.push(this.representante.email)



                this.arrayRepreNome.push(this.representante.nome)
                //console.log(this.arrayRepreNome)

              })
            this.arrayRepreEmailTratado = JSON.stringify(this.arrayRepreEmail)
            this.arrayRepreNomeTratado = JSON.stringify(this.arrayRepreNome)

            console.log(this.arrayRepreEmailTratado)
            console.log(this.arrayRepreNomeTratado)
          }).catch(err => {
        console.log(err.message)
      })
    },
    getGestor(){
      const db = firebase.firestore()

      db.collection('empresa').get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              doc.data()
              this.gestor = doc.data()

                this.arrayGestorEmail.push(this.gestor.emailUserResponsavel)
                //console.log(this.arrayGestorEmail)


                this.arrayGestorSenha.push(this.gestor.senhaUserResponsavel)

            })
            this.arrayGestorEmailTratado = JSON.stringify(this.arrayGestorEmail)
            this.arrayGestorSenhaTratado = JSON.stringify(this.arrayGestorSenha)

            console.log(this.arrayGestorEmailTratado)
            console.log(this.arrayGestorSenhaTratado)
          }).catch(err => {
            console.log(err.message)
          })
    },
    async logout() {
      const url = "https://cordeiro.solarview.com.br/graphql"

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
  }
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
  max-height: available ;
  width: 100%;
  display: inline-block;
  padding: 0.4rem;
  border: solid #222222 0.8px;
  box-shadow: 2px 3px 8px 0px #222222;
}
td{
  line-height: 2rem;
}
</style>