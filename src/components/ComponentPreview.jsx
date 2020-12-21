
import React, { useState, useEffect } from 'react';
import { Tab, Button, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function ComponentPreview ({ node, models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node.kind !== 'component') return;

        setName(node.refdes);
        setBoard(models.models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models.models[id];
            const info = models.models[pin.pininfo];
            const sig = models.models[pin.signal];
            console.log("dsadsadsa", pin, info, sig)
            return { id: sig.id, name: info.name, number: info.number, signal: sig.name };
        });
        setPins(newPins);

    }, [node, models]);

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="component-preview">
        <Tab  eventKey="summary" title="Component Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="component-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="component-parent">
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
            <th>Pin name</th>
            <th>Pin number</th>
            <th>Signal</th>
            </tr>
        </thead>
        <tbody>
        {pins.map(pin => 
            <tr>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            <td>{pin.signal}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default ComponentPreview;
