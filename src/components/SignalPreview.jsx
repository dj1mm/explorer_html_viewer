
import React, { useState, useEffect } from 'react';
import { Tab, Button, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function SignalPreview ({ node, models, onUpdate }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node === null) return;
        if (node.kind !== 'signal') return;
        setName(node.name);
        setBoard(models.models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models.models[id];
            const com = models.models[pin.parent];
            const info = models.models[pin.pininfo];
            return { id: com.id, component: com.refdes, name: info.name, number: info.number };
        });
        setPins(newPins);

        let newSignals = models.models[node.net].signals.map(id => {
            const sig = models.models[id];
            const brd = models.models[sig.parent];
            return { boardId: brd.id, board: brd.refdes, signalId: sig.id, signal: sig.name };
        });
        setSignals(newSignals);
    }, [node, models]);

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
                        {board !== undefined && <Button onClick={() => onUpdate(board.id)}>Board {board.refdes}</Button>}
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
            <td><Button style={{padding:0}} variant="link" onClick={() => onUpdate(pin.id)}>{pin.component}</Button></td>
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
            <td><Button style={{padding:0}} variant="link" onClick={() => onUpdate(sig.boardId)}>{sig.board}</Button></td>
            <td><Button style={{padding:0}} variant="link" onClick={() => { setKey('summary'); onUpdate(sig.signalId)}}>{sig.signal}</Button></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default SignalPreview;
