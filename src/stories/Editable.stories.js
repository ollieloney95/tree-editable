import React, { useState } from 'react';
import TreeList from 'treeList'
import { inputTree, inputList } from './UserComponents'

// material ui
import Checkbox from '@material-ui/core/Checkbox';


export default {
  title: 'Editable',
};


function Editable_(props) {
    const [checked, setChecked] = useState(false)
    return(
        <div>
            <b>Editable</b>
            <Checkbox
                    checked={checked}
                    onChange={()=>setChecked(!checked)}
                    label="editable"
                  />
            <p>With the editable checkbox ticked, try dragging and dropping tree element onto, above or below others.</p>
            <TreeList input={inputTree} editable={checked} />
        </div>
    )
}

export const Editable = () => (
    <div>
        <h2>toggle editable</h2>
        <Editable_ />
    </div>
);






