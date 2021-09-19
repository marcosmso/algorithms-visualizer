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
var rendered_elements = []

renderRandomArray();

generate_array_btn.addEventListener("click", renderRandomArray);

function renderRandomArray(){
    array = []
    rendered_elements = []
    
    for(let i = 0; i < NUMBER_OF_ELEMENTS; i++){
        let randomNumber = Math.floor(Math.random() * (MAX - MIN) + MIN)
        array.push(randomNumber)
    }
    array_container.innerHTML = ""

    for (let i = 0; i < array.length; i++) {
        renderArrayElement(i)
    }
}

function renderArrayElement(i){
    number = array[i]
    var array_element = document.createElement("div")
    array_element.classList = "array-element"

    var array_element_label = document.createElement("label")
    array_element_label.classList = "array-element-label"
    // array_element_label.innerText = number;

    array_element.style.height = `${number * HEIGHT_SCALE}px`
    array_element.style.width = `${BLOCK_WIDTH}vw`

    array_element.appendChild(array_element_label)
    array_container.appendChild(array_element)

    rendered_elements.push(array_element);
}

sort_btn.addEventListener("click", () => {
    // for (let i = 0; i < NUMBER_OF_ELEMENTS; i++){
    //     rendered_elements[i].style.backgroundColor = "blue";
    // }
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
        rendered_elements[j].style.backgroundColor = "pink"
        rendered_elements[j + 1].style.backgroundColor = "pink"
        
        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

        if (array[j] > array[j + 1]){ 
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp

          temp = rendered_elements[j]
          rendered_elements[j] = rendered_elements[j + 1]
          rendered_elements[j + 1] = temp

          render_state()

        }

        rendered_elements[j].style.backgroundColor = "blue"
        // rendered_elements[j + 1].style.backgroundColor = "blue"
        await new Promise((resolve) => setTimeout(() => {resolve();}, delay));
        console.log(array)
      }
	  rendered_elements[j].style.backgroundColor = "blue"
    }
    
    generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

function render_state(){
  array_container.innerHTML = ""
  rendered_elements.forEach((elem)=>{
    array_container.appendChild(elem)
  })
}
