Sure, I'll add the login label that will link to the login page. Here's the updated code:

```html
<template>
  <div class="container flex flex-col items-center justify-center h-screen">
    <div
      v-if="loginMessage != ''"
      ref="animatedDiv"
      :class="{
        'bg-green-50 text-green-800': loginMessage == 'Login Successful',
      }"
      class="flex p-4 z-50 fixed top-1 w-80 text-sm items-center justify-between text-red-800 rounded-lg bg-red-50 transition-opacity duration-1000 ease-out animate-slide-in-left"
    >
      <div class="flex items-center">
        <span class="material-symbols-outlined pr-2"> error </span>
        <span class="font-medium">{{ loginMessage }}</span>
      </div>
      <button
        type="button"
        id="closeBtn"
        @click="closeDiv"
        class="text-xl font-bold"
      >
        &times;
      </button>
    </div>
    <div
      class="container_one bg-cover bg-right flex bg-transparent w-full md:w-1/2"
    >
      <div
        class="mx-auto flex flex-row justify-center bg-transparent h-[82vh] md:h-screen rounded-tr-[100px] w-full"
      >
        <section>
          <div class="main max-h-screen">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <h1
              class="text-white my-2 font-bold sm:mt-28 text-2xl border-l-8 pl-2 border-green-600"
            >
              <span class="text-green-600">VSU Lost and Found </span>
              | User Portal
              <p class="text-sm text-black">Find Your Lost Items with a Click!</p>
            </h1>
            <div class="register">
              <form class="form bg-transparent text-center align-middle" @submit.prevent="register">
                <label class="lab bg-transparent text-5xl font-bold text-green-" for="chk" aria-hidden="true">Register</label>
                <input
                  class="input"
                  type="text"
                  v-model="username"
                  name="txt"
                  placeholder="Username"
                  required
                />
                <input
                  class="input"
                  type="email"
                  v-model="emailR"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  class="input"
                  type="text"
                  v-model="passwordR"
                  name="pswd"
                  placeholder="Password"
                  required=""
                />
                <button
                  type="submit"
                  class="login bg-green-700 h-9 mt-4 text-white"
                >
                  Register
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                  
                </button>
              </form>
            </div>
          </div>
          <div class="text-center mt-32">
            <p class="text-white">Already have an Account?</p>
         <router-link to="/login" class="login-label text-white font-semibold text-lg">LOGIN</router-link>
          </div>
        </section>
      </div>
    </div>
    <div class="container_two bg-transparent w-full md:w-1/2 h-[25vh] md:h-screen">
      <!-- Removed VSU Logo and label -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const emailR = ref("");
    const passwordR = ref("");
    const username = ref("");
    const loginMessage = ref("");
    const showRegister = ref(false); // Track if register fields should be shown

    const register = async () => {
      const regMessage = store.dispatch("register", {
        email: emailR.value.toLowerCase(),
        password: passwordR.value,
        username: username.value,
      });
      loginMessage.value = await regMessage;
      setTimeout(() => {
        loginMessage.value = "";
      }, 4000);
    }

    return {
      emailR,
      passwordR,
      username,
      loginMessage,
      showRegister,
      register,
    };
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  background-image: url('/img/vsu.jpg');
  background-size: cover;
  background-position: center;
}

.inputbox {
  position: relative;
  padding-top: 10px;
  width: 356px;
  margin-bottom: 10px;
}

.inputbox input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: black;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;
}

.inputbox span {


  position: absolute;
  left: 0;
  padding: 20px 10px 10px;
  font-size: 1em;
  color: white;
  font-weight: 500;
  text-align: center;
  letter-spacing: 00.05em;
  transition: 0.5s;
  pointer-events: none;
}

.inputbox input:valid ~ span,
.inputbox input:focus ~ span

 {
  color: #59d559;
  transform: translateX(-10px) translateY(-34px

);
  font-size: 0, 75em;
}

.inputbox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #59d559;
  border-radius: 4px;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputbox input:valid ~ i,
.inputbox input:focus ~ i {
  height: 44px;
}

.login {
  --primary-color: rgb(21 128 61);
  --secondary-color: #fff;
  --hover-color: #59d559;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  font-weight: bold;
}

.login .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--primary-color);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

.login .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--secondary-color);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

.login:hover {
  background-color: var(--hover-color);
}

.login:hover .arrow {
  background: var(--secondary-color);
}

.login:hover .arrow:before {
  right: 0;
}

.login:active {
  transform: scale(0.9);
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0px 24px 24px;
}

#chk {
  display: none;
}

/*Register*/
.register {
  background-color: transparent;
  border-top-color: black;
  border-top-width: 1px;
  transform: translateY(5%);
  transition: 0.8s ease-in-out;
  z-index: 13;
}

.register label {
  transform: scale(0.6);
}

#chk:checked ~ .register {
  transform: translateY(-90%);
}

#chk:checked ~ .register label {
  transform: scale(1);
  margin: 5% 0 5%;
}

#chk:checked ~ .login label {
  transform: scale(0.6);
  margin: 10% 0 5%;
}

#border_text {
  position: absolute;
  top: -18px;
  left: 50%;
  color: black;
  font-size: larger;
  transform: translateX(-50%);
  background-color: white;
  padding: 0 5px;
}

/*Button*/
.form button {
  cursor: pointer;
  transition: 0.2s ease-in;
}

.body {
  overflow: hidden;
}

.login-label {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}
</style>
```

This code adds a login label at the bottom of the screen, which when clicked will navigate the user to the login page. Adjustments have been made to the CSS to style the login label appropriately.