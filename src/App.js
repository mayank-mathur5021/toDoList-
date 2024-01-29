import logo from './logo.svg';
import './App.css';
import HeadingList from './headings/toDoList';


function ToDoListApp(){
  return(
    <HeadingList />
  );
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDoListApp />
      </header>
    </div>
  );
}

export default App;
