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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZvY3VzLmpzIl0sIm5hbWVzIjpbIkJlaGF2aW9yIiwiRm9jdXMiLCJtZXRhZGF0YSIsImF0dGFjaGVkQmVoYXZpb3IiLCJ3aXRoUHJvcGVydHkiLCJpbmplY3QiLCJFbGVtZW50IiwiZWxlbWVudCIsInZhbHVlQ2hhbmdlZCIsInZhbHVlIiwiZm9jdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxXLHNCQUFBQSxROzs7b0JBRUtDLEs7VUFDTEMsUSx1QkFBVztBQUNqQixZQUFPRixTQUNMRyxnQkFESyxDQUNZLE9BRFosRUFFTEMsWUFGSyxDQUVRLE9BRlIsRUFFaUIsY0FGakIsRUFFaUMsT0FGakMsQ0FBUDtBQUdBLEs7O1VBRU1DLE0scUJBQVM7QUFBRSxZQUFPLENBQUNDLE9BQUQsQ0FBUDtBQUFtQixLOztBQUNyQyxtQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNwQixVQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQTs7b0JBRURDLFkseUJBQWFDLEssRUFBTztBQUNuQixTQUFJQSxLQUFKLEVBQVc7QUFDVixXQUFLRixPQUFMLENBQWFHLEtBQWI7QUFDQTtBQUNELEsiLCJmaWxlIjoic2VydmljZXMvZm9jdXMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
