import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'

import Main from './Main'
import logo from './logo.svg';
import './App.css';
import {
  HashRouter as Router
} from "react-router-dom";

function App() {
    const [models, setModels] = useState(null);

    useEffect(() => {
        fetch('models.json')
        .then(response => response.json())
        .then(json => { setModels(json.models) })
        .catch(error => console.log('There was an error', error))
    }, []);

    if (models == null) {
        return (
            <Row className="align-items-center flex-fill d-flex">
            <Col className="align-items-center d-flex flex-column">
                <img className="logo" src={logo} alt="logo" />
                <p className="loading-message">
                    Welcome - one sec - loading json model for you
                </p>
            </Col>
            </Row>
        );
    } else {
        return (<Router><Main models={models} /></Router>);
    }

}

export default App;
