// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAC42sirek7m-9wnh-7FsX2ow25KFRTjVA",
  authDomain: "react-36e2c.firebaseapp.com",
  databaseURL: "https://react-36e2c-default-rtdb.firebaseio.com",
  projectId: "react-36e2c",
  storageBucket: "react-36e2c.firebasestorage.app",
  messagingSenderId: "995727795506",
  appId: "1:995727795506:web:420373ff0c0057b7a9a32b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("notes");


// CURRENT USER NAME
let currentUser = ""

let isBold = false
let isItalic = false



// CREATE NOTE
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



// SAVE NOTE
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



// FORMAT
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



// LOAD NOTES
db.on("child_added", function(snapshot){

let data = snapshot.val()
let id = snapshot.key

let boldStyle = data.bold ? "bold" : "normal"
let italicStyle = data.italic ? "italic" : "normal"

// show delete button only if owner
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



// DELETE NOTE
function deleteNote(id,btn){

firebase.database().ref("notes/"+id).remove()

btn.closest(".sticky").remove()

}
