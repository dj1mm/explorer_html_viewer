
import React, { useState, useEffect } from 'react';
import { Tab, Button, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function SignalPreview ({ node, models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node.kind !== 'signal') return;
        setName(node.name);
        setBoard(models.models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models.models[id];
            const com = models.models[pin.parent];
            const info = models.models[pin.pininfo];
            return { id: id, component: com.refdes, name: info.name, number: info.number };
        });
        setPins(newPins);

        console.log(models.models[node.net])
        let newSignals = models.models[node.net].signals.map(id => {
            const sig = models.models[id];
            console.log(sig)
            const brd = models.models[sig.parent];
            return { id: id, board: brd.refdes, signal: sig.name };
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
                        {board !== undefined && <Button>Board {board.refdes}</Button>}
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
            <td>{pin.component}</td>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="signals" title={"Electrical nets ("+ signals.length +")"}>
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
            <td>{sig.board}</td>
            <td>{sig.signal}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default SignalPreview;
