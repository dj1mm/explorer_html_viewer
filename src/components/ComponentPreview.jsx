
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function ComponentPreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [part, setPart] = useState(undefined);
    const [pins, setPins] = useState([]);
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
        if (node.kind !== 'component') {
            setStatus('node-not-a-component')
            return;
        }

        setName(node.refdes);
        setBoard(models[node.parent]);
        setPart(models[node.part]);

        let newPins = node.pins.map(id => {
            const pin = models[id];
            const info = models[pin.pininfo];
            const sig = models[pin.signal];
            return { id: id, name: info.name, number: info.number, signalId: sig.id, signal: sig.name };
        });
        setPins(newPins);

    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

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
                        {board !== undefined && <Link className="btn btn-link" to={`/board/${board.id}`}>Board {board.refdes}</Link>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="component-part">
                    <Form.Label column sm="2">Part</Form.Label>
                    <Col sm="10">
                        {part !== undefined && <Link className="btn btn-link" to={`/part/${part.id}`}>Part {part.name}</Link>}
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
            <tr key={`pin-${pin.id}`}>
            <td>{pin.name}</td>
            <td>{pin.number}</td>
            <td><Link to={`/signal/${pin.signalId}`}>{pin.signal}</Link></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default ComponentPreview;
