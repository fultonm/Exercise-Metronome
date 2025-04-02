import * as React from "react";
import {HeroUIProvider} from "@heroui/react";
import Metronome from "./components/Metronome";
import "./App.css";

function App() {
  return (
    <HeroUIProvider>
      <div className="dark text-foreground bg-background">
        <div className="container">
          <Metronome />
        </div>
      </div>
    </HeroUIProvider>
  );
}

export default App