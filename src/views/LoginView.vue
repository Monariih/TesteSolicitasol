<template>
  <main>
    <v-card id="card_login">
      <hr><br>
        <v-img id="logo_corsol" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-img>
      <br><hr><br>
      <form @submit.prevent="login">
        <input class="inputLogin" type="email" placeholder="Email" v-model="email"/><br><br>
        <input class="inputLogin" type="password" placeholder="Senha" v-model="password"/><br><br>
        <v-btn type="submit" value="Post">
          Login <v-icon icon="mdi-login"></v-icon>
        </v-btn>
      </form>
    </v-card>
  </main>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return{
      email: null,
      password: null,
      forcarLogin: true,
      isRemenberMe: false,
    }
  },
  methods: {
    async login() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"
      const query = "mutation Logar($email: String!, $password: String!," +
          " $isRememberMe: Boolean, $forcarLogin: Boolean, $tokenTFA: String)" +
          " {\n  logar(email: $email, password: $password, isRememberMe: $isRememberMe," +
          " forcarLogin: $forcarLogin, tokenTFA: $tokenTFA) {\n    token\n    existeOutraSessao\n" +
          "    refreshToken\n  }\n}\n"
      const headers = {
        "content-type":"application/json"
      }
      const queryGraphQl = {
        "operationName":"Logar",
        "query":query,
        "variables":{'email':`${this.email}`,
          'forcarLogin':true,
          'isRememberMe':false,
          'password':`${this.password}`}
      }
      const response = await axios({
        url:url,
        method:'post',
        headers:headers,
        data:queryGraphQl
      })

          .then(response => {
            this.token = response.data.data.logar.token
            window.token = this.token
            window.email = this.email
            if (this.token != ""){
              router.push('/create')
            }
          })
          .catch(errors => {
            console.log(errors.message)
          })



    }
  },
}
</script>
<style>
main{
  background-color: #A2AF9F;
  display: flex;
}
.inputLogin{
  background-color: #f2f2f2;
  border-radius: 3px;
}
#card_login{
  background-image: linear-gradient(to right bottom, #447dfd, #00a4ff, #00c2ff, #00d9db, #00eaad, #19f28c, #4df860, #7cfc00, #a1fd00, #c0fe00, #dcff00, #f5ff0d);
  width: 50vw;
  text-align: center;
  color: #3F4A3C;
  margin: auto;
  margin-top: 3%;

  padding: 4.5%;
  box-shadow: 0 4px 8px 0 #3F4A3C;
  transition: 0.8s;
}
#card_login:hover{
  box-shadow: 0 8px 10px 0 #3F4A3C;
}
input{
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.4rem;
}
@media screen and (max-width: 500px){
  #card_login{
    margin-top: 5%;
    width: 80%;
    padding: 8%;
    background-image: linear-gradient(to right bottom, #447dfd, #00a4ff, #00c2ff, #00d9db, #00eaad, #19f28c, #4df860, #7cfc00, #a1fd00, #c0fe00, #dcff00, #f5ff0d);
    box-shadow: 0 4px 8px 0 #3F4A3C;
    transition: 0.8s;
  }
  #card_login:hover{
    box-shadow: 0 8px 10px 0 #3F4A3C;
  }
  #logo_corsol{
    width: 15rem;
    margin: auto;
  }
}
</style>