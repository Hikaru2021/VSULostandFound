Sure, here's the complete code with the addition of the register label that navigates to the "/register" route:

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
          <div class="main max-h-screen ">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <h1
              class="text-white my-2 font-bold sm:mt-28 text-2xl border-l-8 pl-2 border-green-600"
            >
              <span class="text-green-600">VSU Lost and Found </span>
              | User Portal
              <p class="text-sm text-black mb-4">Find Your Lost Items with a Click!</p>
            </h1>
            <div class="logins border-t-black">
              <form class="form mb-[100px]" @submit.prevent="loginUser">
                <label class="lab border-t-black" for="chk" aria-hidden="true">Log in</label>
                <div class="inputbox ">
                  <input type="email" v-model="emailL" class="text-white" required />
                  <span class="text-white">Email Address</span>
                  <i></i>
                </div>
                <div class="inputbox">
                  <input
                    type="password"
                    v-model="passwordL"
                    class=""
                    required
                  />
                  <span>Password</span>
                  <i></i>
                </div>
                <button
                  type="submit"
                  @click="displayAlert"
                  class="login bg-green-700 h-9 text-white"
                >
                  Login
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              </form>
            </div>
            <div class="register-label align-middle text-center text-zinc-50 font-semibold">
              <p>You don't have an Account?</p>
              <router-link to="/register" class="text-lg align-middle text-zinc-50">REGISTER</router-link>
            </div>
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
import { ref, reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const emailL = ref("");
    const passwordL = ref("");
    const emailR = ref("");
    const passwordR = ref("");
    const username = ref("");
    const loginMessage = ref("");
    const animatedDiv = ref(null);

    const login = () => {
      const message = store.dispatch("login", {
        email: emailL.value,
        password: passwordL.value,
      });
      alert(message);
    };

    async function loginUser() {
      const message = store.dispatch("login", {
        email: emailL.value,
        password: passwordL.value,
      });
      loginMessage.value = await message;
      setTimeout(() => {
        loginMessage.value = "";
      }, 4000);
    }

    async function register() {
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

    /*const register = () => {
      store.dispatch("register", {
        email: emailR.value.toLowerCase(),
        password: passwordR.value,
        username: username.value,
      });
    };*/

    return {
      emailL,
      passwordL,
      emailR,
      passwordR,
      username,
      showAlert: false,
      loginMessage,
      animatedDiv,
      login,
      loginUser,
      register,
    };
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    closeDiv() {
      this.$refs.animatedDiv.classList.add("animate-slide-out-left");
      this.$refs.animatedDiv.classList.remove("animate-slide-in-left");
      setTimeout(() => {
        this.loginMessage = "";
      }, 500);
    },
    onInput() {
      // Update the name data property whenever the input value changes
      this.name = target.value;
    },
    displayAlert() {
      /*const bool = this.showAlert;
      this.showAlert = !bool;*/
      console.log(this.loginMessage);
    },

    checkInput() {
      if (this.inputValue === "") {
        alert("The input is empty!");
      } else {
        alert("The input is not empty.");
      }
    },
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
.inputbox input:focus ~ span {
  color: #59d559;
  transform: translateX(-10px) translateY(-34px);
  font-size: 0.75em;
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
  padding:

 1em 1.8em;
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
  border-top-color: black;
  border-top-width: 1px;
}

#chk {
  display: none;
}

/*Login*/
.logins {
  position: relative;
  width: 100%;
  height: 100%;
}

.lab {
  color: black;
  font-size: 2rem;
  justify-content: center;
  display: flex;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  background: transparent; /* Added */
}

.input {
  width: 100%;
  height: 40px;
  background: #e0dede;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 4px;
}

/* Register Label */
.register-label {
  margin-top: 20px;
}

.register-label a {
  color: white; /* Adjust color as needed */
  text-decoration: underline;
  cursor: pointer;
}

.register-label a:hover {
  color: greenyellow; /* Adjust color as needed */
}

.body {
  overflow: hidden;
}
</style>


