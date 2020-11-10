const infoPopup = document.getElementById("info-popup")
const list = document.getElementById("list")
const form = document.getElementById("create-form")
const localStorageKey = "S5_WEBT_Lab2-list"
let draggingElement = null

const objectFromNode = function(node){
	text = node.querySelector(".list-item-text")
	return {
		text: text.innerHTML,
		done: text.classList.contains("done")
	}
}
const saveListToLocalStorage = function(){
	nodeList = list.querySelectorAll(".list-item")
	resultArr = []
	for(i = 0; i < nodeList.length - 1; i++){
		resultArr.push(objectFromNode(nodeList[i]))
	}
	localStorage.setItem(localStorageKey, JSON.stringify(resultArr))
}

const onDragStart = function(e){
	draggingElement = this
	setTimeout(() => this.style.display = "none", 0)
}
const onDragEnter = function(e){
	this.querySelector(".drop-place").style.display = "block"
}
const onDragOver = function(e){
	e.preventDefault()
}
// Using to prevent a bug (at start upper child shows 'drop place' when dragging down by list)
const onDragOverErr = function(e){
	this.parentNode.querySelector(".drop-place").style.display = "none"
}
const onDragLeave = function(e){
	this.style.display = "none"
}
const onDragEnd = function(e){
	this.style.display = "block"
}
const onDragDrop = function(e){
	list.insertBefore(draggingElement, this.parentNode)
	this.style.display = "none"
	draggingElement = null
	saveListToLocalStorage()
}

form.parentNode.addEventListener("dragenter", onDragEnter)
form.parentNode.querySelector(".drop-place")
	.addEventListener("dragleave", onDragLeave)
form.parentNode.querySelector(".drop-place")
	.addEventListener("dragover", onDragOver)
form.parentNode.querySelector(".drop-place")
	.addEventListener("drop", onDragDrop)
	
const done = function(){
	this.parentNode
		.querySelector(".list-item-text")
		.classList.add("done")
		
	this.innerHTML = "undo"
	this.onclick = undo
	saveListToLocalStorage()
}
const undo = function(){
	this.parentNode
		.querySelector(".list-item-text")
		.classList.remove("done")

	this.innerHTML = "done"
	this.onclick = done
	saveListToLocalStorage()
}
const removeItem = function(){
	this.parentNode.parentNode.remove()
	saveListToLocalStorage()
}

const nodeFromObject = function(item){	
	text = document.createElement("p")
	text.classList.add("list-item-text")
	text.innerHTML = item.text
	
	doneButton = document.createElement("button")
	doneButton.classList.add("list-item-button")
	if(item.hasOwnProperty("done") && item.done){
		doneButton.onclick = undo
		doneButton.innerHTML = "undo"
		text.classList.add("done")
	} else {
		doneButton.onclick = done
		doneButton.innerHTML = "done"
	}
		
	removeButton = document.createElement("button")
	removeButton.classList.add("danger", "list-item-button")
	removeButton.onclick = removeItem
	removeButton.innerHTML = "remove"
	
	listItem = document.createElement("div")
	listItem.classList.add("list-item")
	listItem.appendChild(text)
	listItem.appendChild(doneButton)
	listItem.appendChild(removeButton)
	
	listItem.addEventListener("dragover", onDragOverErr) // Using to prevent a bug (at start upper child shows 'drop place' when dragging down by list)
	
	dropPlace = document.createElement("div")
	dropPlace.classList.add("drop-place")
	
	dropPlace.addEventListener("dragleave", onDragLeave)
	dropPlace.addEventListener("drop", onDragDrop)
	dropPlace.addEventListener("dragover", onDragOver)
	
	jsListItemWrapper = document.createElement("div")
	jsListItemWrapper.classList.add("js-list-item-wrapper")
	jsListItemWrapper.appendChild(dropPlace)
	jsListItemWrapper.appendChild(listItem)
	jsListItemWrapper.draggable = true
	
	jsListItemWrapper.addEventListener("dragenter", onDragEnter)
	jsListItemWrapper.addEventListener("dragstart", onDragStart)
	jsListItemWrapper.addEventListener("dragend", onDragEnd)
	
	return jsListItemWrapper
}
const appendItem = function(item){
	list.insertBefore(nodeFromObject(item), form.parentNode)
}
const readListFromLocalStorage = function(){
	jsonArr = localStorage.getItem(localStorageKey)
	if(jsonArr === null){
		return []
	} else {
		return JSON.parse(jsonArr)
	}
}
const refreshList = function(arr){
	nodeList = list.querySelectorAll(".js-list-item-wrapper")
	for(i = 0; i < nodeList.length - 1; i++){
		nodeList[i].remove()
	}
	arr.forEach(item => {
		appendItem(item)
	})
}
refreshList(readListFromLocalStorage())

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

form.onsubmit = e => {
	let input = form.querySelector("input[type=text]")
	if(input.value !== ""){
		appendItem({text: input.value})
		input.value = ""
		saveListToLocalStorage()
	}
	return false;
}

//setInterval(()=>{
//	refreshList(readListFromLocalStorage())
//}, 3000)


// Made by EugeneVV