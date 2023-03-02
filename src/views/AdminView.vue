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
      <v-card id="card_login">
        <hr><br>
        <v-img id="logo_admin" src="https://cdn-icons-png.flaticon.com/512/4263/4263710.png"></v-img>
        <br><hr><br>
        <form @submit.prevent="login">
          <input type="email" placeholder="Email" v-model="email"/><br><br>
          <input type="password" placeholder="Senha" v-model="password"/><br><br>
          <v-btn @click="loginAdm">
            Login <v-icon icon="mdi-login"></v-icon>
          </v-btn>
        </form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "AdminView.vue",
  data: () => {
    return ({
      deslogar: false,
      drawer: null,
      email: null,
      password: null,
    })
  },
  methods: {
    loginAdm(){
      if(this.email != "admin.lucas.monari@cordeiro.com.br" && this.password != "Lum@5714"){
        alert("Senha e email incorretos tentar novamente")
      }else {
        router.push('/adminPainel')
      }
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
#logo_admin{
  width: 5rem;
  align-items: center;
  margin: auto;
}
input{
  background-color: #f2f2f2;
  border-radius: 3px;
}
</style>