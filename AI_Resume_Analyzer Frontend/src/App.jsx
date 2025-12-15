import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/Homepage";
import { PageNotFound } from "./pages/PageNotFound";
import { Navbar } from "./components/Navbar";
import { AnalyzePage } from "./pages/AnalyzePage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
