const tasktitle=document.getElementById("tasktitle");
const taskcategory=document.getElementById("taskcategory");
const taskDeadline=document.getElementById("taskDeadline");
const addTaskBtn=document.getElementById("addTaskBtn");
const taskcontainer=document.getElementById("taskcontainer");
const searchinput=document.getElementById("searchinput");
const filterSelect=document.getElementById("filterSelect");


let tasks=[];
let originalTasks = [];

fetch("tasks.json")
    .then(response=> response.json())
    .then(data=>{tasks=data; originalTasks = [...data];  renderTasks(tasks);});

    addTaskBtn.addEventListener(
        "click",
        function(){
            const newTask={
                title:tasktitle.value,
                category:taskcategory.value,
                deadline:taskDeadline.value,
                completed:false


            };
            tasks.push(newTask);
            originalTasks.push(newTask);
            renderTasks(tasks);

            tasktitle.value="";
            taskcategory.value="";
            taskDeadline.value="";
        }
    );

    function renderTasks(taskArray){
        taskcontainer.innerHTML="";
        taskArray.forEach(function(task,index) {
            const taskCard=document.createElement("div");
            taskCard.classList.add("task-card");
            if(task.completed){
                taskCard.classList.add("completed");
            }
            taskCard.innerHTML=`
                <h3>${task.title}</h3>

                <p>Category:${task.category}</p>
                <p>Deadline:${task.deadline}</p>
                <button class="completeBtn">Complete</button>
                <button class="deleteBtn">Delete</button>`;


                // ✅ صح
taskCard.querySelector(".completeBtn").addEventListener("click", function(){
    tasks[index].completed = true;
    renderTasks(tasks);
});
                    taskcontainer
                        .appendChild(taskCard);


        });
    }
    searchinput.addEventListener(
        "input",
        function(){
            const searchtext=searchinput.value.toLowerCase();
                const filteredtasks = originalTasks.filter(function(task) { // ✅ ابحث في الأصلية
        return task.title.toLowerCase().includes(searchtext);
    });
            renderTasks(filteredtasks);
        }
    );
    filterSelect.addEventListener(
        "change",
        function(){
            const selected=filterSelect.value;
            if(selected==="All"){
                renderTasks(originalTasks);
            }else if(
                selected==="completed"

            ){
                renderTasks(originalTasks.filter(task => task.completed)); 

            }else{
                renderTasks(originalTasks.filter(task => !task.completed));
            }


            
        }
    );