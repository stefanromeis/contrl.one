'use strict';

System.register(['aurelia-templating'], function (_export, _context) {
	"use strict";

	var Behavior, Focus;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaTemplating) {
			Behavior = _aureliaTemplating.Behavior;
		}],
		execute: function () {
			_export('Focus', Focus = function () {
				Focus.metadata = function metadata() {
					return Behavior.attachedBehavior('focus').withProperty('value', 'valueChanged', 'focus');
				};

				Focus.inject = function inject() {
					return [Element];
				};

				function Focus(element) {
					_classCallCheck(this, Focus);

					this.element = element;
				}

				Focus.prototype.valueChanged = function valueChanged(value) {
					if (value) {
						this.element.focus();
					}
				};

				return Focus;
			}());

			_export('Focus', Focus);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlaGF2aW9ycy9mb2N1cy5qcyJdLCJuYW1lcyI6WyJCZWhhdmlvciIsIkZvY3VzIiwibWV0YWRhdGEiLCJhdHRhY2hlZEJlaGF2aW9yIiwid2l0aFByb3BlcnR5IiwiaW5qZWN0IiwiRWxlbWVudCIsImVsZW1lbnQiLCJ2YWx1ZUNoYW5nZWQiLCJ2YWx1ZSIsImZvY3VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsVyxzQkFBQUEsUTs7O29CQUVLQyxLO1VBQ0xDLFEsdUJBQVc7QUFDakIsWUFBT0YsU0FDTEcsZ0JBREssQ0FDWSxPQURaLEVBRUxDLFlBRkssQ0FFUSxPQUZSLEVBRWlCLGNBRmpCLEVBRWlDLE9BRmpDLENBQVA7QUFHQSxLOztVQUVNQyxNLHFCQUFTO0FBQUUsWUFBTyxDQUFDQyxPQUFELENBQVA7QUFBbUIsSzs7QUFDckMsbUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDcEIsVUFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0E7O29CQUVEQyxZLHlCQUFhQyxLLEVBQU87QUFDbkIsU0FBSUEsS0FBSixFQUFXO0FBQ1YsV0FBS0YsT0FBTCxDQUFhRyxLQUFiO0FBQ0E7QUFDRCxLIiwiZmlsZSI6ImJlaGF2aW9ycy9mb2N1cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
