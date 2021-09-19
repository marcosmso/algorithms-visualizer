array_container = document.querySelector(".array-container")
generate_array_btn = document.querySelector("#generate-array-btn")
sort_btn = document.querySelector("#sort-btn")
stop_btn = document.querySelector("#stop-btn")

const MAX = 200
const MIN = 10
const HEIGHT_SCALE = 2
const NUMBER_OF_ELEMENTS = 60
const TOTAL_VIEW_WIDTH = 90
const BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS;
const DELAY = 30

var stop = false
var array = []
var number_elements = []

generateRandomArray()
createNumbersDOMElements()
render_array_state()

function generateRandomArray(){
    array = [];
    
    for(let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        let randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);
        array.push(randomNumber);
    } 
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
	generateRandomArray()
	createNumbersDOMElements()
	render_array_state()
})

sort_btn.addEventListener("click", () => {
    bubble_sort()
})

stop_btn.addEventListener("click", () => {
	stop = true
})

async function bubble_sort(delay = DELAY){
	sort_btn.disabled =	true
    generate_array_btn.disabled = true;
	stop_btn.disabled =	false
    
	let n = array.length;
    let i, j

    for(i = 0; i < n - 1 && !stop; i++){
      for (j = 0; j < n - i - 1 && !stop; j++){
        number_elements[j].style.backgroundColor = "pink"
        number_elements[j + 1].style.backgroundColor = "pink"
        
        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        if (array[j] > array[j + 1]){ 
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp

          temp = number_elements[j]
          number_elements[j] = number_elements[j + 1]
          number_elements[j + 1] = temp

          render_array_state()

        }

        number_elements[j].style.backgroundColor = "blue"
        // number_elements[j + 1].style.backgroundColor = "blue"
        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));
        console.log(array)
      }
	  number_elements[j].style.backgroundColor = "blue"
    }
    
    generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}