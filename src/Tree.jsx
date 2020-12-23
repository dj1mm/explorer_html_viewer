import Checkbox from '@trendmicro/react-checkbox';
import React, { forwardRef, useRef } from 'react';
import InfiniteTree from 'react-infinite-tree';
import TreeNode from './components/TreeNode';
import Toggler from './components/Toggler';
import Icon from './components/Icon';
import Clickable from './components/Clickable';
import Text from './components/Text';
import { useEffect } from 'react';
import { useImperativeHandle } from 'react';

import { Link } from "react-router-dom";

function renderTreeNode(node, tree, toggleState, onUpdate) {
    return (
    <TreeNode
        selected={node.state.selected}
        depth={node.state.depth}
        onClick={(event) => {
            tree.selectNode(node);
        }}
    >
        <Toggler
            state={toggleState}
            onClick={(event) => {
                event.stopPropagation();

                if (toggleState === 'closed') {
                    tree.openNode(node);
                } else if (toggleState === 'opened') {
                    tree.closeNode(node);
                }
            }}
        />
        { (node.kind === undefined || node.kind !== 'misc') &&
        <Checkbox
            checked={node.state.checked}
            indeterminate={node.state.indeterminate}
            onClick={(event) => {
                event.stopPropagation();
            }}
            onChange={(event) => {
                tree.checkNode(node);
                onUpdate(node.id);
            }}
        />
        }
        { (node.kind === undefined || node.kind !== 'misc') ?
        <Link style={{color: 'black'}} to={`/${node.kind}/${node.id}`}><Icon state={node.kind} />{node.name}</Link>
            :
        <Clickable><Text>{node.name}</Text></Clickable>
        }
    </TreeNode>)
};

const Tree = forwardRef(({ height, onUpdate, data }, ref) => {

    const treeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        tree: treeRef.current.tree
    }))

    // when loading the tree for the first time, always select the 1st element
    useEffect(() => {
        const { tree } = treeRef.current;
        tree.selectNode(tree.getChildNodes()[0])
    }, []);

    return (
        <InfiniteTree
            ref={treeRef}
            style={{ border: '1px solid #ccc' }}
            autoOpen
            selectable
            tabIndex={0}
            data={data}
            width="100%"
            height={height}
            rowHeight={30}
            shouldLoadNodes={false}
            loadNodes={null}
            shouldSelectNode={(node) => { // Defaults to null
                const { tree } = treeRef.current;

                if (!node || (node === tree.getSelectedNode())) {
                    return false; // Prevent from deselecting the current node
                }
                return true;
            }}
            onKeyUp={(event) => {
                console.log('onKeyUp', event.target);
            }}
            onKeyDown={(event) => {
                const { tree } = treeRef.current;

                console.log('onKeyDown', event.target);

                event.preventDefault();

                const node = tree.getSelectedNode();
                const nodeIndex = tree.getSelectedIndex();

                if (event.keyCode === 37) { // Left
                    tree.closeNode(node);
                } else if (event.keyCode === 38) { // Up
                    const prevNode = tree.nodes[nodeIndex - 1] || node;
                    tree.selectNode(prevNode);
                } else if (event.keyCode === 39) { // Right
                    tree.openNode(node);
                } else if (event.keyCode === 40) { // Down
                    const nextNode = tree.nodes[nodeIndex + 1] || node;
                    tree.selectNode(nextNode);
                }
            }}
            onScroll={(scrollOffset, event) => {
                const child = event.target.firstChild;
                const treeViewportHeight = 400;
                console.log((scrollOffset / (child.scrollHeight - treeViewportHeight) * 100).toFixed(2));
                console.log('onScroll', scrollOffset, event);
            }}
            onContentWillUpdate={() => {
                console.log('onContentWillUpdate');
            }}
            onContentDidUpdate={() => {
                const { tree } = treeRef.current;

                console.log('onContentDidUpdate');
                const node = tree.getSelectedNode();
                onUpdate(node == null? node: node.id);
            }}
            onOpenNode={(node) => {
                console.log('onOpenNode:', node);
            }}
            onCloseNode={(node) => {
                console.log('onCloseNode:', node);
            }}
            onSelectNode={(node) => {
                console.log('onSelectNode:', node);
                onUpdate(node.id);
            }}
            onWillOpenNode={(node) => {
                console.log('onWillOpenNode:', node);
            }}
            onWillCloseNode={(node) => {
                console.log('onWillCloseNode:', node);
            }}
            onWillSelectNode={(node) => {
                console.log('onWillSelectNode:', node);
            }}
        >
            {({ node, tree }) => {
                const hasChildren = node.hasChildren();

                let toggleState = '';
                if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                    toggleState = 'closed';
                }
                if (hasChildren && node.state.open) {
                    toggleState = 'opened';
                }

                return renderTreeNode(node, tree, toggleState, onUpdate);
            }}
        </InfiniteTree>
    );
});

export default Tree;
