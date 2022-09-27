import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppRouting from "./AppRouting";
import Toaster from "./components/Utils/Toast";

function App() {
  return (
    <>
      <AppRouting />
      <Toaster />
    </>
  );
}

export default App;
