import React from 'react';
import TreeList from 'treeList'
import { inputTree, inputList, OpenIcon, CloseIcon, LeafIcon, Divider } from './UserComponents'

// material ui
import Checkbox from '@material-ui/core/Checkbox';

export default {
  title: 'Custom Icons',
};


export const Folders = () => (
    <div>
        <h2>custom icons</h2>
        <TreeList input={inputTree} OpenIcon={OpenIcon} editable CloseIcon={CloseIcon} LeafIcon={LeafIcon} Divider={Divider} />
    </div>
);

const Checkbox_ = () => (<div style={{verticalAlign:'top'}}><Checkbox fontSize="small" style={{padding:0}}/></div>)

export const Checkboxes = () => (
    <div>
        <h2>custom icons</h2>
        <TreeList input={inputTree} OpenIcon={OpenIcon} editable CloseIcon={CloseIcon} LeafIcon={Checkbox_} Divider={Divider} />
    </div>
);






