'use strict';
const output = document.getElementById("output");
let taskArrays = [];

//タスクを追加
function addTask() {
  const inputComment = document.getElementById("inputComment").value;
  taskArrays.push({
    comment: inputComment,
    status: '作業中'
  });
}

// タスクのid、コメントを出力
function displayTask( index, div, value ) {
  const taskId = document.createElement("p");  
  // taskId.textContent = `${taskArrays.indexOf(taskArrays[i])}`;
  taskId.textContent = index;
  taskId.classList.add('box1');
  div.appendChild(taskId);

  const taskComment = document.createElement("p");  
  taskComment.textContent = value.comment;
  taskComment.classList.add('box2');
  div.appendChild(taskComment);
}

//状態のボタンを出力
function createStatusBtn( value, div, index ) {
  const statusButton = document.createElement("input");
  statusButton.type = 'button';
  // statusButton.value = taskArrays[i].status;
  statusButton.value = value.status;
  statusButton.classList.add('box3');
  statusButton.classList.add('taskBtn');
  div.appendChild(statusButton);
  
  //タスクの状態を変更（完了⇄作業中）
  statusButton.addEventListener("click", function() {
    if (taskArrays[index].status == '作業中') {
      taskArrays[index].status = '完了';
    } else {
      taskArrays[index].status = '作業中';
    }
    reset();
  })

}

//出力内容をすべて消去して、再度出力
function reset() {
  output.textContent = "";
  outputHtml();
}

//削除ボタンを出力
function createDeleteBtn( div, index ) {
  const deleteButton = document.createElement("input");
  deleteButton.type = 'button';
  deleteButton.value = '削除';
  deleteButton.classList.add('box3');
  deleteButton.classList.add('taskBtn');
  deleteButton.classList.add('deleteButton');
  div.appendChild(deleteButton);
  
  //削除ボタンを押下した際にタスク削除し、再度出力
  deleteButton.addEventListener("click", function() {
    let deleteId = index;
    taskArrays.splice(deleteId, 1);
    reset();
})
}

//taskArrays配列の要素をすべて出力
function outputHtml () {
  taskArrays.forEach( function(value, index) {
    const div = document.createElement("div");  
    div.classList.add('box-wp');
    output.appendChild(div);

    displayTask(index, div, value);
    createStatusBtn(value, div, index);
    createDeleteBtn(div, index);
  });
}

// 追加ボタンを押下した際に、タスクを追加
const taskAddBtn = document.getElementById("taskAddBtn");
taskAddBtn.addEventListener("click", function() {
  output.textContent = "";
  addTask();
  if ( document.getElementById("working").checked ) {
    workingSwitch();
  }else if ( document.getElementById("done").checked ) {
    doneSwitch();
  }else {
    outputHtml();
  }
}
)
// document.getElementById("taskAddBtn").addEventListener("click", function() {
//   output.textContent = "";
//   addTask();
//   if ( document.getElementById("working").checked ) {
//     workingSwitch();
//   }else if ( document.getElementById("done").checked ) {
//     doneSwitch();
//   }else {
//     outputHtml();
//   }
// }
// )

//タスク表示切り替えボタンの要素を取得
const AllBtn = document.getElementById("all");
const workingBtn = document.getElementById("working");
const doneBtn = document.getElementById("done");

function workingSwitch () {
  output.innerHTML = "";
  taskArrays.forEach( function(value, index) {
    if (value.status == '作業中') {
      const div = document.createElement("div");  
      div.classList.add('box-wp');
      output.appendChild(div);
  
      displayTask(index, div, value);
      createStatusBtn(value, div, index);
      createDeleteBtn(div, index);
    }
  });
}

function doneSwitch () {
  output.innerHTML = "";
  taskArrays.forEach( function(value, index) {
    if (value.status == '完了') {
      const div = document.createElement("div");  
      div.classList.add('box-wp');
      output.appendChild(div);
  
      displayTask(index, div, value);
      createStatusBtn(value, div, index);
      createDeleteBtn(div, index);
    }
  });
}

AllBtn.addEventListener("click", function() {
  reset();
})
workingBtn.addEventListener("click", workingSwitch)
doneBtn.addEventListener("click", doneSwitch)








