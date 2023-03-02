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
        <td>
          <tr class="list">E-mail representante</tr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayRepreEmail[n] }}
            </tr>
            <hr>
          </template>
        </td>
        <td>
          <tr class="list">Representante</tr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayRepreNome[n] }}
            </tr>
            <hr>
          </template>
        </td>
        <td>
          <tr class="list">Gestor</tr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayGestorEmail[n] }}
            </tr>
            <hr>
          </template>
        </td>
        <td>
          <tr class="list">Senha</tr>
          <template v-for="n in 15" :key="n">
            <tr>
              {{ this.arrayGestorSenha[n] }}
            </tr>
            <hr>
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
      arrayGestorEmail: [],
      arrayGestorSenha: [],
      teste: [],
      representante: null,
      gestor: []

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
                console.log(this.arrayRepreEmail)


                this.arrayRepreNome.push(this.representante.nome)
                //console.log(this.arrayRepreNome)

              })
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
            console.log(JSON.stringify(this.arrayGestorSenha))
            //console.log(this.gestor)
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
#tabela{
  background-color: #f2f2f2;
  color: #222222;
  text-align: center;
}
.list{
  font-size: 1.5rem;
  text-align: center;
}
td{
  background-color: #f2f2f2;
  border: solid #222222 1px;
}
</style>