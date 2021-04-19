import Q from "../lib";
import store, { IAppStore } from "./store";
// import Item from "./item";

export default new Q({
  name: "List",
  debug: true,
  state: store,
  children: {
    // Item
  },
  template({ todos }: IAppStore, props) {
    const item = ({ id, text, done }: any, idx: number) =>
      `<li style="border: 2px solid #03a9f4;padding: 5px;margin-bottom: 5px;">
      <span onclick="q.onToggleDone(${idx})">${
        done ? `<del>${text}</dev>` : text
      }
      </span><span style="cursor: pointer; font-weight: bolder; margin-left: 1rem;"
      onclick="q.onRemove(${id})">&times;</span></li>`;

    return `<section style="border: 2px solid #03a9f4;padding: 1rem;">
      <small>renders: ${++props.renders}</small>
      <ul style="list-style: none; padding-inline-start: 0; text-align: center; margin: 0;">${
        !todos.length ? "There is no todos" : todos.map(item).join("")
      }</ul>
      </section>
    `;
  },
  mounted(vm) {
    vm.props.renders = 0;
    q.onToggleDone = (idx: number) => {
      vm.state.todos[idx].done = !vm.state.todos[idx].done;
    };
    q.onRemove = (id: number) => {
      vm.state.todos = vm.state.todos.filter((t: any) => t.id !== id);
    };
  }
});
