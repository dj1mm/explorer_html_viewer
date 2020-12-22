
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function SystemPreview ({ node, models, onUpdate }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [refdes, setRefdes] = useState('unrefdes');
    const [interfaces, setInterfaces] = useState([]);
    const [signals, setSignals] = useState([]);
    const [parts, setParts] = useState([]);
    const [components, setComponents] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node === null) return;
        if (node.kind !== 'board') return;
        setName(node.name);
        setRefdes(node.refdes);

        let newInterfaces = node.interfaces.map(id => {
            const itf = models.models[id];
            return { id: itf.id, name: itf.name, pins: itf.pins.length };
        });
        setInterfaces(newInterfaces);

        let newSignals = node.signals.map(id => {
            const sig = models.models[id];
            return { id: sig.id, name: sig.name, pins: sig.pins.length };
        });
        setSignals(newSignals);

        let newComponents = node.components.map(id => {
            const com = models.models[id];
            return { id: com.id, refdes: com.refdes, pins: com.pins.length };
        });
        setComponents(newComponents);

        let newParts = node.parts.map(id => {
            const prt = models.models[id];
            return { id: prt.id, name: prt.name, identifier: prt.identifier, pins: prt.pins.length };
        });
        setParts(newParts);
    }, [node, models]);

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
            <tr>
            <td><btn style={{padding:0}} class="btn btn-link" onClick={() => onUpdate(itf.id)}>{itf.name}</btn></td>
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
            <tr>
            <td><btn style={{padding:0}} class="btn btn-link" onClick={() => onUpdate(sig.id)}>{sig.name}</btn></td>
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
            <tr>
            <td><btn style={{padding:0}} class="btn btn-link" onClick={() => onUpdate(com.id)}>{com.refdes}</btn></td>
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
            <tr>
            <td><btn style={{padding:0}} class="btn btn-link" onClick={() => onUpdate(prt.id)}>{prt.identifier}</btn></td>
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

export default SystemPreview;
