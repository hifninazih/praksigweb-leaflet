import Map from "./components/Map";
import Title from "./components/Title";

function App() {
  return (
    <div className="relative w-full h-screen">
      <Map />

      <div className="absolute w-full flex justify-center  top-0 left-1/2 -translate-x-1/2 z-[1001]">
        <Title />
      </div>
    </div>
  );
}

export default App;
