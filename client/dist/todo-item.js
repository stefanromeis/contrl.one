'use strict';

System.register(['./services/keycodes'], function (_export, _context) {
	"use strict";

	var keys, TodoItem;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_servicesKeycodes) {
			keys = _servicesKeycodes.default;
		}],
		execute: function () {
			_export('TodoItem', TodoItem = function () {
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
					this.isCompleted = false;
				};

				TodoItem.prototype.finishEditing = function finishEditing() {
					this.title = this.editTitle.trim();
					this.isEditing = false;
				};

				TodoItem.prototype.onKeyUp = function onKeyUp(ev) {
					if (ev.keyCode === keys.ENTER) {
						this.finishEditing();
					}
					if (ev.keyCode === keys.ESC) {
						this.editTitle = this.title;
						this.isEditing = false;
					}
				};

				return TodoItem;
			}());

			_export('TodoItem', TodoItem);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8taXRlbS5qcyJdLCJuYW1lcyI6WyJrZXlzIiwiVG9kb0l0ZW0iLCJ0aXRsZSIsImlzQ29tcGxldGVkIiwiaXNFZGl0aW5nIiwidHJpbSIsImVkaXRUaXRsZSIsImxhYmVsRG91YmxlQ2xpY2tlZCIsImZpbmlzaEVkaXRpbmciLCJvbktleVVwIiwiZXYiLCJrZXlDb2RlIiwiRU5URVIiLCJFU0MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPQSxPOzs7dUJBRU1DLFE7QUFDWixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNsQixVQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtGLEtBQUwsR0FBYUEsTUFBTUcsSUFBTixFQUFiO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBOzt1QkFFREMsa0IsaUNBQXFCO0FBQ3BCLFVBQUtELFNBQUwsR0FBaUIsS0FBS0osS0FBdEI7QUFDQSxVQUFLRSxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBS0QsV0FBTCxHQUFtQixLQUFuQjtBQUNBLEs7O3VCQUVESyxhLDRCQUFnQjtBQUNmLFVBQUtOLEtBQUwsR0FBYSxLQUFLSSxTQUFMLENBQWVELElBQWYsRUFBYjtBQUNBLFVBQUtELFNBQUwsR0FBaUIsS0FBakI7QUFDQSxLOzt1QkFFREssTyxvQkFBUUMsRSxFQUFJO0FBQ1gsU0FBSUEsR0FBR0MsT0FBSCxLQUFlWCxLQUFLWSxLQUF4QixFQUErQjtBQUM5QixXQUFLSixhQUFMO0FBQ0E7QUFDRCxTQUFJRSxHQUFHQyxPQUFILEtBQWVYLEtBQUthLEdBQXhCLEVBQTZCO0FBQzVCLFdBQUtQLFNBQUwsR0FBaUIsS0FBS0osS0FBdEI7QUFDQSxXQUFLRSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0E7QUFDRCxLIiwiZmlsZSI6InRvZG8taXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
