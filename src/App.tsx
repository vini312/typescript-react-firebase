import './App.css';
import List from './view/List'
import Header from './view/Header'
import AddProduct from './view/AddProduct'
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <List />
        </Route>
        <Route path='/add-product'>
          <AddProduct />
        </Route>
        <Route path='/update-product/:id'>
          <AddProduct />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
