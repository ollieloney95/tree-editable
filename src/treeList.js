import React, {useState, useRef, useEffect} from 'react';
import './treeList.css'
import { LeafIcon as DefaultLeafIcon,
         OpenIcon as DefaultOpenIcon,
         CloseIcon as DefaultCloseIcon,
         Divider as DefaultDivider
    } from './defaults'
import { inputToNode, Node, onDrop, hovering } from './node'
import PropTypes from 'prop-types';


function Icon(props){
    let { LeafIcon, OpenIcon, CloseIcon } = props

    LeafIcon = LeafIcon || DefaultLeafIcon
    OpenIcon = OpenIcon || DefaultOpenIcon
    CloseIcon = CloseIcon || DefaultCloseIcon

    let isLeaf = props.isLeaf
    let open = props.open
    if(isLeaf){
        return <div {...props}><LeafIcon /></div>
    }
    if(open){
        return <div {...props}><CloseIcon /></div>
    }
    return <div {...props}><OpenIcon /></div>
}

Icon.propTypes = {
    LeafIcon: PropTypes.element,
    OpenIcon: PropTypes.element,
    CloseIcon: PropTypes.element
}

export default function TreeList(props) {

      const [nodes, setNodes] = React.useState(null);
      useEffect(() => setNodes(inputToNode('root', props.input, null)), []);
      let onClick = props.onClick || (() => null)
      let onUpdate = props.onUpdate || (() => null)

      const onDragOver =  (node) => (e) =>{
        if(!props.editable){return}
        let dragPos = [e.clientX, e.clientY]
        let [newNodes, changed] = nodes.updateHovering(dragPos)
        if(changed){ setNodes(newNodes) }
      }

      const onDragEnd =  (node) => (e) =>{
          if(!props.editable){return}
          e.stopPropagation()
          let n = nodes.unhoverAll(onDrop(nodes))
          node.dragging = false
          onUpdate(n.getOutput())
          setNodes(n)
      }

      const onDragStart =  (node) => (e) =>{
           if(!props.editable){return}
           e.stopPropagation()
           node.dragging = true
           setNodes(nodes)
      }

      return (
        <div class="outerBox">
            {nodes && <DisplayNode node={nodes} onDragOver={onDragOver} onDragEnd={onDragEnd} onDragStart={onDragStart} onClick={onClick} LeafIcon={props.LeafIcon} OpenIcon={props.OpenIcon} CloseIcon={props.CloseIcon} Divider={props.Divider} editable={props.editable}/>}
        </div>
      );
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

//const DisplayNode = React.memo(function DisplayNode(props) {
function DisplayNode(props) {

    const forceUpdate = useForceUpdate();
    let {node, onDragOver, onDragEnd, onClick, onDragStart, LeafIcon, OpenIcon, CloseIcon, Divider, editable} = props
    let children = (<ul class='list'>{node.children.map((child, i) => <DisplayNode node={child} onDragOver={onDragOver} onDragEnd={onDragEnd} onDragStart={onDragStart} onClick={onClick} LeafIcon={LeafIcon} OpenIcon={OpenIcon} CloseIcon={CloseIcon} editable={editable}/> )}</ul>)
    let openNoDrag = node.open && !node.dragging
    Divider = Divider || DefaultDivider
    const ref = useRef();

    useEffect(() => {
        // TODO - only update position on click change
        ref.current && node.setPosition(ref.current.getBoundingClientRect())
        ref.current && !node.height && node.setHeight(ref.current.getBoundingClientRect())
    });
    return (
       <div
            style={{backgroundColor:node.dragging?'rgba(255, 0, 0, 0.1)':(node.hovering === hovering.IN?'rgba(3, 248, 252, 0.1)':null)}}
            ref={ref}
            draggable={props.editable}
            onDragStart={onDragStart(node)}
            onDragOver={onDragOver(node)}
            onDragEnd={onDragEnd(node)}
            onClick={onClick}
       >
         <div style={{height:(node.hovering === hovering.ABOVE) ? '4px' : '4px', backgroundColor:(node.hovering === hovering.ABOVE) ? 'rgba(3, 248, 252, 0.3)' : 'rgba(255, 255, 255, 0)'}}></div>
          <li class='list-item' button key={node.name}
                  onClick={(e)=>{node.open = !node.open ; forceUpdate()}}>
              <Icon class='item-icon' isLeaf={node.children.length === 0} open={openNoDrag} CloseIcon={CloseIcon} OpenIcon={OpenIcon} LeafIcon={LeafIcon}/>
              <p class='item-text'>{node.name}</p>
          </li>
          <div style={{height:(node.hovering === hovering.ABOVE) ? '4px' : '4px', backgroundColor:(node.hovering === hovering.BELOW) ? 'rgba(3, 248, 252, 0.3)' : 'rgba(255, 255, 255, 0)'}}></div>
            {(openNoDrag && node.children.length>0) ? <Divider />: null}
            {(openNoDrag && node.children.length>0) ? children : null}
            {(openNoDrag && node.children.length>0) ? <Divider />: null}
        </div>
    )
}
//}, (oldProps, newProps) => noChange(oldProps, newProps))


function noChange(oldProps, newProps){
    let hoverDelta = oldProps.node.hovering !== newProps.node.hovering
    let draggingDelta = oldProps.node.dragging !== newProps.node.dragging
    let openDelta = oldProps.node.open !== newProps.node.open
    return(hoverDelta || draggingDelta || openDelta)
}



Icon.propTypes = {
    // text input
    input: PropTypes.object.isRequired,

    // icons
    LeafIcon: PropTypes.element,
    OpenIcon: PropTypes.element,
    CloseIcon: PropTypes.element,
    Divider: PropTypes.element,

    // permissions
    editable: PropTypes.bool,

    // events
    onClick: PropTypes.func,
    onUpdate: PropTypes.func,

}
