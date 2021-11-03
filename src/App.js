import Header from './components/header'

function App() {
    const rows = [1,2,3,4,5,6,7,8,9];
  return (
    <div className="App text-indigo-400">
      <Header />

      <div className="grid container mx-auto mt-10 grid-cols-3 gap-4 text-center">
          {rows.map((row) => {
              return (
                  <div className="text-4xl grid grid-cols-3">
                      {rows.map((row) => {
                          return (<div className="text-4xl p-4 border border-indigo-400">{row}</div>)
                      })}
                  </div>
              )
          })}
      </div>
    </div>
  );
}

export default App;
