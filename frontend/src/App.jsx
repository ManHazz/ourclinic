import OurClinic from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientTab from "./PatientTab";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OurClinic />} />
      </Routes>
      <Routes>
        <Route path="/patients" element={<PatientTab />} />
      </Routes>
    </Router>
  );
}

export default App;
