const infoPopup = document.getElementById("info-popup")
const list = document.getElementById("list")
const form = document.getElementById("create-form")
const localStorageKey = "S5_WEBT_Lab2-list"

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
	this.parentNode.remove()
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
	
	return listItem
}
const appendItem = function(item){
	list.insertBefore(nodeFromObject(item), form)
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
	nodeList = list.querySelectorAll(".list-item")
	for(i = 0; i < nodeList.length - 1; i++){
		nodeList[i].remove()
	}
	arr.forEach(item => {
		appendItem(item)
	})
}
refreshList(readListFromLocalStorage())

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

setInterval(()=>{
		refreshList(readListFromLocalStorage())
	}, 3000)
// Made by EugeneVV