import Q from "../lib";
import Form from "./form";
import List from "./list";

new Q({
  name: "App",
  debug: true,
  children: {
    Form,
    List
  },
  template(_, props) {
    // computed values goes here
    return `<section style="border: 2px solid #03a9f4;width: 400px;padding: 1rem;margin: 2rem auto;">
      <small>renders: ${++props.renders}</small>
      <br/>
      <Form />
      <br/>
      <List />
      </section>
    `;
  },
  before(prevState, state) {
    // render preventions goes here
    // return !prevState.name.includes("aaaaaaaa");
  },
  after(state) {
    // watch side effects here
  },
  mounted(vm) {
    // initial bindings goes here
    vm.props.renders = 0;
    // async function fetchTodos() {
    //   await wait(5000);
    //   vm.state.todos = ["TS", "JS", "Q"];
    // }
    // fetchTodos();
    // setInterval(() => store.data.todos.push(99), 5000);
  },
  unmounted(vm) {
    // clear side effects here
    // vm.log?.("before removed");
    // clearInterval(vm.props.interval);
    // await wait(5000);
    // vm.log?.("after removed");
  }
}).mount("#app");
