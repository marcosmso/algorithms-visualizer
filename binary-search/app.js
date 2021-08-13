array_container = document.querySelector(".array-container");
generate_array_btn = document.querySelector("#generate-array-btn");
search_btn = document.querySelector("#search-btn");

const MAX = 200;
const MIN = 10;
const HEIGHT_SCALE = 2;
const NUMBER_OF_ELEMENTS = 60;
const TOTAL_VIEW_WIDTH = 90;
const BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS;

var array = []
var rendered_elements = []

renderRandomArray();

generate_array_btn.addEventListener("click", renderRandomArray);

function renderRandomArray(){
    array = [];
    rendered_elements = [];
    generateRandomSortedArray();
    array_container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        renderArrayElement(i);
    }
}

function generateRandomSortedArray(){
    for(let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        let randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);
        array.push(randomNumber);
    }
    array = array.sort((a, b) => {return a - b});
}

function renderArrayElement(i){
    number = array[i];
    var array_element = document.createElement("div");
    array_element.classList = "array-element";

    var array_element_label = document.createElement("label");
    array_element_label.classList = "array-element-label";
    array_element_label.innerText = number;

    array_element.style.height = `${number * HEIGHT_SCALE}px`;
    array_element.style.width = `${BLOCK_WIDTH}vw`;

    array_element.appendChild(array_element_label);
    array_container.appendChild(array_element);

    rendered_elements.push(array_element);

}

search_btn.addEventListener("click", () => {
    
    for (let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        rendered_elements[i].style.backgroundColor = "blue";
    }

    const target = parseInt(document.querySelector(".target-input").value);
    if (target >= 0) {
        binary_search(target)
    }

})

async function binary_search(target, delay = 800){

    generate_array_btn.disabled = true;
    var found = false;
    var left = 0;
    var right = array.length - 1;
    var mid;

    while (left <= right) {

        rendered_elements[left].style.backgroundColor = "pink"
        rendered_elements[right].style.backgroundColor = "pink"

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        mid = Math.floor((left + right)/2);
        rendered_elements[mid].style.backgroundColor = "red"

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        if (array[mid] == target) {
            rendered_elements[mid].style.backgroundColor = "green";
            found = true;
            break;
        }

        if (target > array[mid]){
            left = mid + 1;
            rendered_elements[left].style.backgroundColor = "pink"
            for (let i = 0; i < left; i++){
                rendered_elements[i].style.backgroundColor = "gray"
            }
        }
        else if (target < array[mid]) {
            right = mid - 1;
            rendered_elements[right].style.backgroundColor = "pink"
            for (let i = right + 1; i < array.length; i++){
                rendered_elements[i].style.backgroundColor = "gray"
            }
        }

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

    }
    
    if (found == false) {
        console.log("Element Not Found");
    }
    
    generate_array_btn.disabled = false;
}
  