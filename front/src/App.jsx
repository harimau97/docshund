import "./App.css";
import Footer from "./components/footer/footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>헤더가 만들어지면 들어갈 공간</div>
      <div className="flex-grow">{/* 사이트 내용이 들어갈 자리 */}</div>
      <Footer />
    </div>
  );
}

export default App;
