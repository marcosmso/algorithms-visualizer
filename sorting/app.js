array_container = document.querySelector(".array-container")
generate_array_btn = document.querySelector("#generate-array-btn")
sort_btn = document.querySelector("#sort-btn")
stop_btn = document.querySelector("#stop-btn")
algorithm_select = document.querySelector("#algorithm-select")
array_size_input = document.querySelector("#array-size")
speed_selector_input = document.querySelector("#speed-selector")
h1_test = document.querySelector("#h1-test")

const MAX = 200
const MIN = 10
const HEIGHT_SCALE = 2
const TOTAL_VIEW_WIDTH = 90

let delay = 300
let NUMBER_OF_ELEMENTS = 50
let BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS

const state = {
	SORTED: "green",
	NOT_SORTED: "blue",
	PROCESSING: "red",
	NEXT: "purple"
}

const algorithms = {
	"bubble_sort": bubble_sort,
	"selection_sort": selection_sort,
	"insertion_sort": insertion_sort, 
	"merge_sort_handler": merge_sort_handler,
  "quick_sort_handler": quick_sort_handler
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
	NUMBER_OF_ELEMENTS = Number(array_size_input.value)
	BLOCK_WIDTH = TOTAL_VIEW_WIDTH/NUMBER_OF_ELEMENTS
	generateRandomArray()
	createNumbersDOMElements()
	render_array_state()
})

sort_btn.addEventListener("click", () => {
	number_elements.forEach((element)=>{
		element.style.backgroundColor = state.NOT_SORTED
	})
	algorithm = algorithm_select.value
	algorithms[algorithm]()
})

stop_btn.addEventListener("click", () => {
	stop = true
})

speed_selector_input.addEventListener("input", () => {
	delay = 1000 - Number(speed_selector_input.value)
})

