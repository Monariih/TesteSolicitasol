 <template>

   <!-- Navbar é o cabeçalho onde segura o logo corsol,
    e aonde começa o navigation drawer é onde habita o
    menu lateral e todas as suas configurações.-->

   <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title id="header"><img id="logo_corsol_header" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-toolbar-title>

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

      <v-main id="principal">
        <v-container>
          <v-row>
            <template v-for="n in 4" :key="n">
              <v-col
                  class="mt-2"
                  cols="12"
              >
                <strong> Guia {{ n }} </strong>



              </v-col>

              <v-col
                  v-for="j in 6"
                  :key="`${n}${j}`"
                  cols="6"
                  md="2"
              >
                <v-sheet height="150"></v-sheet>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
<script>
import axios from "axios";
import router from "../router";

export default {


  data: () => {
    return ({
      deslogar: false,
      drawer: null,
    })
  },
  methods: {
    //autoexplicativo com o nome logout()
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
  }
}
</script>
<style>
#logo_corsol_header {
  width: 11rem;
}
#linkDownload{
  color: #222222;
  text-decoration: none;
}
#principal{
  background-image: linear-gradient(to left top, #051937, #002a47, #003c52, #004d58, #035e5a);
}
</style>