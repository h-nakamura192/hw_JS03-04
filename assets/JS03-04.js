'use strict';
const output = document.getElementById('output');
let taskArrays = [];

//タスクを追加
function addTask() {
  const inputComment = document.getElementById('inputComment').value;
  taskArrays.push({
    comment: inputComment,
    status: '作業中'
  });
}

// タスクのid、コメントを出力
function displayTask( index, div, value ) {
  const taskId = document.createElement('p');  
  // taskId.textContent = `${taskArrays.indexOf(taskArrays[i])}`;
  taskId.textContent = index;
  taskId.classList.add('box1');
  div.appendChild(taskId);

  const taskComment = document.createElement('p');  
  taskComment.textContent = value.comment;
  taskComment.classList.add('box2');
  div.appendChild(taskComment);
}

//状態のボタンを出力
function createStatusBtn( value, div, index ) {
  const statusButton = document.createElement('input');
  statusButton.type = 'button';
  // statusButton.value = taskArrays[i].status;
  statusButton.value = value.status;
  statusButton.classList.add('box3');
  statusButton.classList.add('taskBtn');
  div.appendChild(statusButton);
  
  //タスクの状態を変更（完了⇄作業中）
  statusButton.addEventListener('click', function() {
    if (taskArrays[index].status == '作業中') {
      taskArrays[index].status = '完了';
    } else {
      taskArrays[index].status = '作業中';
    }
    //変更時、ラジオボタンが選択されていれば再度出力
    if (document.radioBtns.status[1].checked) {
      workingSwitch();
    } else if (document.radioBtns.status[2].checked) {
      doneSwitch();
    } else {
      reset();
    }
  })

}

//出力内容をすべて消去して、再度出力
function reset() {
  output.textContent = '';
  outputHtml();
  formClear();
}

//フォーム入力値を空にする
function formClear() {
  let input = document.getElementById('inputComment');
  input.value = '';
}

//削除ボタンを出力
function createDeleteBtn( div, index ) {
  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = '削除';
  deleteButton.classList.add('box3');
  deleteButton.classList.add('taskBtn');
  deleteButton.classList.add('deleteButton');
  div.appendChild(deleteButton);
  
  //削除ボタンを押下した際にタスク削除し、再度出力
  deleteButton.addEventListener('click', function() {
    let deleteId = index;
    taskArrays.splice(deleteId, 1);
    reset();
})
}

//taskArrays配列の要素をすべて出力
function outputHtml () {
  taskArrays.forEach( function(value, index) {
    const div = document.createElement('div');  
    div.classList.add('box-wp');
    output.appendChild(div);

    displayTask(index, div, value);
    createStatusBtn(value, div, index);
    createDeleteBtn(div, index);
  });
  formClear();
}

// 追加ボタンを押下した際に、タスクを追加
const taskAddBtn = document.getElementById('taskAddBtn');
taskAddBtn.addEventListener('click', function() {
  output.textContent = '';
  addTask();
  if ( document.getElementById('working').checked ) {
    workingSwitch();
  }else if ( document.getElementById('done').checked ) {
    doneSwitch();
  }else {
    outputHtml();
  }
}
)

//タスク表示切り替えボタンの要素を取得
const AllBtn = document.getElementById('all');
const workingBtn = document.getElementById('working');
const doneBtn = document.getElementById('done');

//"作業中"の状態のタスクのみ出力する関数を定義
function workingSwitch () {
  output.textContent = '';
  taskArrays.forEach( function(value, index) {
    if (value.status == '作業中') {
      const div = document.createElement('div');  
      div.classList.add('box-wp');
      output.appendChild(div);
  
      displayTask(index, div, value);
      createStatusBtn(value, div, index);
      createDeleteBtn(div, index);
    }
  });
  formClear();
}

//"完了"の状態のタスクのみ出力する関数を定義
function doneSwitch () {
  output.textContent = '';
  taskArrays.forEach( function(value, index) {
    if (value.status == '完了') {
      const div = document.createElement('div');  
      div.classList.add('box-wp');
      output.appendChild(div);
  
      displayTask(index, div, value);
      createStatusBtn(value, div, index);
      createDeleteBtn(div, index);
    }
  });
  formClear();
}

//"すべて"のラジオボタンがチェックされた時、すべてのタスクを出力
AllBtn.addEventListener('change', reset)
//"作業中"のラジオボタンがチェックされた時、"作業中"の状態のタスクのみ出力
workingBtn.addEventListener('change', workingSwitch)
//"完了"のラジオボタンがチェックされた時、"完了"の状態のタスクのみ出力
doneBtn.addEventListener('change', doneSwitch)








