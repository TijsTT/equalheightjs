class EqualizeHeight {

    constructor() {
        this.elements = document.querySelectorAll('[data-equalize-height]');

        // If there are no equal height element, return
        if(!this.elements || this.elements.length === 0) return;

        this.elementObjects = this.initEqualHeightObjects();
        
        this.calculateEqualHeight();

        window.addEventListener('resize', () => {
            this.recalculateRows();
            this.calculateEqualHeight();
        });

    }

    rowsToArrays(elements) {
        let arrays = [[]], 
            currentRow = 1;

        for(let i = 0; i < elements.length; i++) {
            if(elements[i].row > currentRow) {
                currentRow++;
                arrays.push([elements[i].element]);
            } else {
                arrays[currentRow - 1].push(elements[i].element);
            }
        }

        return arrays;
    }

    calculateEqualHeight() {
        for(let i = 0; i < this.elementObjects.length; i++) {
            // Sort elements by row
            this.elementObjects[i].elements.sort((a, b) => {
                return a.row - b.row;
            })

            let arrays = this.rowsToArrays(this.elementObjects[i].elements);
            for(let j = 0; j < arrays.length; j++) {
                let maxHeight = this.getMaxHeight(arrays[j]);
                this.setEqualHeight(maxHeight, arrays[j]);
            }
        }
    }

    setEqualHeight(height, elements) {
        for(let i = 0; i < elements.length; i++) {
            elements[i].style.height = `${height}px`;
        }
    }
    
    getMaxHeight(elements) {
        let maxHeight = 0;
    
        for(let i = 0; i < elements.length; i++) {
            elements[i].style.height = "auto";

            let elementHeight = elements[i].offsetHeight;
            if(maxHeight < elementHeight) {
                maxHeight = elementHeight;
            }
        }
    
        return maxHeight
    }

    calculateRow(elements, element) {
        var usedRows = [];

        for(let i = 0; i < elements.length; i++) {
            usedRows.push(elements[i].row);
            if(elements[i].element.getBoundingClientRect().top + window.pageYOffset === element.getBoundingClientRect().top + window.pageYOffset) {
                return elements[i].row;
            }
        }

        return Math.max(...usedRows) + 1;
    }

    recalculateRows() {
        for(let i = 0; i < this.elementObjects.length; i++) {
            this.elementObjects[i].elements[0].row = 1;
            for(let j = 1; j < this.elementObjects[i].elements.length; j++) {
                this.elementObjects[i].elements[j].row = this.calculateRow(this.elementObjects[i].elements.slice(0, j), this.elementObjects[i].elements[j].element);
            }   
        }  
    }

    initEqualHeightObjects() {
        let elementObjects = [
            {
                name: this.elements[0].dataset.equalHeight,
                elements: [
                    {
                        element: this.elements[0],
                        row: 1
                    }
                ]
            }
        ];

        for(let i = 1; i < this.elements.length; i++) {
            for(let j = 0; j < elementObjects.length; j++) {

                if(this.elements[i].dataset.equalHeight === elementObjects[j].name) {
                    elementObjects[j].elements.push(
                        {
                            element: this.elements[i],
                            row: this.calculateRow(elementObjects[j].elements, this.elements[i])
                        }
                    );

                } else {
                    var newElementObject = {
                        name: this.elements[i].dataset.equalHeight,
                        elements: [
                            {
                                element: this.elements[i],
                                row: 1
                            }
                        ]
                    }
                    elementObjects.push(newElementObject);
                }

            }
        }

        return elementObjects;
    }

}

new EqualizeHeight();

// Initialize resize event to fix wrong pageYOffset values. This fix is temporary because I can't find the reason why they are incorrect.
var event = document.createEvent('HTMLEvents');
event.initEvent('resize', true, false);
window.dispatchEvent(event);




