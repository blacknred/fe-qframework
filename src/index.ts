import Q from "../core";

const app = new Q({
  data: {
    heading: "My Todos",
    todos: ["Swim", "Climb", "Jump", "Play"]
  },
  template: function (props) {
    return `
      <h1>${props.heading}</h1>
			<ul>
				${props.todos
          .map(function (todo) {
            return `<li>${todo}</li>`;
          })
          .join("")}
      </ul>`;
  }
}).mount("#app");

setInterval(function () {
  if (Math.random() > 0.5) app.data.heading += "zzzz";
  else app.data.todos.push("Take a nap... zzzzz");
}, 8000);
