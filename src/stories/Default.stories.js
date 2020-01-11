import React from 'react';
import TreeList from 'treeList'
import { inputTree, inputList } from './UserComponents'


export default {
  title: 'Default',
};


export const defaultTree = () => (
    <div>
        <h2>default tree</h2>
        <TreeList input={inputTree} />
    </div>
);


export const defaultEditableTree = () => (
    <div>
        <h2>editable tree</h2>
        <TreeList input={inputTree} editable/>
    </div>
);


export const defaultList = () => (
    <div>
        <h2>default list</h2>
        <TreeList input={inputList} editable flat />
    </div>
);