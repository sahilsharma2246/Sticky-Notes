

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("notes");


let currentUser = ""

let isBold = false
let isItalic = false




function create(){

if(!currentUser){
currentUser = prompt("Enter your name:")
}

let block = document.createElement("div")
block.className = "sticky"

block.innerHTML = `
<div class="header">
<span onclick="create()">＋</span>
<span onclick="this.closest('.sticky').remove()">✖</span>
</div>

<div class="content">
<textarea placeholder="Write something..."></textarea>
<button class="save-btn" onclick="save(this)">Save</button>
</div>

<div class="footer">
<button onclick="format(this,'bold')">Bold</button>
<button onclick="format(this,'italic')">Italic</button>
</div>
`

document.getElementById("box").appendChild(block)

}




function save(btn){

let textarea = btn.parentNode.querySelector("textarea")

let noteText = textarea.value

if(noteText.trim() === "") return

db.push({
note: noteText,
bold: isBold,
italic: isItalic,
author: currentUser,
time: Date.now()
})

btn.closest(".sticky").remove()

isBold = false
isItalic = false

}



function format(btn,type){

let block = btn.closest(".sticky")
let textarea = block.querySelector("textarea")

if(!textarea) return

if(type === "bold"){
isBold = !isBold
textarea.style.fontWeight = isBold ? "bold" : "normal"
}

if(type === "italic"){
isItalic = !isItalic
textarea.style.fontStyle = isItalic ? "italic" : "normal"
}

}




db.on("child_added", function(snapshot){

let data = snapshot.val()
let id = snapshot.key

let boldStyle = data.bold ? "bold" : "normal"
let italicStyle = data.italic ? "italic" : "normal"


let deleteBtn = ""

if(data.author === currentUser){
deleteBtn = `<span onclick="deleteNote('${id}',this)">✖</span>`
}

let block = document.createElement("div")
block.className = "sticky"

block.innerHTML = `
<div class="header">
<span onclick="create()">＋</span>
${deleteBtn}
</div>

<div class="content">
<p style="font-weight:${boldStyle}; font-style:${italicStyle}">
${data.note}
</p>

<small>Stored by: ${data.author}</small>
</div>

<div class="footer"></div>
`

document.getElementById("box").appendChild(block)

})




function deleteNote(id,btn){

firebase.database().ref("notes/"+id).remove()

btn.closest(".sticky").remove()

}

