import React, { useRef, useState } from 'react';
import Tree from './Tree';

import AutoSizer from 'react-virtualized-auto-sizer';
import { convertExplorerModelToTree } from './tree-generator';
import { useEffect } from 'react';

function LeftPanel({ model }) {

    const [data, setData] = useState(null);
    const [filterText, setFilterText] = useState('');

    const treeRef = useRef(null);

    useEffect((keyword) => {

        if (!treeRef.current) {
            return;
        }

        const { tree } = treeRef.current;

        if (!tree) {
            return;
        }

        keyword = keyword || filterText || '';

        if (!keyword) {
            tree.unfilter();
            return;
        }

        tree.filter(keyword, {
            filterPath: 'name',
            caseSensitive: false,
            exactMatch: false,
            includeAncestors: true,
            includeDescendants: true
        });
    }, [filterText])

    useEffect(() => {
        setData(convertExplorerModelToTree(model, model.models['root']));
    }, [model]);

    return (
        <>
            <div className="row">
            <div className="col">
                <div className="form-group">
                    <label htmlFor="text-filter">Filter</label>
                    <input
                        type="text"
                        className="form-control"
                        name="text-filter"
                        placeholder="Type to filter by text"
                        value={filterText}
                        onChange={(event) => { setFilterText(event.target.value) }}
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
