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

renderRandomArray();

generate_array_btn.addEventListener("click", renderRandomArray);

function renderRandomArray(){
    array = []
    generateRandomSortedArray()
    array_container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        renderArrayElement(i)
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
}
