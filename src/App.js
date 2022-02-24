import Form from "./Components/Form";
import BigCalendar from './Components/BigCalendar'
import { Routes, Route, Link } from "react-router-dom";





function App() {

  return (
    <div>
      <div style={{display: 'flex',justifyContent: "center"}}>
        <h5 style={{marginRight: 20}}><Link style={{color: "#1565c0"}} to="/">Task1</Link></h5>
      <h5> <Link style={{color: "#1565c0"}} to="task2">Task2</Link></h5>
      </div>
      
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="task2" element={<BigCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
