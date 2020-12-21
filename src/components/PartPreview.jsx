
import React, { useState, useEffect } from 'react';
import { Tab, Button, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function PartPreview ({ node, models }) {
    const [key, setKey] = useState('summary');
    const [identifier, setIdentifier] = useState('unidentified');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);
    const [components, setComponents] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node.kind !== 'part') return;

        console.log(node)
        setIdentifier(node.identifier);
        setName(node.name);
        setBoard(models.models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models.models[id];
            return { id: id, name: pin.name, number: pin.number };
        });
        setPins(newPins);

        let newComponents = node.components.map(id => {
            const com = models.models[id];
            return { id: id, name: com.refdes };
        });
        setComponents(newComponents);

    }, [node, models]);

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="part-preview">
        <Tab  eventKey="summary" title="Part Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="part-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="part-identifier">
                    <Form.Label column sm="2">Identifier</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={identifier} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="part-parent">
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
            </tr>
        </thead>
        <tbody>
        {pins.map(pin => 
            <tr>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="components" title={"Components ("+ components.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Component name</th>
            </tr>
        </thead>
        <tbody>
        {components.map(component => 
            <tr>
            <td>{component.name}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default PartPreview;
