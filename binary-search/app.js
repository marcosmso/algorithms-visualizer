array_container = document.querySelector(".array-container");
generate_array_btn = document.querySelector("#generate-array-btn");
search_btn = document.querySelector("#search-btn");

const MAX = 200;
const MIN = 10;
const HEIGHT_SCALE = 2;
const NUMBER_OF_ELEMENTS = 60;
const TOTAL_VIEW_WIDTH = 90;
const BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS;
const DELAY = 800;

let array = []
let number_elements = []

generateRandomSortedArray()
createNumbersDOMElements(true)
render_array_state()

function generateRandomArray(){
    array = [];
    
    for(let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        let randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);
        array.push(randomNumber);
    } 
}

function generateRandomSortedArray(){
    generateRandomArray()
    array = array.sort((a, b) => {return a - b});
}

function createNumbersDOMElements(withNumberText = false){

    number_elements = array.map((number) => {
        let number_element = document.createElement("div")
        number_element.classList = "array-element"

        let number_element_label = document.createElement("label")
        number_element_label.classList = "array-element-label"    
        
        if (withNumberText){
            number_element_label.innerText = number
        }

        number_element.style.height = `${number * HEIGHT_SCALE}px`
        number_element.style.width = `${BLOCK_WIDTH}vw`

        number_element.appendChild(number_element_label)

        return number_element
    })
}

function render_array_state(){
    array_container.innerHTML = ""
    number_elements.forEach((element)=>{
        array_container.appendChild(element)
    })
}

generate_array_btn.addEventListener("click", () => {
    generateRandomSortedArray()
    createNumbersDOMElements(true)
    render_array_state()
})

search_btn.addEventListener("click", () => {
    
    for (let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        number_elements[i].style.backgroundColor = "blue";
    }

    const target = parseInt(document.querySelector(".target-input").value);
    if (target >= 0) {
        binary_search(target)
    }

})

async function binary_search(target, delay = DELAY){

    generate_array_btn.disabled = true;
    let found = false;
    let left = 0;
    let right = array.length - 1;
    let mid;

    while (left <= right) {

        number_elements[left].style.backgroundColor = "pink"
        number_elements[right].style.backgroundColor = "pink"

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        mid = Math.floor((left + right)/2);
        number_elements[mid].style.backgroundColor = "red"

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        if (array[mid] == target) {
            number_elements[mid].style.backgroundColor = "green";
            found = true;
            break;
        }

        if (target > array[mid]){
            left = mid + 1;
            number_elements[left].style.backgroundColor = "pink"
            for (let i = 0; i < left; i++){
                number_elements[i].style.backgroundColor = "gray"
            }
        }
        else if (target < array[mid]) {
            right = mid - 1;
            number_elements[right].style.backgroundColor = "pink"
            for (let i = right + 1; i < array.length; i++){
                number_elements[i].style.backgroundColor = "gray"
            }
        }

        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

    }
    
    if (found == false) {
        console.log("Element Not Found");
    }
    
    generate_array_btn.disabled = false;
}
  