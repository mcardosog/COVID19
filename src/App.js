import React from 'react';
import logo from './logo512.png';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import VoiceControl from "./VoiceControl";
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react'


const HeaderWithLogo = () => (
    <div>
        <img src={logo} className="App-logo" alt="logo" style={{'width':'200px','height':'auto'}} />
        <p>
          <strong>COVID-19 TRACKER</strong>
        </p>
    </div>
)

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HeaderWithLogo/>
                <br/>
                <br/>
                <VoiceControl/>
            </header>
        </div>

    );
}

export default App;
