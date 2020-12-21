
import React from 'react';

const Icon = ({ state, ...props }) => (
    <span {...props}>
    {{
        'system': (<i className="fa fa-globe" />),
        'board': (<i className="fa fa-book" />),
        'signal': (<i className="fa fa-snapchat-ghost" />),
        'interface': (<i className="fa fa-fw fa-folder-o" />),
        'part': (<i className="fa fa-paint-brush" />),
        'component': (<i className="fa fa-fw fa-folder-open-o" />),
    }[state]}
    </span>
);

export default Icon;
