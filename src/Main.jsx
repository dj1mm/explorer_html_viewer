import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Main(model) {
        
    return (
        <div className="row flex-fill d-flex">
        <div className="col d-flex flex-column">
            <LeftPanel model={model} />
        </div>
        <div className="col col-7">
            <RightPanel models={model.models} />
        </div>
        </div>
    );
}

export default Main;
