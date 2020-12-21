import React from 'react';
import { Tab, Tabs } from 'react-bootstrap'

import SystemPreview from './components/SystemPreview'
import BoardPreview from './components/BoardPreview'
import SignalPreview from './components/SignalPreview'
import PartPreview from './components/PartPreview'
import ComponentPreview from './components/ComponentPreview'
import InterfacePreview from './components/InterfacePreview'

function Preview ({ node, models }) {

    if (!node) {
        return null;
    }

    return (
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
    );


};

export default Preview;
