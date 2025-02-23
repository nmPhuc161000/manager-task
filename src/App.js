import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter"; // Import AppRouter

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
