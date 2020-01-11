import React from 'react';








// data -------------------------------------------------------------------------
export const inputTree = {
    'Movies': {
        'Casablanca':{},
        'Avatar':{},
        'Home Alone':{},
    },
    'Books': {
        'Fiction':{
            'Harry Potter':{},
            '1984':{}
        },
        'Non-Fiction':{
            'Homo Deus':{},
            'Homo Sapiens':{}
        }
    },
    'Music':{
        'Beyonce':{},
        'Jay Z':{}
    }
};

export const inputList = ['Casablanca', 'Avatar', 'Home Alone']
// data -------------------------------------------------------------------------









// icons ------------------------------------------------------------------------
import Folder from '@material-ui/icons/Folder';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FolderOpen from '@material-ui/icons/FolderOpen';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import File from '@material-ui/icons/FileCopy';


export const OpenIcon=() => (
    <div style={{width:'50px'}}>
        <KeyboardArrowRight style={{display:'inline-block', verticalAlign:'top'}}/>
        <Folder style={{display:'inline-block', verticalAlign:'top', color:'rgb(102, 212, 255)'}}/>
    </div>)


export const CloseIcon=() => (
    <div style={{width:'50px'}}>
        <KeyboardArrowDown style={{display:'inline-block', verticalAlign:'top'}}/>
        <Folder style={{display:'inline-block', verticalAlign:'top', color:'rgb(194, 238, 255)'}}/>
    </div>)

export const LeafIcon=() => (
    <div style={{width:'50px'}}>
        <File style={{color:'rgb(200, 200, 200)'}}/>
    </div>)

export const Divider=() => (<div></div>)
// icons ------------------------------------------------------------------------