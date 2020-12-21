import React from 'react';
import { Tab, Tabs, Form, Row, Col, Button } from 'react-bootstrap'

const Preview = (props) => {
    const { node, models, onUpdate } = props;

    if (!node) {
        return null;
    }

    if (node.kind === 'system') {
        return (
            <Tabs variant="pills" activeKey="system" id="uncontrolled-tab-example">
            <Tab eventKey="system" title="System Properties">
                <Form>
                    <Form.Group as={Row} controlId="system-name">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.name} />
                        </Col>
                    </Form.Group>
                </Form>
            </Tab>
            </Tabs>
        );
    }

    if (node.kind === 'board') {
        return (
            <Tabs variant="pills" activeKey="board" id="uncontrolled-tab-example">
                <Tab eventKey="board" title="Board Properties">
                <Form>
                    <Form.Group as={Row} controlId="board-refdes">
                        <Form.Label column sm="2">Reference</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.refdes} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="board-name">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.name} />
                        </Col>
                    </Form.Group>
                </Form>
                </Tab>
            </Tabs>
        );
    }

    if (node.kind === 'signal') {
        return (
            <Tabs variant="pills" activeKey="signal" id="uncontrolled-tab-example">
                <Tab eventKey="signal" title="Signal Properties">
                <Form>
                    <Form.Group as={Row} controlId="signal-name">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="signal-parent">
                        <Form.Label column sm="2">Parent</Form.Label>
                        <Col sm="10">
                            <Button onClick={() => onUpdate(node.parent)}>Board {models.models[node.parent].refdes}</Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Tab>
            </Tabs>
        );
    }

    if (node.kind === 'component') {
        return (
            <Tabs variant="pills" activeKey="component" id="uncontrolled-tab-example">
                <Tab eventKey="component" title="Component Properties">
                <Form>
                    <Form.Group as={Row} controlId="component-name">
                        <Form.Label column sm="2">Refdes</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.refdes} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="component-parent">
                        <Form.Label column sm="2">Parent</Form.Label>
                        <Col sm="10">
                        <Button onClick={() => onUpdate(node.parent)}>Board {models.models[node.parent].refdes}</Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Tab>
            </Tabs>
        );
    }

    if (node.kind === 'part') {
        return (
            <Tabs variant="pills" activeKey="part" id="uncontrolled-tab-example">
                <Tab eventKey="part" title="Part Properties">
                <Form>
                    <Form.Group as={Row} controlId="part-name">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="part-identifier">
                        <Form.Label column sm="2">Identifier</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.identifier} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="part-parent">
                        <Form.Label column sm="2">Parent</Form.Label>
                        <Col sm="10">
                        <Button onClick={() => onUpdate(node.parent)}>Board {models.models[node.parent].refdes}</Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Tab>
            </Tabs>
        );
    }

    if (node.kind === 'interface') {
        return (
            <Tabs variant="pills" activeKey="interface" id="uncontrolled-tab-example">
                <Tab eventKey="interface" title="Interface Properties">
                <Form>
                    <Form.Group as={Row} controlId="interface-name">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control disabled value={node.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="interface-parent">
                        <Form.Label column sm="2">Parent</Form.Label>
                        <Col sm="10">
                        <Button onClick={() => onUpdate(node.parent)}>Board {models.models[node.parent].refdes}</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="interface-parent">
                        <Form.Label column sm="2">Other</Form.Label>
                        <Col sm="10">
                            { node.other != null && <Button onClick={() => onUpdate(node.other)}>Interface {models.models[node.other].name}</Button>}
                        </Col>
                    </Form.Group>
                </Form>
                </Tab>
            </Tabs>
        );
    }


};

export default Preview;
