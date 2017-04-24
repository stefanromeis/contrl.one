'use strict';

System.register(['aurelia-framework', 'bootstrap'], function (_export, _context) {
    "use strict";

    var customAttribute, inject, bindable, $, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, BootstrapTooltip;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaFramework) {
            customAttribute = _aureliaFramework.customAttribute;
            inject = _aureliaFramework.inject;
            bindable = _aureliaFramework.bindable;
        }, function (_bootstrap) {
            $ = _bootstrap.default;
        }],
        execute: function () {
            _export('BootstrapTooltip', BootstrapTooltip = (_dec = customAttribute('tooltip'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
                function BootstrapTooltip(element) {
                    _classCallCheck(this, BootstrapTooltip);

                    _initDefineProp(this, 'title', _descriptor, this);

                    _initDefineProp(this, 'placement', _descriptor2, this);

                    this.element = element;
                }

                BootstrapTooltip.prototype.attached = function attached() {

                    $(this.element).tooltip({
                        title: this.title,
                        placement: this.placement
                    });
                };

                return BootstrapTooltip;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [bindable], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'placement', [bindable], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class));

            _export('BootstrapTooltip', BootstrapTooltip);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Jvb3RzdHJhcC10b29sdGlwLmpzIl0sIm5hbWVzIjpbImN1c3RvbUF0dHJpYnV0ZSIsImluamVjdCIsImJpbmRhYmxlIiwiJCIsIkJvb3RzdHJhcFRvb2x0aXAiLCJFbGVtZW50IiwiZWxlbWVudCIsImF0dGFjaGVkIiwidG9vbHRpcCIsInRpdGxlIiwicGxhY2VtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLDJCLHFCQUFBQSxlO0FBQWlCQyxrQixxQkFBQUEsTTtBQUFRQyxvQixxQkFBQUEsUTs7QUFDMUJDLGE7Ozt3Q0FJTUMsZ0IsV0FGWkosZ0JBQWdCLFNBQWhCLEMsVUFDQUMsT0FBT0ksT0FBUCxDO0FBTUcsMENBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDakIseUJBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNIOzsyQ0FFREMsUSx1QkFBVzs7QUFFUEosc0JBQUUsS0FBS0csT0FBUCxFQUFnQkUsT0FBaEIsQ0FBd0I7QUFDcEJDLCtCQUFNLEtBQUtBLEtBRFM7QUFFcEJDLG1DQUFVLEtBQUtBO0FBRksscUJBQXhCO0FBSUgsaUI7Ozt1RkFiQVIsUTs7OzBGQUNBQSxRIiwiZmlsZSI6InNlcnZpY2VzL2Jvb3RzdHJhcC10b29sdGlwLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
