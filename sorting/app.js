array_container = document.querySelector(".array-container")
generate_array_btn = document.querySelector("#generate-array-btn")
sort_btn = document.querySelector("#sort-btn")
stop_btn = document.querySelector("#stop-btn")
algorithm_select = document.querySelector("#algorithm-select")

const SORTED = "green"
const NOT_SORTED = "blue"
const MAX = 200
const MIN = 10
const HEIGHT_SCALE = 2
const NUMBER_OF_ELEMENTS = 60
const TOTAL_VIEW_WIDTH = 90
const BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS;
const DELAY = 5

const algorithms = {
	"bubble_sort": bubble_sort,
	"selection_sort": selection_sort
}

var stop = false
var array = []
var number_elements = []

Array.prototype.swap = function (x, y) {
	var temp = this[x]
	this[x] = this[y]
	this[y] = temp
	return this
}

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
	number_elements.forEach((element)=>{
		element.style.backgroundColor = NOT_SORTED
	})
    algorithm = algorithm_select.value
	algorithms[algorithm]()
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

    for(i = 0; i < n - 1 ; i++){
		for (j = 0; j < n - i - 1; j++){
			if (stop) {
				generate_array_btn.disabled = false;
				sort_btn.disabled = false 
				stop_btn.disabled =	true
				stop = false
				return
			} 

			number_elements[j].style.backgroundColor = "pink"
			number_elements[j + 1].style.backgroundColor = "pink"
			
			await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

			if (array[j] > array[j + 1]){ 
				array.swap(j + 1, j)
				number_elements.swap(j + 1, j)
				render_array_state()
			}

			number_elements[j].style.backgroundColor = NOT_SORTED

			await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

		}
		number_elements[j].style.backgroundColor = SORTED
    }
	number_elements[0].style.backgroundColor = SORTED
    
    generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function selection_sort(delay = DELAY){
	sort_btn.disabled =	true
    generate_array_btn.disabled = true;
	stop_btn.disabled =	false
    
	let n = array.length;
    let i, j, min_idx

    for(i = 0; i < n - 1 && !stop; i++){
		min_idx = i
		number_elements[min_idx].style.backgroundColor = "pink"

		await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

		for (j = i + 1; j < n && !stop; j++){	
			number_elements[min_idx].style.backgroundColor = "pink"
			number_elements[j].style.backgroundColor = "pink"

			await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

			if (array[j] < array[min_idx]){
				number_elements[min_idx].style.backgroundColor = NOT_SORTED
				min_idx = j 
			} else {
				number_elements[j].style.backgroundColor = NOT_SORTED
			}
		}
		await new Promise((resolve) => setTimeout(() => {resolve();}, delay));
		
		array.swap(i, min_idx)
		number_elements.swap(i, min_idx)
		number_elements[i].style.backgroundColor = SORTED
		render_array_state()
    }
	number_elements[n-1].style.backgroundColor = SORTED
    
    generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}