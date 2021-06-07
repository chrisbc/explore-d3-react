import logo from './logo.svg';
import './App.css';
import PreviewMFD from './components/PreviewMFD';
import PreviewLineMFD from './components/PreviewLineMFD';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
              <Route path="/PreviewMFD">
                <PreviewMFD />
              </Route>
              <Route path="/PreviewLineMFD">
                 <PreviewLineMFD />
              </Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