async function bubble_sort(){
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

			number_elements[j].style.backgroundColor = state.PROCESSING
			number_elements[j + 1].style.backgroundColor = state.PROCESSING
			
			await new Promise((resolve) => setTimeout(() => {resolve();}, delay))

			if (array[j] > array[j + 1]){ 
				array.swap(j + 1, j)
				number_elements.swap(j + 1, j)
				render_array_state()
			}

			number_elements[j].style.backgroundColor = state.NOT_SORTED

			await new Promise((resolve) => setTimeout(() => {resolve();}, delay))

		}
		number_elements[j].style.backgroundColor = state.SORTED
	}
	number_elements[0].style.backgroundColor = state.SORTED
		
	generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function selection_sort(){
	sort_btn.disabled =	true
	generate_array_btn.disabled = true;
	stop_btn.disabled =	false
		
	let n = array.length;
	let i, j, min_idx

	for(i = 0; i < n - 1 && !stop; i++){
		min_idx = i
		number_elements[min_idx].style.backgroundColor = state.PROCESSING

		await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

		for (j = i + 1; j < n && !stop; j++){	
			number_elements[min_idx].style.backgroundColor = state.PROCESSING
			number_elements[j].style.backgroundColor = state.PROCESSING

			await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

			if (array[j] < array[min_idx]){
				number_elements[min_idx].style.backgroundColor = state.NOT_SORTED
				min_idx = j 
			} else {
				number_elements[j].style.backgroundColor = state.NOT_SORTED
			}
		}
		await new Promise((resolve) => setTimeout(() => {resolve();}, delay));
		
		array.swap(i, min_idx)
		number_elements.swap(i, min_idx)
		number_elements[i].style.backgroundColor = state.SORTED
		render_array_state()
	}
	number_elements[n-1].style.backgroundColor = state.SORTED
		
	generate_array_btn.disabled = false;
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function insertion_sort(){
	sort_btn.disabled =	true
	generate_array_btn.disabled = true;
	stop_btn.disabled =	false
		
	let n = array.length;
		let i, j

	await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

	for(i = 1; i < n && !stop; i++){
		if (i < n - 1){
			number_elements[i+1].style.backgroundColor = state.NEXT
		}
		j = i - 1
		number_elements[i].style.backgroundColor = state.PROCESSING//"red"
		number_elements[j].style.backgroundColor = state.PROCESSING

		await new Promise((resolve) => setTimeout(() => {resolve();}, delay));

		while (j >= 0 && array[j] > array[j+1] && !stop){
			number_elements[j].style.backgroundColor = state.PROCESSING
			render_array_state()
			await new Promise((resolve) => setTimeout(() => {resolve();}, delay))

			array.swap(j, j+1)
			number_elements.swap(j, j+1)
			render_array_state()
			await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
			
			number_elements[j+1].style.backgroundColor = state.NOT_SORTED
			j = j - 1
		}

		await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
		number_elements.forEach(element =>{
			element.style.backgroundColor =state.NOT_SORTED
		})	
	
		render_array_state()
	}
	// number_elements[n-1].style.backgroundColor = SORTED
		
	generate_array_btn.disabled = false
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function merge_sort_handler() {
	sort_btn.disabled =	true
	generate_array_btn.disabled = true
	stop_btn.disabled =	false
	await merge_sort(0, number_elements.length - 1)
	generate_array_btn.disabled = false
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function merge_sort(l, r){
	if(l >= r){
		return
	}

	let m = l + parseInt((r - l)/2)
	await merge_sort(l, m)
	await merge_sort(m + 1, r)
	await merge(l, m, r);
	await new Promise((resolve) => setTimeout(() => {resolve();}, delay));	
	render_array_state()
}

async function merge(l, m, r){
	let n1 = m - l + 1
	let n2 = r - m

	let LV = new Array(n1)
	let RV = new Array(n2)
	let L = new Array(n1)
	let R = new Array(n2)

	for (let i = 0; i < n1; i++){
		LV[i] = number_elements[l + i]
		L[i] = array[l + i]
		LV[i].style.backgroundColor = 'pink'
	}

 	for (let j = 0; j < n2; j++){
		RV[j] = number_elements[m + 1 + j]
		R[j] = array[m + 1 + j]
		RV[j].style.backgroundColor = 'red'
	}

	let i = 0
	let j = 0
	let k = l

	while (i < n1 && j < n2) {
		if (L[i] <= R[j]) {
			number_elements[k] = LV[i]
			array[k] = L[i]
			i++
		}
		else {
			number_elements[k] = RV[j]
			array[k] = R[j]
			j++
		}
		k++
	}

	while (i < n1) {
		number_elements[k] = LV[i]
		array[k] = L[i]
		i++
		k++
	}

	while (j < n2) {
		number_elements[k] = RV[j]
		array[k] = R[j]
		j++
		k++
	}

	await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
	await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
	render_array_state()
	await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
	await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
	
	number_elements.forEach((element)=>{
		element.style.backgroundColor = 'blue'
	})

	render_array_state()
	await new Promise((resolve) => setTimeout(() => {resolve();}, delay))
}

async function quick_sort_handler(){
  sort_btn.disabled =	true
	generate_array_btn.disabled = true
	stop_btn.disabled =	false
	await quick_sort(0, number_elements.length - 1)
	generate_array_btn.disabled = false
	sort_btn.disabled = false 
	stop_btn.disabled =	true
	stop = false
}

async function quick_sort(begin, end){
  if (begin < end){
    let pivot = await partition(begin, end)
    await quick_sort(begin, pivot - 1)
    await quick_sort(pivot + 1, end)
  } else if (begin == end) {
    number_elements[begin].style.backgroundColor = state.SORTED
    render_array_state()
    await new Promise((resolve) => setTimeout(() => {resolve();}, 2 * delay))
  }
}

async function partition(begin, end){
  let rendered_pivot = number_elements[end]
  
  for (let k = begin; k < end; k++) {
    number_elements[k].style.backgroundColor = "pink"
  }
  rendered_pivot.style.backgroundColor = state.PROCESSING
  render_array_state()
  await new Promise((resolve) => setTimeout(() => {resolve();}, 2 * delay))
  
  let i = begin
  for(let j = begin; j < end; j++){
    if (array[j] <= array[end]){
      array.swap(i, j)
      number_elements.swap(i, j)
      i += 1
    }
  }
  array.swap(i, end)
  number_elements.swap(i, end)
  render_array_state()
  await new Promise((resolve) => setTimeout(() => {resolve();}, 2 * delay))

  for (let k = begin; k <= end; k++) {
    number_elements[k].style.backgroundColor = "blue"
  }
  rendered_pivot.style.backgroundColor = state.SORTED
  render_array_state()
  await new Promise((resolve) => setTimeout(() => {resolve();}, delay))

  return i
}