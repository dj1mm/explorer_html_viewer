import React from 'react';
import styled from 'styled-components';

const defaultRowHeight: number = 30;

const TreeNode = styled.div`
    cursor: default;
    position: relative;
    line-height: ${defaultRowHeight - 2}px;
    background: ${(props: any) => props.selected ? '#deecfd' : 'transparent'};
    border: ${(props: any) => props.selected ? '1px solid #06c' : '1px solid transparent'};
    padding-left: ${(props: any) => props.depth * 18}px;

    .dropdown {
        visibility: hidden;
    }

    &:hover {
        background: #f2fdff;

        .dropdown {
            visibility: inherit;
        }
    }
`;

export default TreeNode;
