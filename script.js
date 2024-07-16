const elevi = [{ nume: "Maria", note: [5, 5, 5], medie: (5 + 5 + 5) / 3 }];
// lista in care se adauga elevii cu detalii despre ei
const inputNumeElev = document.getElementById("nume-elev");
// vaariabila care contine valoarea adauga in input-ul pentru nume
const btnAdaugaElev = document.getElementById("adauga-elev-btn");
const tabelElevi = document.getElementById("tabel-elevi");
const sectiuneNote = document.getElementById("note-elev-wrapper");
const butonAcundereNote = document.getElementById("ascunde-note");
const tabelNote = document.getElementById("tabel-note");
const containerNoteElev = document.getElementById("note-elev-wrapper");
const btnAdaugaNota = document.getElementById("adauga-nota-btn");
const inputNota = document.getElementById("nota");
const btnOrodneazaDescendent = document.getElementById("desc-note");
const btnOrodneazaAscendent = document.getElementById("asce-note");

afisareTabel(elevi);

btnAdaugaElev.addEventListener("click", adaugaElev);
// cand pe butonul bntAdaugaElev se face click se apeleaza functia adaugaElev
tabelElevi.addEventListener("click", trateazaActiuniTabel);
butonAcundereNote.addEventListener("click", ascundereNote);
tabelNote.addEventListener("click", trateazaActiuniTabelNote);
btnAdaugaNota.addEventListener("click", adaugaNota);
btnOrodneazaAscendent.addEventListener("click", sorteazaNoteAsc);
btnOrodneazaDescendent.addEventListener("click", sorteazaNoteDesc);

function adaugaElev() {
  const numeElev = inputNumeElev.value;
  //numeElev preia valoare din inputNumeElev
  if (numeElev.length > 2) {
    elevi.push({ nume: numeElev, medie: 0, note: [] });
    //se adauga in lista elevi, elevul cu numele numeElev
  } else {
    alert("Numele este prea mic");
  }
  afisareTabel(elevi);
  //se actualizeaza tabelul
}

function afisareTabel(elevi) {
  const tableBody = tabelElevi.querySelector("tbody");
  //selecteaza tbody-ul pentru a-l putea modifica
  tableBody.innerHTML = "";
  //se goleste tabelul pentru a putea adauga noi elevi fara sa se afiseze elevii vechi
  for (let i = 0; i <= elevi.length - 1; i++) {
    tableBody.innerHTML += `
       <tr id="elev_${i}">
         <td>${elevi[i].nume}</td>
         <td>${elevi[i].medie.toFixed(2)}</td>
         <td><button class="vezi-note">Vezi Notele</button></td>
         <td><button class="sterge-elev">X</button></td>
       </tr>
      
    `;
  }
  //pentru fiecare elev se adauga in tabel nume, medie si cele 2 butoane
}

function trateazaActiuniTabel(e) {
  if (e.target.classList.contains("vezi-note")) {
    sectiuneNote.classList.remove("hide");
    const id = e.target.parentElement.parentElement.id;
    //obtine id fiecarui elev
    const index = id.split("_")[1];
    // primeste doar index ul din id (ex id: elev_3, index: 3)
    indexElevNota = index;
    afisareNote(elevi[index]);
  } else if (e.target.classList.contains("sterge-elev")) {
    //verifica daca butonul apasat are clasa sterge-elev
    const id = e.target.parentElement.parentElement.id;
    const index = id.split("_")[1];
    //primeste index ul elevului
    elevi.splice(index, 1);
    // elimina 1 elev pornind de la pozitia index
    afisareTabel(elevi);
    //reafiseaza tabelul
  }
}

function ascundereNote() {
  sectiuneNote.classList.add("hide");
}

function afisareNote(elev) {
  const index = elevi.indexOf(elev);
  const h1NumeElev = containerNoteElev.querySelector("h1");
  h1NumeElev.innerHTML = elev.nume;
  const tableBody = tabelNote.querySelector("tBody");
  tableBody.innerHTML = "";
  for (let i = 0; i <= elev.note.length - 1; i++) {
    tableBody.id = `elev_${index}`;
    tableBody.innerHTML += `
       <tr id="nota_${i}">
         <td>${elev.note[i].toFixed(2)}</td>
         <td><button class="sterge-nota">X</button></td>
       </tr>
    `;
  }
}

function trateazaActiuniTabelNote(e) {
  if (e.target.classList.contains("sterge-nota")) {
    const idNota = e.target.parentElement.parentElement.id;
    const indexNota = idNota.split("_")[1];
    const idTableBody = e.target.parentElement.parentElement.parentElement.id;
    const indexElev = idTableBody.split("_")[1];
    console.log(indexElev, indexNota);
    elevi[indexElev].note.splice(indexNota, 1);
    afisareNote(elevi[indexElev]);
  }
}

function adaugaElev() {
  console.log(inputNumeElev.value);
  const numeElev = inputNumeElev.value;
  if (numeElev.length > 2) {
    elevi.push({ nume: numeElev, medie: 0, note: [] });
  } else {
    alert("Numele este prea mic");
  }
  afisareTabel(elevi);
}

function adaugaNota() {
  const nota = parseFloat(inputNota.value);
  if (!isNaN(nota) && nota >= 0 && nota <= 10) {
    const idTableBody = tabelNote.querySelector("tbody").id;
    const indexElev = idTableBody.split("_")[1];
    elevi[indexElev].note.push(nota);
    calculareMedie(indexElev);
    afisareNote(elevi[indexElev]);
    afisareTabel(elevi);
  } else {
    alert("Nota trebuie sa fie intre 0 si 10.");
  }
}

function calculareMedie(index) {
  const elev = elevi[index];
  const suma = elev.note.reduce((acc, nota) => acc + nota, 0);
  elev.medie = elev.note.length ? suma / elev.note.length : 0;
}

function sorteazaNoteAsc() {
  const index = containerNoteElev.querySelector("tbody").id.split("_")[1];
  elevi[index].note.sort((a, b) => a - b);
  afisareNote(elevi[index]);
}

function sorteazaNoteDesc() {
  const index = containerNoteElev.querySelector("tbody").id.split("_")[1];
  elevi[index].note.sort((a, b) => b - a);
  afisareNote(elevi[index]);
}
