import Q from "../../../dist";
import { formatDatesDiff } from "../helpers";
import store from "../store";
// import Item from "./item";

export default new Q({
  name: "List",
  debug: true,
  state: store.rewatch(["todos"]),
  children: {
    // Item
  },
  template({ renders }, { todos }) {
    const item = ({ id, text, done, endsAt }: any, idx: number) => {
      const content = done ? `<del>${text}</dev>` : text;
      const secondary = done ? "opacity: 0.3" : "";
      const daysLeft = formatDatesDiff(endsAt);
      return `<li style="display: flex; align-items: center; border: 2px solid #ab9296; padding: 6px; margin-bottom: 13px; cursor: pointer; ${secondary}">
        <span style="flex-grow: 1; text-align: left; margin: 0 1rem;" onclick="onToggleDone(${idx})">${content}</span>
        <span style="background-color: #eee; padding: 2px 4px; color: #7d7d7d; "><small><b>${daysLeft}</b></small></span>
        <span style="font-weight: bolder; width: 1.5rem; font-size: 1.5rem; line-height: 1.5rem;"onclick="onRemove(${id})">&times;</span>
      </li>`;
    };

    return `<section style="border: 2px solid pink;">
      <small>renders: ${renders}</small>
      <ul style="list-style: none; padding-inline-start: 0; text-align: center; margin: 1rem;">${
        todos.length ? todos.map(item).join("") : "There are no todos"
      }</ul>
      </section>`;
  },
  methods: {
    onToggleDone(idx: number) {
      this.state.todos[idx].done = !this.state.todos[idx].done;
    },
    onRemove(id: number) {
      this.state.todos = this.state.todos.filter((t: any) => t.id !== id);
    }
  },
  before() {
    this.data.renders++;
  },
  mounted() {
    this.data.renders = 1;
  }
});
