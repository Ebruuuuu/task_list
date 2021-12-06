//Define UI Vars
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');//ul
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');// filter input
const taskInput=document.querySelector('#task');

//Load all event listeners
loadEventListeners();//function is called

function loadEventListeners(){

    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);

    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter task event
    //Keyup=Klavyeden input'u değiştirdikten sonra aktif olur.
    filter.addEventListener('keyup',filterTasks);


}

//Get Tasks from LS(Local Storage)
//If reload the page, tasks don't disppear 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];//array
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

tasks.forEach(function(task){
//Listeyi sayfada tekrar oluşturur.

//Create li element
const li=document.createElement('li');
//Add class
li.className='collection-item';
//Create text node and append to li
li.appendChild(document.createTextNode(task));
//Create new link element
const link=document.createElement('a');
//Add class
link.className='delete-item secondary-content';
//Add icon html
link.innerHTML='<i class="fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);

});

}


//Add Task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
        
    }

//Create li element
const li=document.createElement('li');
//Add class
li.className='collection-item';
//Create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//Create new link element
const link=document.createElement('a');
//Add class
link.className='delete-item secondary-content';
//Add icon html
link.innerHTML='<i class="fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);
console.log(taskList);

//Store in LS(Local Storage)
storeTaskInLocalStorage(taskInput.value);//function is called

//Clear input
taskInput.value='';

e.preventDefault();


}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];//array
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);//array'in sonuna task eklenmesini sağlar.

    localStorage.setItem('tasks',JSON.stringify(tasks));
}





//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){//a=link
       if(confirm('Are You Sure?')){
           e.target.parentElement.parentElement.remove();//li is deleted

           //Remove from LS
           removeTaskFromLocalStorage
           (e.target.parentElement.parentElement);//li is deleted

        } 
    }
}

//Remove from LS
function  removeTaskFromLocalStorage(taskItem){
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];//array
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));//JSON transforms to JavaScript
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
           tasks.splice(index,1);//array'den 1 eleman silinir.
           //array.splice(index,num);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));//JavaScript transforms to JSON

} 

//Clear Tasks
function clearTasks(){
    //Faster
  while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
  }

  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text=e.target.value.toLowerCase();//input


  //querySelector returns node list
  document.querySelectorAll('.collection-item').forEach
  (function(task){
   const item=task.textContent;//task.firstChild.textContent

   if(item.toLowerCase().indexOf(text)!=-1){//coherent
       task.style.display='block';
       
   }else{
       task.style.display='none';//incoherent
   }

  });
  
}
//nodelist array'e oldukça benzer.
//nodelist ögelerine yalnızca dizin numaralarıyla erişilebilir.
//array.foreach()
//array.indexof()=-1 : aradığımız eleman array içerisinde yoksa -1 değeri döndürülür.
//array.indexof(parameter1);
//parameter1:array içinde indeks numarasını bulmak istediğimiz eleman





