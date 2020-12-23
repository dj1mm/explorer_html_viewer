import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Breadcrumb } from 'react-bootstrap'

import Preview from './Preview'

function RightPanel ({ models }) {

    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [key, setKey] = useState('preview');
    const [kind, setKind] = useState(null);

    let node = null;

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
        if (node === null) {
            setKey('preview')
        }
        setKind(node === null? null : 'preview')

    }, [node, models]);

    return (
        <>
        <Breadcrumb>
            {breadcrumbs.map((crumb, i) =>
                <Breadcrumb.Item active={i === breadcrumbs.length-1} key={`breadcrumb-${i}`}>{crumb}</Breadcrumb.Item>
            )}
        </Breadcrumb>
        <Preview models={models} />
        </>
    );


};

export default RightPanel;
