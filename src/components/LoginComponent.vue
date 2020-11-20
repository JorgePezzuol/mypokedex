<template>
    <div class="main">
      <div class="column">
        <h3>Login to access the Pokedex!</h3>
        <br/>
        <form>
          <div class="nes-field">
            <label for="name_field">email</label>
            <input v-model="input.email" type="text" class="nes-input" placeholder="Enter email*">
          </div>
          <div class="nes-field">
            <label for="name_field">Password</label>
            <input v-model="input.password" type="password" class="nes-input" placeholder="Enter Password*">
          </div>
        </form>
        <button type="button" v-on:click="login()" class="nes-btn is-primary">Login</button>
      </div>
    </div>
</template>

<script>
export default {
    name: 'LoginComponent',
    data() {
        return {
            input: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if(this.input.email != "" && this.input.password != "") {
                this.$axios
                .post('http://localhost:8000/api/login', {email: this.input.email, password: this.input.password})
                .then(response => {
                    window.$cookies.set('token', response.data.token, '1h');
                    this.$router.push('/pokedex')
                })
                .catch(error => {
                    alert("Not authorized");
                });
            }
            else {
                console.log("aa");
            }
        }
    }
}
</script>


<style scoped>

    body{
    font-family: 'Press Start 2P', cursive;
    padding: 0;
    margin: 0;
    background-color: #f7f1e3 !important;
    }
    h2{
    text-align: center;
    margin: 0;
    padding-top: 15px;
    }
    .main{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    }
    .column{
    padding: 30px;
    }
    button{
        margin-top: 30px !important;
        float: right;
    }

    label{
    padding-top: 15px;
    }
    .nes-checkbox{
    margin-left: 10px;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
    @media(max-width: 900px){
    .column{
    width: 100%;
    }
    }
</style>
