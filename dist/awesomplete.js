"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _typeof;

	return {
		setters: [],
		execute: function () {
			_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};


			(function () {

				var _ = function _(input, o) {
					var me = this;

					this.isOpened = false;

					this.input = $(input);
					this.input.setAttribute("autocomplete", "off");
					this.input.setAttribute("aria-autocomplete", "list");

					o = o || {};

					configure(this, {
						minChars: 2,
						maxItems: 10,
						autoFirst: false,
						data: _.DATA,
						filter: _.FILTER_CONTAINS,
						sort: _.SORT_BYLENGTH,
						item: _.ITEM,
						replace: _.REPLACE
					}, o);

					this.index = -1;

					this.container = $.create("div", {
						className: "awesomplete",
						around: input
					});

					this.ul = $.create("ul", {
						hidden: "hidden",
						inside: this.container
					});

					this.status = $.create("span", {
						className: "visually-hidden",
						role: "status",
						"aria-live": "assertive",
						"aria-relevant": "additions",
						inside: this.container
					});

					$.bind(this.input, {
						"input": this.evaluate.bind(this),
						"blur": this.close.bind(this, { reason: "blur" }),
						"keydown": function keydown(evt) {
							var c = evt.keyCode;

							if (me.opened) {
								if (c === 13 && me.selected) {
									evt.preventDefault();
									me.select();
								} else if (c === 27) {
									me.close({ reason: "esc" });
								} else if (c === 38 || c === 40) {
									evt.preventDefault();
									me[c === 38 ? "previous" : "next"]();
								}
							}
						}
					});

					$.bind(this.input.form, { "submit": this.close.bind(this, { reason: "submit" }) });

					$.bind(this.ul, { "mousedown": function mousedown(evt) {
							var li = evt.target;

							if (li !== this) {

								while (li && !/li/i.test(li.nodeName)) {
									li = li.parentNode;
								}

								if (li && evt.button === 0) {
									evt.preventDefault();
									me.select(li, evt.target);
								}
							}
						} });

					if (this.input.hasAttribute("list")) {
						this.list = "#" + this.input.getAttribute("list");
						this.input.removeAttribute("list");
					} else {
						this.list = this.input.getAttribute("data-list") || o.list || [];
					}

					_.all.push(this);
				};

				_.prototype = {
					set list(list) {
						if (Array.isArray(list)) {
							this._list = list;
						} else if (typeof list === "string" && list.indexOf(",") > -1) {
							this._list = list.split(/\s*,\s*/);
						} else {
							list = $(list);

							if (list && list.children) {
								var items = [];
								slice.apply(list.children).forEach(function (el) {
									if (!el.disabled) {
										var text = el.textContent.trim();
										var value = el.value || text;
										var label = el.label || text;
										if (value !== "") {
											items.push({ label: label, value: value });
										}
									}
								});
								this._list = items;
							}
						}

						if (document.activeElement === this.input) {
							this.evaluate();
						}
					},

					get selected() {
						return this.index > -1;
					},

					get opened() {
						return this.isOpened;
					},

					close: function close(o) {
						if (!this.opened) {
							return;
						}

						this.ul.setAttribute("hidden", "");
						this.isOpened = false;
						this.index = -1;

						$.fire(this.input, "awesomplete-close", o || {});
					},

					open: function open() {
						this.ul.removeAttribute("hidden");
						this.isOpened = true;

						if (this.autoFirst && this.index === -1) {
							this.goto(0);
						}

						$.fire(this.input, "awesomplete-open");
					},

					next: function next() {
						var count = this.ul.children.length;
						this.goto(this.index < count - 1 ? this.index + 1 : count ? 0 : -1);
					},

					previous: function previous() {
						var count = this.ul.children.length;
						var pos = this.index - 1;

						this.goto(this.selected && pos !== -1 ? pos : count - 1);
					},

					goto: function goto(i) {
						var lis = this.ul.children;

						if (this.selected) {
							lis[this.index].setAttribute("aria-selected", "false");
						}

						this.index = i;

						if (i > -1 && lis.length > 0) {
							lis[i].setAttribute("aria-selected", "true");
							this.status.textContent = lis[i].textContent;

							$.fire(this.input, "awesomplete-highlight", {
								text: this.suggestions[this.index]
							});
						}
					},

					select: function select(selected, origin) {
						if (selected) {
							this.index = $.siblingIndex(selected);
						} else {
							selected = this.ul.children[this.index];
						}

						if (selected) {
							var suggestion = this.suggestions[this.index];

							var allowed = $.fire(this.input, "awesomplete-select", {
								text: suggestion,
								origin: origin || selected
							});

							if (allowed) {
								this.replace(suggestion);
								this.close({ reason: "select" });
								$.fire(this.input, "awesomplete-selectcomplete", {
									text: suggestion
								});
							}
						}
					},

					evaluate: function evaluate() {
						var me = this;
						var value = this.input.value;

						if (value.length >= this.minChars && this._list.length > 0) {
							this.index = -1;

							this.ul.innerHTML = "";

							this.suggestions = this._list.map(function (item) {
								return new Suggestion(me.data(item, value));
							}).filter(function (item) {
								return me.filter(item, value);
							}).sort(this.sort).slice(0, this.maxItems);

							this.suggestions.forEach(function (text) {
								me.ul.appendChild(me.item(text, value));
							});

							if (this.ul.children.length === 0) {
								this.close({ reason: "nomatches" });
							} else {
								this.open();
							}
						} else {
							this.close({ reason: "nomatches" });
						}
					}
				};

				_.all = [];

				_.FILTER_CONTAINS = function (text, input) {
					return RegExp($.regExpEscape(input.trim()), "i").test(text);
				};

				_.FILTER_STARTSWITH = function (text, input) {
					return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
				};

				_.SORT_BYLENGTH = function (a, b) {
					if (a.length !== b.length) {
						return a.length - b.length;
					}

					return a < b ? -1 : 1;
				};

				_.ITEM = function (text, input) {
					var html = input.trim() === '' ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
					return $.create("li", {
						innerHTML: html,
						"aria-selected": "false"
					});
				};

				_.REPLACE = function (text) {
					this.input.value = text.value;
				};

				_.DATA = function (item) {
					return item;
				};

				function Suggestion(data) {
					var o = Array.isArray(data) ? { label: data[0], value: data[1] } : (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

					this.label = o.label || o.value;
					this.value = o.value;
				}
				Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
					get: function get() {
						return this.label.length;
					}
				});
				Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
					return "" + this.label;
				};

				function configure(instance, properties, o) {
					for (var i in properties) {
						var initial = properties[i],
						    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

						if (typeof initial === "number") {
							instance[i] = parseInt(attrValue);
						} else if (initial === false) {
							instance[i] = attrValue !== null;
						} else if (initial instanceof Function) {
							instance[i] = null;
						} else {
							instance[i] = attrValue;
						}

						if (!instance[i] && instance[i] !== 0) {
							instance[i] = i in o ? o[i] : initial;
						}
					}
				}

				var slice = Array.prototype.slice;

				function $(expr, con) {
					return typeof expr === "string" ? (con || document).querySelector(expr) : expr || null;
				}

				function $$(expr, con) {
					return slice.call((con || document).querySelectorAll(expr));
				}

				$.create = function (tag, o) {
					var element = document.createElement(tag);

					for (var i in o) {
						var val = o[i];

						if (i === "inside") {
							$(val).appendChild(element);
						} else if (i === "around") {
							var ref = $(val);
							ref.parentNode.insertBefore(element, ref);
							element.appendChild(ref);
						} else if (i in element) {
							element[i] = val;
						} else {
							element.setAttribute(i, val);
						}
					}

					return element;
				};

				$.bind = function (element, o) {
					if (element) {
						for (var event in o) {
							var callback = o[event];

							event.split(/\s+/).forEach(function (event) {
								element.addEventListener(event, callback);
							});
						}
					}
				};

				$.fire = function (target, type, properties) {
					var evt = document.createEvent("HTMLEvents");

					evt.initEvent(type, true, true);

					for (var j in properties) {
						evt[j] = properties[j];
					}

					return target.dispatchEvent(evt);
				};

				$.regExpEscape = function (s) {
					return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
				};

				$.siblingIndex = function (el) {
					for (var i = 0; el = el.previousElementSibling; i++) {}
					return i;
				};

				function init() {
					$$("input.awesomplete").forEach(function (input) {
						new _(input);
					});
				}

				if (typeof Document !== "undefined") {
					if (document.readyState !== "loading") {
						init();
					} else {
						document.addEventListener("DOMContentLoaded", init);
					}
				}

				_.$ = $;
				_.$$ = $$;

				if (typeof self !== "undefined") {
					self.Awesomplete = _;
				}

				if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
					module.exports = _;
				}

				return _;
			})();
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3ZXNvbXBsZXRlLmpzIl0sIm5hbWVzIjpbIl8iLCJpbnB1dCIsIm8iLCJtZSIsImlzT3BlbmVkIiwiJCIsInNldEF0dHJpYnV0ZSIsImNvbmZpZ3VyZSIsIm1pbkNoYXJzIiwibWF4SXRlbXMiLCJhdXRvRmlyc3QiLCJkYXRhIiwiREFUQSIsImZpbHRlciIsIkZJTFRFUl9DT05UQUlOUyIsInNvcnQiLCJTT1JUX0JZTEVOR1RIIiwiaXRlbSIsIklURU0iLCJyZXBsYWNlIiwiUkVQTEFDRSIsImluZGV4IiwiY29udGFpbmVyIiwiY3JlYXRlIiwiY2xhc3NOYW1lIiwiYXJvdW5kIiwidWwiLCJoaWRkZW4iLCJpbnNpZGUiLCJzdGF0dXMiLCJyb2xlIiwiYmluZCIsImV2YWx1YXRlIiwiY2xvc2UiLCJyZWFzb24iLCJldnQiLCJjIiwia2V5Q29kZSIsIm9wZW5lZCIsInNlbGVjdGVkIiwicHJldmVudERlZmF1bHQiLCJzZWxlY3QiLCJmb3JtIiwibGkiLCJ0YXJnZXQiLCJ0ZXN0Iiwibm9kZU5hbWUiLCJwYXJlbnROb2RlIiwiYnV0dG9uIiwiaGFzQXR0cmlidXRlIiwibGlzdCIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImFsbCIsInB1c2giLCJwcm90b3R5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJfbGlzdCIsImluZGV4T2YiLCJzcGxpdCIsImNoaWxkcmVuIiwiaXRlbXMiLCJzbGljZSIsImFwcGx5IiwiZm9yRWFjaCIsImVsIiwiZGlzYWJsZWQiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJ0cmltIiwidmFsdWUiLCJsYWJlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImZpcmUiLCJvcGVuIiwiZ290byIsIm5leHQiLCJjb3VudCIsImxlbmd0aCIsInByZXZpb3VzIiwicG9zIiwiaSIsImxpcyIsInN1Z2dlc3Rpb25zIiwib3JpZ2luIiwic2libGluZ0luZGV4Iiwic3VnZ2VzdGlvbiIsImFsbG93ZWQiLCJpbm5lckhUTUwiLCJtYXAiLCJTdWdnZXN0aW9uIiwiYXBwZW5kQ2hpbGQiLCJSZWdFeHAiLCJyZWdFeHBFc2NhcGUiLCJGSUxURVJfU1RBUlRTV0lUSCIsImEiLCJiIiwiaHRtbCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwiZ2V0IiwidG9TdHJpbmciLCJ2YWx1ZU9mIiwiaW5zdGFuY2UiLCJwcm9wZXJ0aWVzIiwiaW5pdGlhbCIsImF0dHJWYWx1ZSIsInRvTG93ZXJDYXNlIiwicGFyc2VJbnQiLCJGdW5jdGlvbiIsImV4cHIiLCJjb24iLCJxdWVyeVNlbGVjdG9yIiwiJCQiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInRhZyIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidmFsIiwicmVmIiwiaW5zZXJ0QmVmb3JlIiwiZXZlbnQiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0eXBlIiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJqIiwiZGlzcGF0Y2hFdmVudCIsInMiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiaW5pdCIsIkRvY3VtZW50IiwicmVhZHlTdGF0ZSIsInNlbGYiLCJBd2Vzb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0MsZ0JBQVk7O0FBRWIsUUFBSUEsSUFBSSxTQUFKQSxDQUFJLENBQVVDLEtBQVYsRUFBaUJDLENBQWpCLEVBQW9CO0FBQzNCLFNBQUlDLEtBQUssSUFBVDs7QUFJQSxVQUFLQyxRQUFMLEdBQWdCLEtBQWhCOztBQUVBLFVBQUtILEtBQUwsR0FBYUksRUFBRUosS0FBRixDQUFiO0FBQ0EsVUFBS0EsS0FBTCxDQUFXSyxZQUFYLENBQXdCLGNBQXhCLEVBQXdDLEtBQXhDO0FBQ0EsVUFBS0wsS0FBTCxDQUFXSyxZQUFYLENBQXdCLG1CQUF4QixFQUE2QyxNQUE3Qzs7QUFFQUosU0FBSUEsS0FBSyxFQUFUOztBQUVBSyxlQUFVLElBQVYsRUFBZ0I7QUFDZkMsZ0JBQVUsQ0FESztB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
