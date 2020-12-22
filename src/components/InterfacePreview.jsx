
import React, { useState, useEffect } from 'react';
import { Tab, Button, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function InterfacePreview ({ node, models, onUpdate }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [other, setOther] = useState(undefined);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a board. If so, do these
        if (node === null) return;
        if (node.kind !== 'interface') return;

        setName(node.name);
        setBoard(models.models[node.parent]);

        let othr = models.models[node.other];
        if (othr === undefined) {
            setOther(undefined);
        } else {
            setOther({ id: othr.id, name: othr.name, board: models.models[othr.parent].refdes });
        }

        let i = 0;
        let newPins = node.pins.map(id => {
            const pin = models.models[id];
            const info = models.models[pin.pininfo];
            const com = models.models[pin.parent];
            const sig = models.models[pin.signal];

            const othr_itf = models.models[node.other];

            if (othr_itf === undefined) {
                return { index: i++, 
                         signalId: sig.id,           signal: sig.name,
                         componentId: com.id,        component: `${com.refdes}.${info.number}`,
                         othrSignalId: undefined,    othr_signal: undefined,
                         othrComponentId: undefined, othr_component: undefined};
            }

            const othr_pin = models.models[othr_itf.pins[i]];
            const othr_info = models.models[othr_pin.pininfo];
            const othr_com = models.models[othr_pin.parent];
            const othr_sig = models.models[othr_pin.signal];
            const othr_brd = models.models[othr_com.parent];

            return { index: i++, 
                signalId: sig.id,             signal: sig.name,
                componentId: com.id,          component: `${com.refdes}.${info.number}`,
                othrSignalId: othr_sig.id,    othr_signal: `${othr_brd.refdes}.${othr_sig.name}`,
                othrComponentId: othr_com.id, othr_component: `${othr_brd.refdes}.${com.refdes}.${othr_info.number}`};

        });
        setPins(newPins);

    }, [node, models]);

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="interface-preview">
        <Tab  eventKey="summary" title="Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="interface-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="interface-parent">
                    <Form.Label column sm="2">Parent</Form.Label>
                    <Col sm="10">
                        {board !== undefined && <Button onClick={() => onUpdate(board.id)}>Board {board.refdes}</Button>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="interface-other">
                    <Form.Label column sm="2">Other</Form.Label>
                    <Col sm="10">
                        {other !== undefined && <Button onClick={() => onUpdate(other.id)}>Interface {other.board}.{other.name}</Button>}
                    </Col>
                </Form.Group>
            </Form>
        </Tab>
        <Tab eventKey="pins" title={"Pins ("+ pins.length +")"}>
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Signal</th>
            <th>Pin</th>
            <th>Index</th>
            <th>Other Pin</th>
            <th>Other Signal</th>
            </tr>
        </thead>
        <tbody>
        {pins.map(pin => 
            <tr>
            <td><Button style={{ padding: 0}} onClick={() => onUpdate(pin.signalId)} variant="link">{pin.signal}</Button></td>
            <td><Button style={{ padding: 0}} onClick={() => onUpdate(pin.componentId)} variant="link">{pin.component}</Button></td>
            <td>{pin.index}</td>
            <td><Button style={{ padding: 0}} onClick={() => onUpdate(pin.othrSignalId)} variant="link">{pin.othr_component !== undefined && pin.othr_component}</Button></td>
            <td><Button style={{ padding: 0}} onClick={() => onUpdate(pin.othrComponentId)} variant="link">{pin.othr_signal !== undefined && pin.othr_signal}</Button></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default InterfacePreview;
