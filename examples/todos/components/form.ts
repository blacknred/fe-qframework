import Q from "../../../dist";
import store from "../store";

export default new Q({
  name: "Form",
  debug: true,
  state: {
    canAdd: false,
    freeze: false,
    sort: "priority"
  },
  template({ text, date, renders }, { canAdd, freeze, sort }) {
    const today = new Date().toISOString().split("T")[0];
    const isChecked = freeze ? "checked" : "";
    const isDisabled = canAdd ? "" : "disabled";
    const sortOptions = ["date", "priority"].reduce((str, opt) => {
      const selected = sort === opt ? "selected" : "";
      return str + `<option ${selected} value="${opt}">${opt}</option>`;
    }, "");

    return `<section style="border: 2px solid pink;"
    <small><small>renders: ${renders}</small></small>
    <br />
    <div style="margin: 0.5rem 1rem;">
      <div style="height: 1.8rem; display: flex; margin-bottom: 5px; border: 3px solid #ab9296;">
        <input style="flex: 1; border: 0; padding: 0 1rem; outline: none;" value="${text}" oninput="onChange(this.value);"/>
        <input style="width: 45px; border: 0; cursor: pointer; padding-right: 10px; outline: none;" type="date"
          oninput="onSetDate(this.value)" value="${date}" min="${today}">
        <button style="border: 0; width: 50px; cursor: pointer; background-color: transparent;
          border-left: 2px solid #ab9296;" ${isDisabled} onclick="onSubmit()"> ADD </button>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <input type="checkbox" ${isChecked} onclick="onFreezeToggle()"><small style="flex: 1;">&nbspfreeze list</small>
        <small>sort by&nbsp;</small><select onchange="onSort(this.val)">${sortOptions}</select>
      </div>
    </div>
    </section>`;
  },
  methods: {
    async onSubmit() {
      const { text, date } = this.data;
      if (!text.length) return;

      if (this.state.freeze && !(await this.$warn("a u sure?"))) {
        return;
      }

      store.data.todos.push({
        endsAt: date,
        id: Date.now(),
        done: false,
        text
      });

      this.data.text = "";
      this.state.canAdd = false;
    },
    onChange(val: string) {
      this.data.text = val;

      if (val.length && !this.state.canAdd) {
        this.state.canAdd = true;
      } else if (!val.length && this.state.canAdd) {
        this.state.canAdd = false;
      }
    },
    onSetDate(val) {
      this.data.date = val;
    },
    onSort(val) {
      this.state.sort = val;
    },
    onFreezeToggle() {
      this.state.freeze = !this.state.freeze;
    },
    onKeyDown(key: KeyboardEvent) {
      if (key.code === "Enter" || key.code === "NumpadEnter") {
        this.methods.onSubmit();
      }
    }
  },
  before(prev) {
    this.data.renders++;
  },
  mounted() {
    this.data.renders = 1;
    this.data.text = "";
    this.data.date = new Date().toISOString().split("T")[0];
    document.addEventListener("keydown", this.methods.onKeyDown);
  },
  unmounted() {
    document.removeEventListener("keydown", this.methods.onKeyDown);
  }
});
