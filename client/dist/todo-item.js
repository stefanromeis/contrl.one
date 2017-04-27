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
					console.log('title', this.title);
					console.log('edittitle', this.editTitle);
					this.title = this.editTitle.trim();
					this.isEditing = false;
					this.isCompleted = false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8taXRlbS5qcyJdLCJuYW1lcyI6WyJrZXlzIiwiVG9kb0l0ZW0iLCJ0aXRsZSIsImlzQ29tcGxldGVkIiwiaXNFZGl0aW5nIiwidHJpbSIsImVkaXRUaXRsZSIsImxhYmVsRG91YmxlQ2xpY2tlZCIsImZpbmlzaEVkaXRpbmciLCJjb25zb2xlIiwibG9nIiwib25LZXlVcCIsImV2Iiwia2V5Q29kZSIsIkVOVEVSIiwiRVNDIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBT0EsTzs7O3VCQUVNQyxRO0FBQ1osc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDbEIsVUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxVQUFLRixLQUFMLEdBQWFBLE1BQU1HLElBQU4sRUFBYjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQTs7dUJBRURDLGtCLGlDQUFxQjtBQUNwQixVQUFLRCxTQUFMLEdBQWlCLEtBQUtKLEtBQXRCO0FBQ0EsVUFBS0UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUtELFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxLOzt1QkFFREssYSw0QkFBZ0I7QUFDZkMsYUFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUIsS0FBS1IsS0FBMUI7QUFDQU8sYUFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBS0osU0FBOUI7QUFDQSxVQUFLSixLQUFMLEdBQWEsS0FBS0ksU0FBTCxDQUFlRCxJQUFmLEVBQWI7QUFDQSxVQUFLRCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsVUFBS0QsV0FBTCxHQUFtQixLQUFuQjtBQUNBLEs7O3VCQUVEUSxPLG9CQUFRQyxFLEVBQUk7QUFDWCxTQUFJQSxHQUFHQyxPQUFILEtBQWViLEtBQUtjLEtBQXhCLEVBQStCO0FBQzlCLFdBQUtOLGFBQUw7QUFDQTtBQUNELFNBQUlJLEdBQUdDLE9BQUgsS0FBZWIsS0FBS2UsR0FBeEIsRUFBNkI7QUFDNUIsV0FBS1QsU0FBTCxHQUFpQixLQUFLSixLQUF0QjtBQUNBLFdBQUtFLFNBQUwsR0FBaUIsS0FBakI7QUFDQTtBQUNELEsiLCJmaWxlIjoidG9kby1pdGVtLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
