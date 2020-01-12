import React from 'react';

export function Divider(props){
    return (<div style={{height:'1px', backgroundColor:'rgba(200, 200, 200, 1.0)'}}></div>)
}

export function OpenIcon(){
    return(<b style={{fontSize:'25px', width:'20px'}}>+</b>)
}

export function CloseIcon(){
    return(<b style={{fontSize:'25px', width:'20px'}}>-</b>)
}

export function LeafIcon(){
    return(<b style={{fontSize:'15px', marginTop:'5px', width:'20px'}}>-</b>)
}