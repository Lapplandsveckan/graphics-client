import './App.css';
import {Welcome} from './Welcome';
import {useState} from 'react';

export default function App() {
    const [state, setState] = useState<string>('welcome');

    if (state === 'welcome') {
        return (
            <Welcome onFinished={() => setState('app')} />
        );
    }

    return (
        <div className="app">

        </div>
    );
};
