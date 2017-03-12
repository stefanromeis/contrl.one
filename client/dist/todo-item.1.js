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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8taXRlbS4xLmpzIl0sIm5hbWVzIjpbIkVOVEVSX0tFWSIsIkVTQ19LRVkiLCJUb2RvSXRlbSIsInRpdGxlIiwiaXNDb21wbGV0ZWQiLCJpc0VkaXRpbmciLCJ0cmltIiwiZWRpdFRpdGxlIiwibGFiZWxEb3VibGVDbGlja2VkIiwiZmluaXNoRWRpdGluZyIsIm9uS2V5VXAiLCJldiIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTUEsWSxHQUFZLEU7QUFDWkMsVSxHQUFVLEU7O3VCQUVIQyxRO0FBQ1osc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDbEIsVUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxVQUFLRixLQUFMLEdBQWFBLE1BQU1HLElBQU4sRUFBYjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQTs7dUJBRURDLGtCLGlDQUFxQjtBQUNwQixVQUFLRCxTQUFMLEdBQWlCLEtBQUtKLEtBQXRCO0FBQ0EsVUFBS0UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLEs7O3VCQUVESSxhLDRCQUFnQjtBQUNmLFVBQUtOLEtBQUwsR0FBYSxLQUFLSSxTQUFMLENBQWVELElBQWYsRUFBYjtBQUNBLFVBQUtELFNBQUwsR0FBaUIsS0FBakI7QUFDQSxLOzt1QkFFREssTyxvQkFBUUMsRSxFQUFJO0FBQ1gsU0FBSUEsR0FBR0MsT0FBSCxLQUFlWixTQUFuQixFQUE4QjtBQUM3QixhQUFPLEtBQUtTLGFBQUwsRUFBUDtBQUNBO0FBQ0QsU0FBSUUsR0FBR0MsT0FBSCxLQUFlWCxPQUFuQixFQUE0QjtBQUMzQixXQUFLTSxTQUFMLEdBQWlCLEtBQUtKLEtBQXRCO0FBQ0EsV0FBS0UsU0FBTCxHQUFpQixLQUFqQjtBQUNBO0FBQ0QsSyIsImZpbGUiOiJ0b2RvLWl0ZW0uMS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
