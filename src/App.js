
import Header from "@Layouts/Header";
import "./App.css";

import RoutesContainer from "@routes/RoutesContainer";

function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <RoutesContainer />
        </div>
      </header>
    </div>
  );
}

export default App;
