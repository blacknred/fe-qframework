import Q from "../Q";
import Form from "./form";

new Q({
  name: "App",
  debug: true,
  state: {
    title: "App",
    useForm: true,
    list: ["TS", "JS", "Q"]
  },
  children: {
    Form
  },
  template: (state, props) => `
    <section style="background: yellow;width: max-content;padding: 1rem;">
    <strong>${state.title}</strong>
    <small>renders: ${++props.renders}</small>
    ${state.useForm && "<Form />"}
    <input type="checkbox" ${state.useForm && "checked"}>use form</input>
    <br/>
    <button onclick="alert('hhmm')">alert</button>
    <ul>${state.list.map((todo: string) => `<li>${todo}</li>`).join("")}</ul>
    </section>
  `,
  mounted(vm) {
    vm.log("created");
    vm.props.renders = 0;
    // setInterval(function () {
    //   if (Math.random() > 0.5) vm.state.title += "$";
    //   else vm.state?.list.push("Another one");
    // }, 5000);
  }
}).mount("#app");
