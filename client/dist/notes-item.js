"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var ENTER_KEY, ESC_KEY, NoteItem;

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

			_export("NoteItem", NoteItem = function NoteItem(title, content, time) {
				_classCallCheck(this, NoteItem);

				this.time = time;
				this.isEditing = false;
				this.title = title.trim();
				this.content = content;
				this.editTitle = null;
				this.editContent = null;
			});

			_export("NoteItem", NoteItem);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGVzLWl0ZW0uanMiXSwibmFtZXMiOlsiRU5URVJfS0VZIiwiRVNDX0tFWSIsIk5vdGVJdGVtIiwidGl0bGUiLCJjb250ZW50IiwidGltZSIsImlzRWRpdGluZyIsInRyaW0iLCJlZGl0VGl0bGUiLCJlZGl0Q29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNQSxZLEdBQVksRTtBQUNaQyxVLEdBQVUsRTs7dUJBRUhDLFEsR0FDWixrQkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQUE7O0FBQ2pDLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLSCxLQUFMLEdBQWFBLE1BQU1JLElBQU4sRUFBYjtBQUNBLFNBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtJLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsSSIsImZpbGUiOiJub3Rlcy1pdGVtLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
