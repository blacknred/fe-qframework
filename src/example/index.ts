import Q from "../core";

const app = new Q({
  data: {
    title: "LIST",
    list: ["TS", "JS", "Q"]
  },
  template: function (props, q) {
    return `
      <h1>${props.title}</h1>
			<ul>
				${props.list
          .map(function (todo) {
            return `<li>${todo}</li>`;
          })
          .join("")}
      </ul>`;
  }
}).mount("#app");

setInterval(function () {
  if (Math.random() > 0.5) app.data.title += "$";
  else app.data.list.push("Another one");
}, 8000);
