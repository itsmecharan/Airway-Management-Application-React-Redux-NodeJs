import { Provider } from 'react-redux';
import Home from './Components/Home';
import store from './Redux/store';
import './Styles/Styles.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>
  );
}

export default App;
