import Header from "./components/Header";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header></Header>
      <main className="container mx-auto py-4 px-4">
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <Sidebar></Sidebar>
          <Content></Content>
        </div>
      </main>
    </>
  );
}

export default App;
