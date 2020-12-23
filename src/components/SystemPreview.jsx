
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'
import {
    useParams, Link
} from "react-router-dom";

function SystemPreview ({ models }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [boards, setBoards] = useState([]);
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
        if (node.kind !== 'system') {
            setStatus('node-not-a-system')
            return;
        }

        setStatus('okayy')

        setName(node.name);
        let newBoards = node.boards.map(id => {
            const brd = models[id];
            return { id: brd.id, name: brd.name, refdes: brd.refdes,
                     components: brd.components.length,
                     signals: brd.signals.length,
                     parts: brd.parts.length,
                     interfaces: brd.interfaces.length };
        });
        setBoards(newBoards);
    }, [id, models]);

    if (status !== 'okayy') {
        return <p className="alert alert-danger mt-4">{status}</p>
    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="system-preview">
        <Tab  eventKey="summary" title="System Summary">
            <Form style={{paddingTop: 15}}>
                <Form.Group as={Row} controlId="system-name">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled value={name} />
                    </Col>
                </Form.Group>
            </Form>
        </Tab>
        <Tab eventKey="boards" title="Boards">
        <Table style={{paddingTop: 15}} responsive striped bordered hover>
        <thead>
            <tr>
            <th>Board</th>
            <th>Name</th>
            <th>Components</th>
            <th>Signals</th>
            <th>Parts</th>
            <th>Interfaces</th>
            </tr>
        </thead>
        <tbody>
        {boards.map(board => 
            <tr key={`board-${board.id}`}>
            <td><Link to={`/board/${board.id}`}>{board.refdes}</Link></td>
            <td>{board.name}</td>
            <td>{board.components}</td>
            <td>{board.signals}</td>
            <td>{board.parts}</td>
            <td>{board.interfaces}</td>
            </tr>
        )}
        </tbody>
        </Table>
        </Tab>
        </Tabs>
    );

};

export default SystemPreview;
