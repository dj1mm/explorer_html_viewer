
import React from 'react';

const Icon = ({ state, ...props }) => (
    <span {...props}>
    {{
        'system': (<i style={{margin: '0 5px'}} className="fa fa-globe" />),
        'board': (<i style={{margin: '0 5px'}} className="fa fa-book" />),
        'signal': (<i style={{margin: '0 5px'}} className="fa fa-snapchat-ghost" />),
        'interface': (<i style={{margin: '0 5px'}} className="fa fa-fw fa-folder-o" />),
        'part': (<i style={{margin: '0 5px'}} className="fa fa-paint-brush" />),
        'component': (<i style={{margin: '0 5px'}} className="fa fa-fw fa-folder-open-o" />),
    }[state]}
    </span>
);

export default Icon;
