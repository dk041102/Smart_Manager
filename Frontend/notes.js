// redirect if not logged in
if(!localStorage.getItem("token")){
  window.location = "login.html";
}
function logout(){
  localStorage.removeItem("token");
  window.location="login.html";
}

async function loadNotes(){
  const notes = await request("/notes");

  notesList.innerHTML="";

  notes.forEach(n=>{
    const li=document.createElement("li");

    li.innerHTML = `
      <b>${n.title}</b> - ${n.content}
      <button onclick="deleteNote('${n._id}')">Delete</button>
      <button onclick="editNote('${n._id}','${n.title}','${n.content}')">Edit</button>
    `;

    notesList.appendChild(li);
  });
}

async function deleteNote(id){
  await request("/notes/"+id,"DELETE");
  loadNotes();
}

function editNote(id,oldTitle,oldContent){
  title.value = oldTitle;
  content.value = oldContent;

  addBtn.onclick = async () => {
    await request("/notes/"+id,"PUT",{
      title:title.value,
      content:content.value
    });

    addBtn.onclick = addNote; // restore
    loadNotes();
  };
}

async function addNote(){
  await request("/notes","POST",{
    title:title.value,
    content:content.value
  });

  loadNotes();
}

loadNotes();
