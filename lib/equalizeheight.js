'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EqualizeHeight = function () {
    function EqualizeHeight() {
        var _this = this;

        _classCallCheck(this, EqualizeHeight);

        this.elements = document.querySelectorAll('[data-equalize-height]');

        // If there are no equal height element, return
        if (!this.elements || this.elements.length === 0) return;

        this.elementObjects = this.initEqualHeightObjects();

        this.calculateEqualHeight();

        window.addEventListener('resize', function () {
            _this.recalculateRows();
            _this.calculateEqualHeight();
        });
    }

    _createClass(EqualizeHeight, [{
        key: 'rowsToArrays',
        value: function rowsToArrays(elements) {
            var arrays = [[]],
                currentRow = 1;

            for (var i = 0; i < elements.length; i++) {
                if (elements[i].row > currentRow) {
                    currentRow++;
                    arrays.push([elements[i].element]);
                } else {
                    arrays[currentRow - 1].push(elements[i].element);
                }
            }

            return arrays;
        }
    }, {
        key: 'calculateEqualHeight',
        value: function calculateEqualHeight() {
            for (var i = 0; i < this.elementObjects.length; i++) {
                // Sort elements by row
                this.elementObjects[i].elements.sort(function (a, b) {
                    return a.row - b.row;
                });

                var arrays = this.rowsToArrays(this.elementObjects[i].elements);
                for (var j = 0; j < arrays.length; j++) {
                    var maxHeight = this.getMaxHeight(arrays[j]);
                    this.setEqualHeight(maxHeight, arrays[j]);
                }
            }
        }
    }, {
        key: 'setEqualHeight',
        value: function setEqualHeight(height, elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height = height + 'px';
            }
        }
    }, {
        key: 'getMaxHeight',
        value: function getMaxHeight(elements) {
            var maxHeight = 0;

            for (var i = 0; i < elements.length; i++) {
                elements[i].style.height = "auto";

                var elementHeight = elements[i].offsetHeight;
                if (maxHeight < elementHeight) {
                    maxHeight = elementHeight;
                }
            }

            return maxHeight;
        }
    }, {
        key: 'calculateRow',
        value: function calculateRow(elements, element) {
            var usedRows = [];

            for (var i = 0; i < elements.length; i++) {
                usedRows.push(elements[i].row);
                if (elements[i].element.getBoundingClientRect().top + window.pageYOffset === element.getBoundingClientRect().top + window.pageYOffset) {
                    return elements[i].row;
                }
            }

            return Math.max.apply(Math, usedRows) + 1;
        }
    }, {
        key: 'recalculateRows',
        value: function recalculateRows() {
            for (var i = 0; i < this.elementObjects.length; i++) {
                this.elementObjects[i].elements[0].row = 1;
                for (var j = 1; j < this.elementObjects[i].elements.length; j++) {
                    this.elementObjects[i].elements[j].row = this.calculateRow(this.elementObjects[i].elements.slice(0, j), this.elementObjects[i].elements[j].element);
                }
            }
        }
    }, {
        key: 'initEqualHeightObjects',
        value: function initEqualHeightObjects() {
            var elementObjects = [{
                name: this.elements[0].dataset.equalHeight,
                elements: [{
                    element: this.elements[0],
                    row: 1
                }]
            }];

            for (var i = 1; i < this.elements.length; i++) {
                for (var j = 0; j < elementObjects.length; j++) {

                    if (this.elements[i].dataset.equalHeight === elementObjects[j].name) {
                        elementObjects[j].elements.push({
                            element: this.elements[i],
                            row: this.calculateRow(elementObjects[j].elements, this.elements[i])
                        });
                    } else {
                        var newElementObject = {
                            name: this.elements[i].dataset.equalHeight,
                            elements: [{
                                element: this.elements[i],
                                row: 1
                            }]
                        };
                        elementObjects.push(newElementObject);
                    }
                }
            }

            return elementObjects;
        }
    }]);

    return EqualizeHeight;
}();

new EqualizeHeight();