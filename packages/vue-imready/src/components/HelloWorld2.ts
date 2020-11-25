import { defineComponent, h } from 'vue';
import { useImReady } from "./useImReady";

export default defineComponent({
  name: 'HelloWorld2',
  setup() {
    console.log("SET");
    return {
      im: useImReady({
      selector: "img",
      }),
    };
  },
  render() {
    // console.log("readyCount", this.im.readyCount);
    console.log("ready", this.im.isReady);
    return h("div", { ref: this.im.register() }, [
      h("img", { src: "./img/logo.82b9c7a5.png" }),
      h("img", { src: "./img/logo.82b9c7a5.png" }),
      h("img", { src: "./img/logo.82b9c7a5.png" }),
      h("img", { src: "./img/logo.82b9c7a5.png" }),
    ]);
  }
});
