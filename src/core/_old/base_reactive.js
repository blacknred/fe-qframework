var handler = function (instance) {
  return {
    get: function (obj, prop) {
      if (
        ["[object Object]", "[object Array]"].indexOf(
          Object.prototype.toString.call(obj[prop])
        ) > -1
      ) {
        return new Proxy(obj[prop], handler(instance));
      }
      return obj[prop];
    },
    set: function (obj, prop, value) {
      obj[prop] = value;
      instance.render();
      return true;
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop];
      instance.render();
      return true;
    }
  };
};

var Q = function (options) {
  // Variables
  var _this = this;
  _this.el = document.querySelector(options.selector);
  var _data = new Proxy(options.data, handler(this));
  _this.template = options.template;

  // Define setter and getter for data
  Object.defineProperty(this, "data", {
    get: function () {
      return _data;
    },
    set: function (data) {
      _data = new Proxy(data, handler(_this));
      _this.render();
      return true;
    }
  });
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
setInterval(function () {
  app.data.todos.push("Take a nap... zzzzz");
}, 3000);
