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
      <span onclick="onToggleDone(${idx})">${
        done ? `<del>${text}</dev>` : text
      }
      </span><span style="cursor: pointer; font-weight: bolder; margin-left: 1rem;"
      onclick="onRemove(${id})">&times;</span></li>`;

    return `<section style="border: 2px solid #03a9f4;padding: 1rem;">
      <small>renders: ${++props.renders}</small>
      <ul style="list-style: none; padding-inline-start: 0; text-align: center; margin: 0;">${
        !todos.length ? "There are no todos" : todos.map(item).join("")
      }</ul>
      </section>
    `;
  },
  methods: {
    onToggleDone(idx: number) {
      this.state.todos[idx].done = !this.state.todos[idx].done;
    },
    onRemove(id: number) {
      this.state.todos = this.state.todos.filter((t: any) => t.id !== id);
    }
  },
  mounted(vm) {
    vm.props.renders = 0;
  }
});
