import './App.css';
import {Welcome} from './Welcome';

export default function App() {
    return (
        <div className="main">
            <Welcome onFinished={() => {}} />
            <div className="app">
            </div>
        </div>
    );
};
