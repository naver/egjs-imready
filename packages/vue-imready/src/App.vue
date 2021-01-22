<template>
  <div class="page" id="home" v-bind:ref="im.register()">
    <div class="background">
      <div class="wrapper" ref="wrapper">
        <img v-for="index in indexes" v-bind:key="index" />
      </div>
    </div>
    <div class="container">
      <h1>{{im.isReady ? "I'm Vue Ready" : "Are you Ready?" }}</h1>
      <p class="progress">{{ im.totalCount ? Math.floor(100 * im.readyCount / im.totalCount) : 100 }}%</p>
      <p class="badges">
        <a
          href="https://www.npmjs.com/package/@egjs/vue-imready"
          target="_blank"
        >
          <img
            src="https://img.shields.io/npm/v/@egjs/vue-imready.svg?style=flat-square&color=007acc&label=version"
            alt="npm version"
        /></a>
        <a href="https://github.com/naver/egjs-imready" target="_blank">
          <img
            src="https://img.shields.io/github/stars/naver/egjs-imready.svg?color=42b883&style=flat-square"
        /></a>
        <a href="https://github.com/naver/egjs-imready" target="_blank">
          <img
            src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"
          />
        </a>
        <a
          href="https://github.com/naver/egjs-imready/blob/main/LICENSE"
          target="_blank"
          ><img
            src="https://img.shields.io/static/v1?style=flat-square&label=license&message=MIT&color=08CE5D"
        /></a>
      </p>
      <p class="description">
        This module is used to wait for the image or video to be ready.
      </p>
      <div class="buttons">
        <a href="https://github.com/naver/egjs-imready" target="_blank"
          >Download</a
        >
        <a
          href="https://naver.github.io/egjs-imready/release/latest/doc"
          target="_blank"
          >API</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useImReady } from "./components/useImReady";

export default defineComponent({
  name: "App",
  components: {},
  datas: {

  },
  setup() {
    const im = useImReady({
      selector: "img"
    });
    const indexes: number[] = [];

    for (let i = 0; i < 25; ++i) {
      indexes.push(i);
    }
    return {
      im,
      indexes,
    };
  },
  mounted() {
    const imgs = (this.$refs.wrapper as HTMLElement).querySelectorAll<HTMLImageElement>("img");
    const totalCount = 25;
    let count = 0;

    setTimeout(function insert() {
      // https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg
      imgs[count].style.opacity = "1";
      imgs[count].src = `https://naver.github.io/egjs-infinitegrid/assets/image/${count + 1}.jpg`;

      if (++count >= totalCount) {
          return;
      }
      setTimeout(insert, 100);
    }, 100);
  },
});
</script>

<style>
html,
body,
#app {
  position: relative;
  height: 100%;
  margin: 0;
}

a {
  text-decoration: none;
}

.page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

#home {
  min-height: 800px;
}
.container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  max-width: 800px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  overflow: hidden;
}

.background:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.background .wrapper {
  position: relative;
  width: 110%;
  height: 110%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
  min-height: 500px;
}

.background img {
  position: relative;
  width: 20%;
  height: 20%;
  border: 0;
  appearance: none;
  opacity: 0;
}

.progress {
  font-weight: bold;
}
.badges a {
  display: inline-block;
  margin: 0px 2px;
}
.buttons a,
.buttons button {
  margin: 0;
  position: relative;
  text-decoration: none;
  color: #333;
  background: transparent;
  border: 1px solid #333;
  padding: 12px 30px;
  min-width: 140px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  box-sizing: border-box;
  margin: 5px;
  transition: all ease 0.5s;
}

.buttons a:hover,
.buttons button:hover,
.buttons a.selected {
  background: #333;
  color: #fff;
}
#howtouse {
  height: auto;
  padding: 80px 20px;
}
#howtouse .container {
  top: 0;
  transform: translate(-50%);
}
#howtouse h2 {
  font-size: 1.7em;
}

.page.footer {
  background: #333;
  height: auto;
  text-align: left;
  padding: 50px 20px;
  font-weight: 400;
  text-align: center;
}

.footer p {
  margin: 8px 0;
  font-weight: 400;
}

.page.footer,
.page.footer a {
  color: #fff;
}

.footer .egjs {
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 1px;
}

.footer .egjs img {
  height: 40px;
  vertical-align: top;
  margin-right: 5px;
}

.footer .egjs .eg {
  color: #fff;
  vertical-align: top;
}

.footer .egjs .js {
  color: #f2b51d;
  vertical-align: top;
}

.footer .article p.license,
.footer .article p.copy {
  font-size: 14px;
  font-weight: bold;
}

.footer .article p.license {
  margin-bottom: 16px;
}

.footer p.copy {
  color: #30b78e;
}
</style>
