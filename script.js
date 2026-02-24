function create(){
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
    let content = btn.parentNode
    let text = content.querySelector("textarea")
    let p = document.createElement("p")

    p.innerHTML = text.value
    p.style.margin = "0"

    content.replaceChild(p, text)
    btn.remove()
}

function format(btn, type){
    let block = btn.closest(".sticky")
    let textarea = block.querySelector("textarea")

    if(!textarea) return

    if(type === "bold"){
        textarea.style.fontWeight = "bold"
    } else {
        textarea.style.fontStyle = "italic"
    }

}