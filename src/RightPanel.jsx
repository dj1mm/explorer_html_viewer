import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Breadcrumb } from 'react-bootstrap'

import Preview from './Preview'

function RightPanel ({ models }) {

    return (
        <>
        <Preview models={models} />
        </>
    );


};

export default RightPanel;
