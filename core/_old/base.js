const Q = function (options) {
  this.el = document.querySelector(options.selector);
  this.data = options.data;
  this.template = options.template;
};

Q.prototype.render = function () {
  this.el.innerHTML = this.template(this.data);
};

var app = new Q({
  selector: "#app",
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
});

// Render the initial UI
app.render();

// After 3 seconds, update the data and render a new UI
setTimeout(function () {
  // Add a new item to the data
  app.data.todos.push("Take a nap... zzzzz");

  // Render an updated UI
  app.render();
}, 3000);
