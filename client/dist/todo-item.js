"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var ENTER_KEY, ESC_KEY, TodoItem;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			ENTER_KEY = 13;
			ESC_KEY = 27;

			_export("TodoItem", TodoItem = function () {
				function TodoItem(title) {
					_classCallCheck(this, TodoItem);

					this.isCompleted = false;
					this.isEditing = false;
					this.title = title.trim();
					this.editTitle = null;
				}

				TodoItem.prototype.labelDoubleClicked = function labelDoubleClicked() {
					this.editTitle = this.title;
					this.isEditing = true;
				};

				TodoItem.prototype.finishEditing = function finishEditing() {
					this.title = this.editTitle.trim();
					this.isEditing = false;
				};

				TodoItem.prototype.onKeyUp = function onKeyUp(ev) {
					if (ev.keyCode === ENTER_KEY) {
						return this.finishEditing();
					}
					if (ev.keyCode === ESC_KEY) {
						this.editTitle = this.title;
						this.isEditing = false;
					}
				};

				return TodoItem;
			}());

			_export("TodoItem", TodoItem);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8taXRlbS5qcyJdLCJuYW1lcyI6WyJFTlRFUl9LRVkiLCJFU0NfS0VZIiwiVG9kb0l0ZW0iLCJ0aXRsZSIsImlzQ29tcGxldGVkIiwiaXNFZGl0aW5nIiwidHJpbSIsImVkaXRUaXRsZSIsImxhYmVsRG91YmxlQ2xpY2tlZCIsImZpbmlzaEVkaXRpbmciLCJvbktleVVwIiwiZXYiLCJrZXlDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU1BLFksR0FBWSxFO0FBQ1pDLFUsR0FBVSxFOzt1QkFFSEMsUTtBQUNaLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2xCLFVBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsVUFBS0YsS0FBTCxHQUFhQSxNQUFNRyxJQUFOLEVBQWI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0E7O3VCQUVEQyxrQixpQ0FBcUI7QUFDcEIsVUFBS0QsU0FBTCxHQUFpQixLQUFLSixLQUF0QjtBQUNBLFVBQUtFLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxLOzt1QkFFREksYSw0QkFBZ0I7QUFDZixVQUFLTixLQUFMLEdBQWEsS0FBS0ksU0FBTCxDQUFlRCxJQUFmLEVBQWI7QUFDQSxVQUFLRCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsSzs7dUJBRURLLE8sb0JBQVFDLEUsRUFBSTtBQUNYLFNBQUlBLEdBQUdDLE9BQUgsS0FBZVosU0FBbkIsRUFBOEI7QUFDN0IsYUFBTyxLQUFLUyxhQUFMLEVBQVA7QUFDQTtBQUNELFNBQUlFLEdBQUdDLE9BQUgsS0FBZVgsT0FBbkIsRUFBNEI7QUFDM0IsV0FBS00sU0FBTCxHQUFpQixLQUFLSixLQUF0QjtBQUNBLFdBQUtFLFNBQUwsR0FBaUIsS0FBakI7QUFDQTtBQUNELEsiLCJmaWxlIjoidG9kby1pdGVtLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
