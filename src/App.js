
import { useGlobalContext } from './context';
import moon from './images/icon-moon.png'
import sun from './images/icon-sun.png'
import check from './images/icon-check.png'
import List from './List'
import Form from './Form';
function App() {
  const {switchTheme,theme} = useGlobalContext()
  return (
    <>
    <div className="bcg"></div>
    <div className="App">
      <div className="app-container">
        <div className="header">
          <h1>TODO</h1>
          <div className="switch" onClick={switchTheme}>
            <img src={theme === "dark" ? sun : moon} alt="switch"  />
          </div>
        </div>
        <Form/>
        <List/>
      </div>
    </div>
    </>
  );
}

export default App;
