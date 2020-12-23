
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function InterfacePreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [board, setBoard] = useState(undefined);
    const [other, setOther] = useState(undefined);
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
        if (node.kind !== 'interface') {
            setStatus('node-not-a-interface')
            return;
        }

        setName(node.name);
        setBoard(models[node.parent]);

        let othr = models[node.other];
        if (othr === undefined) {
            setOther(undefined);
        } else {
            setOther({ id: othr.id, name: othr.name, board: models[othr.parent].refdes });
        }

        let i = 0;
        let newPins = node.pins.map(id => {
            const pin = models[id];
            const info = models[pin.pininfo];
            const com = models[pin.parent];
            const sig = models[pin.signal];

            const othr_itf = models[node.other];

            if (othr_itf === undefined) {
                return { index: i++, 
                         signalId: sig.id,           signal: sig.name,
                         componentId: com.id,        component: `${com.refdes}.${info.number}`,
                         othrSignalId: undefined,    othr_signal: undefined,
                         othrComponentId: undefined, othr_component: undefined};
            }

            const othr_pin = models[othr_itf.pins[i]];
            const othr_info = models[othr_pin.pininfo];
            const othr_com = models[othr_pin.parent];
            const othr_sig = models[othr_pin.signal];
            const othr_brd = models[othr_com.parent];

            return { index: i++, 
                signalId: sig.id,             signal: sig.name,
                componentId: com.id,          component: `${com.refdes}.${info.number}`,
                othrSignalId: othr_sig.id,    othr_signal: `${othr_brd.refdes}.${othr_sig.name}`,
                othrComponentId: othr_com.id, othr_component: `${othr_brd.refdes}.${com.refdes}.${othr_info.number}`};

        });
        setPins(newPins);

    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="interface-preview">
        <Tab  eventKey="summary" title="Interface Summary">
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
                        {board !== undefined && <Link className="btn btn-link" to={`/board/${board.id}`}>Board {board.refdes}</Link>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="interface-other">
                    <Form.Label column sm="2">Other</Form.Label>
                    <Col sm="10">
                        {other !== undefined && <Link className="btn btn-link" to={`/interface/${other.id}`}>Interface {other.board}.{other.name}</Link>}
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
            <tr key={`idx-${pin.index}`}>
            <td><Link to={`/signal/${pin.signalId}`} variant="link">{pin.signal}</Link></td>
            <td><Link to={`/component/${pin.componentId}`} variant="link">{pin.component}</Link></td>
            <td>{pin.index}</td>
            <td><Link to={`/signal/${pin.othrSignalId}`} variant="link">{pin.othr_component !== undefined && pin.othr_component}</Link></td>
            <td><Link to={`/component/${pin.othrComponentId}`} variant="link">{pin.othr_signal !== undefined && pin.othr_signal}</Link></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default InterfacePreview;
