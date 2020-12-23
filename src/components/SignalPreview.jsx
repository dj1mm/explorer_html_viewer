
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function SignalPreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);
    const [signals, setSignals] = useState([]);
    const [status, setStatus] = useState('okayy');
    
    let { id } = useParams();

    // listen for changes on the id. If id changes, we shall fetch data from
    // the model and populate the fields for display
    useEffect(() => {
        if (id === undefined) return;
        let node = models[id];

        if (node === undefined) {
            setStatus('node-not-found')
            return;
        }
        if (node.kind !== 'signal') {
            setStatus('node-not-a-signal')
            return;
        }

        setStatus('okayy')
        setName(node.name);
        setBoard(models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models[id];
            const com = models[pin.parent];
            const info = models[pin.pininfo];
            return { id: com.id, component: com.refdes, name: info.name, number: info.number };
        });
        setPins(newPins);

        let newSignals = models[node.net].signals.map(id => {
            const sig = models[id];
            const brd = models[sig.parent];
            return { boardId: brd.id, board: brd.refdes, signalId: sig.id, signal: sig.name };
        });
        setSignals(newSignals);
    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="signal-preview">
        <Tab  eventKey="summary" title="Signal Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="signal-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="signal-parent">
                    <Form.Label column sm="2">Parent</Form.Label>
                    <Col sm="10">
                        {board !== undefined && <Link className='btn btn-link' to={`/board/${board.id}`}>Board {board.refdes}</Link>}
                    </Col>
                </Form.Group>
            </Form>
        </Tab>
        <Tab eventKey="pins" title={"Pins ("+ pins.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Component</th>
            <th>Pin name</th>
            <th>Pin number</th>
            </tr>
        </thead>
        <tbody>
        {pins.map(pin => 
            <tr>
            <td><Link to={`/component/${pin.id}`}>{pin.component}</Link></td>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="signals" title={"Signals part of same net ("+ signals.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Board</th>
            <th>Signal</th>
            </tr>
        </thead>
        <tbody>
        {signals.map(sig => 
            <tr>
            <td><Link to={`/board/${sig.boardId}`}>{sig.board}</Link></td>
            <td><Link to={`/signal/${sig.signalId}`} onClick={() => { setKey('summary') }}>{sig.signal}</Link></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default SignalPreview;
