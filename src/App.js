import 'leaflet/dist/leaflet.css';
import './App.css'
import Header from './components/Header';
import Map from './components/Map';
import Cards from './components/Cards';


function App() {
  return (
    <div className="App">
      <div className='container'>
      <Header />
      <Map/>
      <Cards />
      </div>
    </div>
  );
}

export default App;
