var button = document.getElementById('enter');
var ul     = document.querySelector('ul');
var input  = document.getElementById('userinput');
var span   = document.getElementById('span');

function checkAddedElement(str){
  for(i = 0; i < ul.children.length; i++ ){
    if( str.toLowerCase() === ul.children[i].innerHTML.toLowerCase() ){
      return 0;
    }
  }
  return 1;
}

function createListElement(){
  var val = input.value + '   ';

  if( val.length === 0 ){
    span.innerHTML = 'No item entered';
    return;
  }

  if( checkAddedElement(val) === 1 ){
    var li           = document.createElement('li');
    var deleteButton = document.createElement('button');
    var br           = document.createElement('br');
    li.innerHTML     = val;
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('delete');
    li.appendChild(deleteButton);
    li.appendChild(br);
    ul.appendChild(li);
    span.innerHTML = "New Item Entered to the list!";
    input.value    = "";
  } else {
    span.innerHTML = '****the item entered already exists in the shopping list****';
  }
}

function handleKeyPress(keyCode) {
  var errorBox = document.getElementById('error');
  if(keyCode === 13){
    errorBox.innerHTML = '';
    createListElement();
  }
  else{
    if( keyCode === 32 || keyCode === 64 ){
      errorBox.innerHTML = '**Error: No Space or special character allowed in item';
      return;
    }
  }
}

function toggleClass(){
  if(this.classList.contains('done')){
    this.classList.remove('done');
  }
  else{
    this.classList.add('done');
  }
}

function listenForClicksOnItems(){
  var items = document.querySelectorAll('li');
  items.forEach(item => item.addEventListener('click', toggleClass));
}

function listenForClicksOnDeleteButton(){
  var deleteButtonList = document.querySelectorAll('.delete');
  deleteButtonList.forEach(deleteButton => deleteButton.addEventListener('click', function(){
    ul.removeChild(this.parentNode);
  } ) );
}

listenForClicksOnItems();
listenForClicksOnDeleteButton();

button.addEventListener('click', function(){
    createListElement();
    listenForClicksOnItems();
    listenForClicksOnDeleteButton();
});

input.addEventListener('keypress', function(event){
  handleKeyPress(event.keyCode);
  listenForClicksOnItems();
  listenForClicksOnDeleteButton();
});
