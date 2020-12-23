
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function PartPreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [identifier, setIdentifier] = useState('unidentified');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [pins, setPins] = useState([]);
    const [components, setComponents] = useState([]);
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
        if (node.kind !== 'part') {
            setStatus('node-not-a-part')
            return;
        }

        setIdentifier(node.identifier);
        setName(node.name);
        setBoard(models[node.parent]);

        let newPins = node.pins.map(id => {
            const pin = models[id];
            return { id: id, name: pin.name, number: pin.number };
        });
        setPins(newPins);

        let newComponents = node.components.map(id => {
            const com = models[id];
            return { id: id, name: com.refdes };
        });
        setComponents(newComponents);

    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

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
                        {board !== undefined && <Link className="btn btn-link" to={`/board/${board.id}`}>Board {board.refdes}</Link>}
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
            <tr key={`pin-${pin.id}`}>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="components" title={"Component Instancess ("+ components.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Component Name</th>
            </tr>
        </thead>
        <tbody>
        {components.map(com => 
            <tr key={`com-${com.id}`}>
            <td><Link to={`/component/${com.id}`}>{com.name}</Link></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default PartPreview;
