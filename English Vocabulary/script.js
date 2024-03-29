'use strict';

let isEditing = false;

function addWords() {
  let table = document.getElementById("myTable01");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);

  let input = document.getElementById("addWords").value;
  cell1.innerHTML = input;
  cell7.innerHTML = "<button id='editButton' onclick='editRow(this)'>Edit</button>";
  cell8.innerHTML = "<button id='deleteButton' onclick='deleteRow(this)'>Delete</button>";
  document.getElementById("addWords").value = '';
  saveTable();
  window.onload = function () {
    loadTable();
  }
}

function loadTable() {
  let html = localStorage.getItem("myTable01");
  if (html) {
    document.getElementById("myTable01").outerHTML = html;
  }
}

function saveTable() {
  let table = document.getElementById("myTable01");
  let html = table.outerHTML;
  localStorage.setItem("myTable01", html);
}

function editRow(row) {
  isEditing = true;
  let rowIndex = row.parentNode.parentNode.rowIndex;
  let cell0 = document.getElementById("myTable01").rows[rowIndex].cells[0];
  let cell1 = document.getElementById("myTable01").rows[rowIndex].cells[1];
  let cell2 = document.getElementById("myTable01").rows[rowIndex].cells[2];
  let cell3 = document.getElementById("myTable01").rows[rowIndex].cells[3];
  let cell4 = document.getElementById("myTable01").rows[rowIndex].cells[4];
  let cell5 = document.getElementById("myTable01").rows[rowIndex].cells[5];
  let originalWord0 = cell0.innerHTML;
  let originalWord1 = cell1.innerHTML;
  let originalWord2 = cell2.innerHTML;
  let originalWord3 = cell3.innerHTML;
  let originalWord4 = cell4.innerHTML;
  let originalWord5 = cell5.innerHTML;
  let input0 = document.createElement("input");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let input3 = document.createElement("input");
  let input4 = document.createElement("input");
  let input5 = document.createElement("input");
  input0.setAttribute("type", "text",);
  input0.setAttribute("value", originalWord0);
  input0.setAttribute("size", "10");
  input1.setAttribute("type", "text",);
  input1.setAttribute("value", originalWord1);
  input1.setAttribute("size", "10");
  input2.setAttribute("type", "text",);
  input2.setAttribute("value", originalWord2);
  input2.setAttribute("size", "10");
  input3.setAttribute("type", "text",);
  input3.setAttribute("value", originalWord3);
  input3.setAttribute("size", "10");
  input4.setAttribute("type", "text",);
  input4.setAttribute("value", originalWord4);
  input4.setAttribute("size", "10");
  input5.setAttribute("type", "text",);
  input5.setAttribute("value", originalWord5);
  input5.setAttribute("size", "10");
  cell0.innerHTML = "";
  cell1.innerHTML = "";
  cell2.innerHTML = "";
  cell3.innerHTML = "";
  cell4.innerHTML = "";
  cell5.innerHTML = "";
  cell0.appendChild(input0);
  cell1.appendChild(input1);
  cell2.appendChild(input2);
  cell3.appendChild(input3);
  cell4.appendChild(input4);
  cell5.appendChild(input5);
  let editButton = cell1.parentNode.cells[6].getElementsByTagName("button")[0];
  editButton.setAttribute("onclick", `saveWords(${rowIndex})`);
  editButton.innerHTML = "Save";
}

function deleteRow(row) {
  let d = row.parentNode.parentNode.rowIndex;
  document.getElementById("myTable01").deleteRow(d);
  saveTable();
}

function saveWords(rowIndex) {
  isEditing = false;
  let cell0 = document.getElementById("myTable01").rows[rowIndex].cells[0];
  let cell1 = document.getElementById("myTable01").rows[rowIndex].cells[1];
  let cell2 = document.getElementById("myTable01").rows[rowIndex].cells[2];
  let cell3 = document.getElementById("myTable01").rows[rowIndex].cells[3];
  let cell4 = document.getElementById("myTable01").rows[rowIndex].cells[4];
  let cell5 = document.getElementById("myTable01").rows[rowIndex].cells[5];

  let input0 = cell0.getElementsByTagName("input")[0];
  let input1 = cell1.getElementsByTagName("input")[0];
  let input2 = cell2.getElementsByTagName("input")[0];
  let input3 = cell3.getElementsByTagName("input")[0];
  let input4 = cell4.getElementsByTagName("input")[0];
  let input5 = cell5.getElementsByTagName("input")[0];

  cell0.innerHTML = input0.value;
  cell1.innerHTML = input1.value;
  cell2.innerHTML = input2.value;
  cell3.innerHTML = input3.value;
  cell4.innerHTML = input4.value;
  cell5.innerHTML = input5.value;

  let saveButton = cell1.parentNode.cells[6].getElementsByTagName("button")[0];
  saveButton.setAttribute("onclick", `editRow(this)`);
  saveButton.innerHTML = "Edit";
  saveTable();
}

document.addEventListener('DOMContentLoaded', function (e) {
  let input = document.getElementById("addWords");
  if (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        addWords();
        e.preventDefault();
      }
    })
  }
});

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    let activeElement = document.activeElement;
    let isInputActive = activeElement.tagName === 'INPUT';
    if (isEditing && isInputActive) {
      let rowIndex = activeElement.closest('tr').rowIndex;
      saveWords(rowIndex);
      e.preventDefault();
    }
  }
});
