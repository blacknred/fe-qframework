import Q, { wait } from "../lib";

export default new Q({
  name: "Form",
  debug: true,
  state: {
    name: "dmitry"
  },
  template: ({ name }, props) => `
    <br />
    <section style="background: #009688;width: max-content;padding: 1rem;">
    <strong>Form</strong>
    <small>renders: ${++props.renders}</small>
    <br />
    <label for="f">name:</label>
    <input id="f" name="name" type="text" value="${name}"/>
    </section>
    <br />
  `,
  mounted(vm) {
    vm.log?.("created");
    vm.props.renders = 0;
    // vm.props.interval = setInterval(() => {
    //   vm.state.name += "a";
    // }, 3000);

    // setTimeout(() => {
    //   vm.unmount();
    // }, 10000);
  },
  before(prevState) {
    return !prevState.name.includes("aaaaaaaa");
  },
  async unmounted(vm) {
    vm.log?.("before removed");
    clearInterval(vm.props.interval);
    await wait(5000);
    vm.log?.("after removed");
  }
});
