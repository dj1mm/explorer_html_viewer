
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Row, Col, Table } from 'react-bootstrap'

function SystemPreview ({ node, models, onUpdate }) {
    const [key, setKey] = useState('summary');
    const [name, setName] = useState('unnamed');
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        // check model corresponding to node is a system. If so, do these
        if (node === null) return;
        if (node.kind !== 'system') return;
        setName(node.name);
        let newBoards = node.boards.map(id => {
            const brd = models.models[id];
            return { id: brd.id, name: brd.name, refdes: brd.refdes,
                     components: brd.components.length,
                     signals: brd.signals.length,
                     parts: brd.parts.length,
                     interfaces: brd.interfaces.length };
        });
        setBoards(newBoards);
    }, [node, models]);

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
            <tr>
            <td><btn style={{padding:0}} class="btn btn-link" onClick={() => onUpdate(board.id)}>{board.refdes}</btn></td>
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
