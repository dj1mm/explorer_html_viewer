import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Breadcrumb } from 'react-bootstrap'

import SystemPreview from './components/SystemPreview'
import BoardPreview from './components/BoardPreview'
import SignalPreview from './components/SignalPreview'
import PartPreview from './components/PartPreview'
import ComponentPreview from './components/ComponentPreview'
import InterfacePreview from './components/InterfacePreview'

function Preview ({ node, models, onUpdate }) {

    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [key, setKey] = useState('hello');
    const [kind, setKind] = useState(null);

    useEffect(() => {

        let newBreadcrumbs = [];
        function determineCrumb(node) {
            if (node === null) {
                newBreadcrumbs.push('Hello');
                return;
            }
            if (node.kind === 'system') {
                newBreadcrumbs.push('System');
                return;
            }
            if (node.kind === 'board') {
                newBreadcrumbs.push(node.refdes);
                return;
            }
            if (node.kind === 'signal') {
                newBreadcrumbs.push(node.name);
                determineCrumb(models.models[node.parent])
                return;
            }
            if (node.kind === 'component') {
                newBreadcrumbs.push(node.refdes);
                determineCrumb(models.models[node.parent])
                return;
            }
            if (node.kind === 'part') {
                newBreadcrumbs.push(node.name);
                determineCrumb(models.models[node.parent])
                return;
            }
            if (node.kind === 'interface') {
                newBreadcrumbs.push(node.name);
                determineCrumb(models.models[node.parent])
                return;
            }
        };

        determineCrumb(node);
        setBreadcrumbs(newBreadcrumbs.reverse());
        setKey(node === null? 'hello' : node.kind)
        setKind(node === null? null : node.kind)

    }, [node, models]);

    return (
        <>
        <Breadcrumb>
            {breadcrumbs.map((crumb, i) =>
                <Breadcrumb.Item active={i === breadcrumbs.length-1} key={`breadcrumb-${i}`}>{crumb}</Breadcrumb.Item>
            )}
        </Breadcrumb>
        <Tabs activeKey={key} onSelect={selected => setKey(selected)} id="preview">
        <Tab disabled={kind !== 'system'} eventKey="system" title="System">
            <SystemPreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind !== 'board'} eventKey="board" title="Board">
            <BoardPreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind !== 'signal'} eventKey="signal" title="Signal">
            <SignalPreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind !== 'component'} eventKey="component" title="Component">
            <ComponentPreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind !== 'part'} eventKey="part" title="Part">
            <PartPreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind !== 'interface'} eventKey="interface" title="Interface">
            <InterfacePreview node={node} models={models} onUpdate={onUpdate} />
        </Tab>
        <Tab disabled={kind === null} eventKey="schematic" title="Schematic">
            <p class="pt-4">TODO: Add schematics here!!</p>
        </Tab>
        </Tabs>
        </>
    );


};

export default Preview;
