const infoPopup = document.getElementById("info-popup")
const list = document.getElementById("list")
const form = document.getElementById("create-form")

const showInfo = function(){
	infoPopup.style.display = "block"
}
const hideInfo = function(){
	infoPopup.style.display = "none"
}
infoPopup.addEventListener("click", e => {
	if(e.srcElement === infoPopup)
		hideInfo()
})

window.addEventListener("keyup", e => {
	if(e.key === "Escape"){
		hideInfo()
	}
})

const removeItem = function(){
	this.parentNode.remove()
}
const done = function(){
	this.parentNode
		.querySelector(".list-item-text")
		.classList.add("done")
		
	this.innerHTML = "undo"
	this.onclick = undo
}
const undo = function(){
	this.parentNode
		.querySelector(".list-item-text")
		.classList.remove("done")

	this.innerHTML = "done"
	this.onclick = done
}
const addItem = function(item){
	text = document.createElement("p")
	text.classList.add("list-item-text")
	text.innerHTML = item
	
	doneButton = document.createElement("button")
	doneButton.classList.add("list-item-button")
	doneButton.onclick = done
	doneButton.innerHTML = "done"
	
		
	removeButton = document.createElement("button")
	removeButton.classList.add("danger")
	removeButton.classList.add("list-item-button")
	removeButton.onclick = removeItem
	removeButton.innerHTML = "remove"
	
	listItem = document.createElement("div")
	listItem.classList.add("list-item")
	listItem.appendChild(text)
	listItem.appendChild(doneButton)
	listItem.appendChild(removeButton)
	listItem.draggable = true
	
	list.insertBefore(listItem, form)
}

form.onsubmit = e => {
	let input = form.querySelector("input[type=text]")
	if(input.value !== ""){
		addItem(input.value)
		input.value = ""
	}
	return false;
}

addItem("text")
addItem("TEXT2")

// Made by EugeneVV