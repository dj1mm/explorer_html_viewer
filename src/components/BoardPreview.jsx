
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function BoardPreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [refdes, setRefdes] = useState('unrefdes');
    const [interfaces, setInterfaces] = useState([]);
    const [signals, setSignals] = useState([]);
    const [parts, setParts] = useState([]);
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
        if (node.kind !== 'board') {
            setStatus('node-not-a-board')
            return;
        }

        setStatus('okayy')
        setName(node.name);
        setRefdes(node.refdes);

        let newInterfaces = node.interfaces.map(id => {
            const itf = models[id];
            return { id: itf.id, name: itf.name, pins: itf.pins.length };
        });
        setInterfaces(newInterfaces);

        let newSignals = node.signals.map(id => {
            const sig = models[id];
            return { id: sig.id, name: sig.name, pins: sig.pins.length };
        });
        setSignals(newSignals);

        let newComponents = node.components.map(id => {
            const com = models[id];
            return { id: com.id, refdes: com.refdes, pins: com.pins.length };
        });
        setComponents(newComponents);

        let newParts = node.parts.map(id => {
            const prt = models[id];
            return { id: prt.id, name: prt.name, identifier: prt.identifier, pins: prt.pins.length };
        });
        setParts(newParts);
    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="board-preview">
        <Tab  eventKey="summary" title="Board Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="board-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="board-refdes">
                    <Form.Label column sm="2">Reference</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={refdes} />
                    </Col>
                </Form.Group>
            </Form>
        </Tab>
        <Tab eventKey="interfaces" title={"Interfaces ("+ interfaces.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Interface</th>
            <th>Pins</th>
            </tr>
        </thead>
        <tbody>
        {interfaces.map(itf => 
            <tr key={`itf-${itf.id}`}>
            <td><Link to={`/interface/${itf.id}`}>{itf.name}</Link></td>
            <td>{itf.pins}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="signals" title={"Signals ("+ signals.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Signal</th>
            <th>Pins</th>
            </tr>
        </thead>
        <tbody>
        {signals.map(sig => 
            <tr key={`sig-${sig.id}`}>
            <td><Link to={`/signal/${sig.id}`}>{sig.name}</Link></td>
            <td>{sig.pins}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="components" title={"Components ("+ components.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Component</th>
            <th>Pins</th>
            </tr>
        </thead>
        <tbody>
        {components.map(com => 
            <tr key={`com-${com.id}`}>
            <td><Link to={`/component/${com.id}`}>{com.refdes}</Link></td>
            <td>{com.pins}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        <Tab eventKey="parts" title={"Parts ("+ parts.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Name</th>
            <th>Part</th>
            <th>Pins</th>
            </tr>
        </thead>
        <tbody>
        {parts.map(prt => 
            <tr key={`prt-${prt.id}`}>
            <td><Link to={`/part/${prt.id}`}>{prt.identifier}</Link></td>
            <td>{prt.name}</td>
            <td>{prt.pins}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default BoardPreview;
