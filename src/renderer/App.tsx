import './App.css';
import {Welcome} from './Welcome';
import React, {useEffect} from 'react';
import {ManagerApi} from '../main/api/api';

const manager = new ManagerApi('localhost:5353');
manager.connect()
    .then(() => console.log('Connected to manager'));


export default function App() {
    return (
        <div className="main">
            {/* <Welcome onFinished={() => {}} /> */}

            <div className="app">
                <StatusButton />
                <CasparLog/>
            </div>
        </div>
    );
};

const CasparLog: React.FC = () => {
    const [logs, setLogs] = React.useState<string>('');

    useEffect(() => {
        const listener = (logs: string) => {
            setLogs(logs);
        };

        manager.caspar.on('logs', listener);
        manager.caspar.getLogs().then(listener);

        return () => {
            manager.caspar.off('logs', listener);
        };
    }, []);

    return (
        <div className="logs" style={{
            whiteSpace: 'pre-wrap',
        }}
        >
            {logs}
        </div>
    );
};

const StatusButton: React.FC = () => {
    const [status, setStatus] = React.useState<boolean>(false);

    useEffect(() => {
        const listener = (status: {running: boolean}) => {
            console.log('Status changed to', status);
            setStatus(status.running);
        };

        manager.caspar.on('status', listener);

        manager.caspar.getStatus().then(listener);

        return () => {
            manager.caspar.off('status', listener);
        };
    }, []);

    return (
        <button
            className="status-button"
            onClick={async () => {
                console.log('Status button clicked');

                if (status) await manager.caspar.stop();
                else await manager.caspar.start();
            }}
            style={{
                backgroundColor: status ? 'green' : 'red',
                color: status ? '#121212' : '#d9d9d9',
            }}
        >
            Server is {status ? 'on' : 'off'} |  Turn {status ? 'off' : 'on'}
        </button>
    );
};