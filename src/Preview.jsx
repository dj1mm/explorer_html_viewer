import React, { useState, useEffect } from 'react';

import SystemPreview from './components/SystemPreview'
import BoardPreview from './components/BoardPreview'
import SignalPreview from './components/SignalPreview'
import PartPreview from './components/PartPreview'
import ComponentPreview from './components/ComponentPreview'
import InterfacePreview from './components/InterfacePreview'
import {
  Switch,
  Route
} from "react-router-dom";

function Preview ({ models }) {

    return (
        <Switch>
        <Route path='/system/:id'>
            <SystemPreview models={models} />
        </Route>
        <Route path='/board/:id'>
            <BoardPreview models={models} />
        </Route>
        <Route path='/signal/:id'>
            <SignalPreview models={models} />
        </Route>
        <Route path='/component/:id'>
            <ComponentPreview models={models} />
        </Route>
        <Route path='/interface/:id'>
            <InterfacePreview models={models} />
        </Route>
        <Route path='/part/:id'>
            <PartPreview models={models} />
        </Route>
        <Route>
            <p>Nothing to see here!</p>
        </Route>
        </Switch>
    )

};

export default Preview;
