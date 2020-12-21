import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Breadcrumb } from 'react-bootstrap'

import SystemPreview from './components/SystemPreview'
import BoardPreview from './components/BoardPreview'
import SignalPreview from './components/SignalPreview'
import PartPreview from './components/PartPreview'
import ComponentPreview from './components/ComponentPreview'
import InterfacePreview from './components/InterfacePreview'

function Preview ({ node, models }) {

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {

        let newBreadcrumbs = [];
        function determineCrumb(node) {
            if (node === null) return;
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
        };

        determineCrumb(node);
        setBreadcrumbs(newBreadcrumbs.reverse());

    }, [node, models]);

    if (!node) {
        return null;
    }

    return (
        <>
        <Breadcrumb>
            {breadcrumbs.map((crumb, i) =>
                <Breadcrumb.Item key={`breadcrumb-${i}`}>{crumb}</Breadcrumb.Item>
            )}
        </Breadcrumb>
        <Tabs activeKey={node.kind} id="uncontrolled-tab-example">
        <Tab eventKey="system" title="System">
            <SystemPreview node={node} models={models} />
        </Tab>
        <Tab  eventKey="board" title="Board">
            <BoardPreview node={node} models={models} />
        </Tab>
        <Tab  eventKey="signal" title="Signal">
            <SignalPreview node={node} models={models} />
        </Tab>
        <Tab  eventKey="component" title="Component">
            <ComponentPreview node={node} models={models} />
        </Tab>
        <Tab  eventKey="part" title="Part">
            <PartPreview node={node} models={models} />
        </Tab>
        <Tab  eventKey="interface" title="Interface">
            <InterfacePreview node={node} models={models} />
        </Tab>
        </Tabs>
        </>
    );


};

export default Preview;
