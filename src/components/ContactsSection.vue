<template lang="pug">
  section.project-section(:id="name")
    div.enter-form
      div.post-box
        div.hole
        form(@submit.prevent="onSubmit" v-bind:class ="{disabled:formIsLocked}")
          div.letter
            span.from From:
            input.email(
              v-model = "email"
              placeholder="ex: ivanivanov@mail.ru"
              required
              type="email"
              autocomplete="on"
              id="email"
              v-bind:disabled="formIsLocked")
            span.subject Subject:
            input.subject(
              v-model = "subject"
              placeholder="ex: Create game"
              required
              type="text"
              maxlength=45
              minlength=10
              v-bind:disabled="formIsLocked")
            span.message Message:
            textarea.message(
              v-model = "message"
              rows="7"
              placeholder="Your message"
              required
              minlength=50
              v-bind:disabled="formIsLocked")
          
          div.g-recaptcha(
            data-size="invisible"
            data-sitekey = "6Ldti6AUAAAAAFrT0B_jDh743D1dNMt8Fpj0I_sB" 
            id='recaptcha')
          button.send(
            type="submit"
            v-bind:disabled="formIsLocked") Send
    
    div.car(v-html="svgcar")

</template>
<script>
import { TweenMax, TimelineLite, Linear } from "gsap/TweenMax";

export default {
  props: ["name"],
  data() {
    return {
      _email: "",
      _subject: "",
      _message: "",
      formIsLocked: false,
      svgcar: require("./../assets/car.svg")
    };
  },
  components: {},
  methods: {
    onSubmit: async function(e) {
      let token = "_test_";
      /*
      try {
        token = await grecaptcha.execute();
      } catch (e) {
        console.log(e);
        return;
      }*/

      this.animateCar();

      const api = "https://exponenta.site/api/post";
      const payload = JSON.stringify({
        email: this.email,
        subject: this.subject,
        message: this.message,
        token: token
      });

      const resp = fetch(api, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: payload
      });
    },

    animateCar: function() {
      this.formIsLocked = true;
      const car = this.$el.querySelector(".car");

      car.style.left = "-100%";
      car.classList.add("car-move");
      car.classList.remove("car-stop");

      const target = window.innerWidth / 2 - car.clientWidth;
      const tl = new TimelineLite();

      tl.to(car, 1, { left: target, ease: Linear.easeNone })
        .add(() => {
          car.classList.remove("car-move");
          car.classList.add("car-stop");
        })
        .add(() => {
          car.classList.add("car-move");
          car.classList.remove("car-stop");
        }, "+=2")
        .to(car, 1, {
          left: window.innerWidth + car.clientWidth,
          ease: Linear.easeNone
        })
        .add(() => {
          this.formIsLocked = false;
          this.email = this.subject = this.message = "";
          car.style.left = "-100%";
        })
        .play();
    }
  },
  computed: {
    email: {
      get() {
        return this.$data._email;
      },
      set(m) {
        this.$data._email = m;
      }
    },
    subject: {
      get() {
        return this.$data._subject;
      },
      set(s) {
        this.$data._subject = s;
      }
    },
    message: {
      get() {
        return this.$data._message;
      },
      set(m) {
        this.$data._message = m;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../constants/constants.scss";

section {
  position: relative;
}

.enter-form {
  display: flex;
  padding: 3em 0;
  background-color: darken($var-bg-color, 20);
}

.post-box {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding: 2em;
  width: 80%;
  margin: auto;
  background-color: #1f57b8;

  .hole {
    height: 2em;
    background-color: black;
    margin: 2em 0;
    border-radius: 1em;
  }

  .send {
    text-transform: uppercase;
    margin: 20px auto;
    font-size: 5em;
    font-weight: bolder;
    text-align: center;
    color: #CCCCCC;
    padding: 2px;
    border: none;
    background: none;
  }

  .send:hover:not(:disabled) {
    cursor: pointer;
    border: solid 2px #CCCCCC;
    padding: 0px;
    transition: all 0.1s linear;
  }
  form {
    display: flex;
    flex-direction: column;
    align-content: stretch;
    opacity: 1;
  }

  form.disabled {
    opacity: 0.7;
    transition: all 0.25s;
  }
}

.letter {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding: 8px;
  /*
  border: solid 3px #847a7a;
  border-radius: 8px;
  background-color: #e4e4e4;
*/
  span {
    text-transform: uppercase;
    font-weight: bold;
    /*color: #4a4646;*/
    color: #e4e4e4;
    margin-top: 4px;
  }

  input:not([type="submit"]),
  textarea {
    resize: none;
    padding: 8px;
    border: none;
    margin-bottom: 8px;
    background-color: #eeeeee;
  }
}

.car {
  position: fixed;
  width: 256px;
  height: 128px;
  bottom: 0px;
  left: -100%;
}

.car #car {
  display: none;
  animation: car-move-body-shake 1s linear infinite;
}

@keyframes car-move-body-shake {
  0% {
    transform: translateY(-20px);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0.4;
  }
}
</style>
