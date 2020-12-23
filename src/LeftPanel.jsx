import React, { useRef, useState } from 'react';
import Tree from './Tree';

import debounce from 'lodash.debounce';
import AutoSizer from 'react-virtualized-auto-sizer';
import { convertExplorerModelToTree } from './tree-generator';
import { useEffect } from 'react';

function LeftPanel({ model }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        setData(convertExplorerModelToTree(model, model.models['root']));
    }, []);

    const treeRef = useRef(null);

    return (
        <>
            <div className="row">
            <div className="col">
                <div className="form-group">
                    <label htmlFor="text-filter">Filter</label>
                    <input
                        ref={node => {}}
                        type="text"
                        className="form-control"
                        name="text-filter"
                        placeholder="Type to filter by text"
                        onKeyUp={(event) => {
                            event.persist();

                            const { keyCode } = event;
                            const BACKSPACE = 8;
                            const DELETE = 46;
                            const ENTER = 13;
                            const CTRL = 17;

                            if ([BACKSPACE, DELETE, ENTER, CTRL].includes(keyCode)) {
                                this.filter();
                            }
                        }}
                        onKeyPress={debounce((event) => {}, 250)}
                    />
                </div>
            </div>
            </div>
            <div className="row flex-fill d-flex">
            <div className="col">
            <AutoSizer disableWidth>
            {({height}) => (
                <Tree
                    data={data}
                    ref={treeRef}
                    onUpdate={() => {}}
                    height={height<100?100:height>1000?1000:height}
                />
            )}
            </AutoSizer>
            </div>
            </div>
        </>
    );


};

export default LeftPanel;
