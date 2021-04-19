import Q, { wait } from "../lib";
import store from './store';
import Form from "./form";

new Q({
  name: "App",
  debug: true,
  state: store,
  children: {
    // Form
  },
  template(state, props) {
    // computed values goes here
    const checked = state.useForm ? "checked" : "";

    if (!state.todos?.length) {
      return `<p>loading</p>`;
    }

    return `
      <section style="background: yellow;width: max-content;padding: 1rem;">
      <strong>${state.title}</strong>
      <small>renders: ${++props.renders}</small>
      ${state.useForm && "<Form />"}
      <input type="checkbox" onclick="q.u()" ${checked}>use form</input>
      <br/>
      <ul>${state.todos
        ?.map((todo: string) => `<li>${todo}</li>`)
        .join("")}</ul>
      </section>
    `;
  },
  before(prevState, state) {
    // render preventions goes here
  },
  after(state) {
    // watch side effects here
  },
  mounted(vm) {
    // initial bindings goes here
    vm.log?.("created");
    vm.props.renders = 0;
    q.u = () => (vm.state.useForm = !vm.state.useForm);
    // async function fetchTodos() {
    //   await wait(5000);
    //   vm.state.todos = ["TS", "JS", "Q"];
    // }
    // fetchTodos();

    // setInterval(function () {
    //   if (Math.random() > 0.5) vm.state.title += "$";
    //   else vm.state?.todos.push("Another one");
    // }, 5000);
  },
  unmounted(vm) {
    // clear side effects here
  }
}).mount("#app");
