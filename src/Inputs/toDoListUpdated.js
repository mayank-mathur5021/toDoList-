import { useEffect, useState } from "react";

function InputList() {
    const [value, setValue] = useState('');
    const [itemMap, setItemMap] = useState([]);
    const [taskList, setTaskList] = useState();

    function inputValue(event) {
        let newValue = event.target.value
        setValue(newValue)
    }

    useEffect(() => {
        if (localStorage.getItem('tasksList') === null) {
            //if storage is null then create a key : items
            localStorage.setItem('tasksList', '')
        }

        //get items from local storae
        let items_string = localStorage.getItem('tasksList');

        //convert them into array
        if (items_string) {
            setItemMap(JSON.parse(items_string));
        }
    }, [])

    useEffect(() => {
        setTaskList(
            <ul id="taskList">
                {itemMap.map((task) => (
                    <li id={task.id} key={task['id']} className="itemName"><span onClick={() => handleChange(task.id)}>{task['taskName']}</span><span className="close" onClick={()=>handleDelete(task.id)}>&times;</span></li>
                ))}
            </ul>
        )
    }, [itemMap]);


    function handleDelete(id){
        let updatedArray = [...itemMap];
        updatedArray.splice(id,1)
        localStorage.setItem('tasksList', JSON.stringify(updatedArray));
        let div = document.getElementById(id);
        div.style.display = "none"
        setItemMap(updatedArray);
    }


    function handleChange(id) {
        let newValue = prompt('update the task');
        if(!newValue){
            return;
        }
        let index = itemMap.findIndex(task => task.id === id);
        let updatedArray = [...itemMap];
        updatedArray[index] = { 'id': index, 'taskName': newValue }
        localStorage.setItem('tasksList', JSON.stringify(updatedArray));
        setItemMap(updatedArray)
    }


    function addTask() {
        let newTask = value;
        if (newTask === '') {
            return;
        }
        let newItem = { 'id': itemMap.length, 'taskName': newTask };
        let updatedArray = [...itemMap, newItem];
        localStorage.setItem('tasksList', JSON.stringify(updatedArray));
        setItemMap(updatedArray);
        setValue('');
    }

    return (
        <>
            <div id="input">
                <input id="task" placeholder="Title..." value={value} onChange={inputValue} />
                <button id="btn" onClick={addTask}>Add Task</button>
            </div>
            <div id="listBox">
                {taskList}
            </div>
        </>
    );
}

export default InputList;