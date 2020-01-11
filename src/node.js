import _ from 'lodash'

export const hovering = {
    ABOVE: 'above',
    BELOW: 'below',
    IN: 'in',
    NONE: 'none'
}

export class Node {
  constructor(name, children, parent) {
    this.name = name
    this.children = children
    this.parent = parent
    this.position = null
    this.hovering = hovering.NONE
    this.dragging = false
    this.open = false
  }

  setPosition = (pos) => {
    this.position = [pos.x, pos.y]
  }

  setHeight = (pos) => {
      this.height = pos.height
  }

  getRoot = () => {
    let recurse = (node) => {
        if(!node.parent){return node}
        return recurse(this)
    }
    return recurse(this)
  }

  unhoverAll = () => {
    let root = this.getRoot()
    root = _.clone(root, true);
    let unhover = (node) => {
        node.hovering = hovering.NONE
        for(let child of node.children){
            unhover(child)
        }
    }
    unhover(root)
    return root
  }

  findWithAttribute = (node, lambdaFunction) => {
    if(lambdaFunction(node)){ return node }
    for(let child of node.children){
      let n = this.findWithAttribute(child, lambdaFunction)
      if(n){return n}
    }
  }

  findDraggable = () => {
    let root = this.getRoot()
    return this.findWithAttribute(root, ((x) => x.dragging))
  }

  findHovering = () => {
    let root = this.getRoot()
    return this.findWithAttribute(root, ((x) => x.hovering))
  }

  getOutput = () =>{
      let root = this.getRoot()
      let recurse = (node) => {
          let output = {}
          for(let child of node.children){
              output[child.name] = recurse(child)
          }
          return output
      }
      return recurse(root)
  }

  updateHovering = (dragPos) => {
    let root = _.clone(this.getRoot(), true);
    // given mouse pos and root node,  update hovering state
    // return true if a change occurred
    let change = false
    let checkNode = (node, dragPos) => {
      let oldHovering = node.hovering

      if(node.position && Math.abs((node.height * 1. / 8.) + node.position[1] - dragPos[1]) < node.height / 8.){
          node.hovering = hovering.ABOVE
      }else if(node.position && Math.abs((node.height * 7. / 8.) + node.position[1] - dragPos[1]) < node.height / 8.){
          node.hovering = hovering.BELOW
      }else if(node.position && Math.abs((node.height / 2.) + node.position[1] - dragPos[1]) < node.height / 2.){
          node.hovering = hovering.IN
      }else{
          node.hovering = hovering.NONE
      }
      if(oldHovering !== node.hovering){
          change = true
      }
      for(let child of node.children){
          checkNode(child, dragPos)
      }
    }
    checkNode(root, dragPos)
    return [root, change]
  }

}

export function onDrop(rootNode){
    let node = _.clone(rootNode, true);

    // go through nodes recursively and copy the one that is draggable to variable then delete it
    function findDraggable(node, del){
        if(node.dragging === true){
            return node
        }
        for(let child of node.children){
            let n = findDraggable(child)
            if(n){return n}
        }
    }
    let draggableNode = findDraggable(node)
    if(!draggableNode){return node}


    // go through again and find one with hover - add in draggable there
    function findHovering(node){
        if(node.hovering !== hovering.NONE){
            return node
        }
        for(let child of node.children){
            let n = findHovering(child)
            if(n){return n}
        }
    }

    let hoverNode = findHovering(node)
    if(!hoverNode){return node}

    // if draggable is the same as hoverIn then return
    if(draggableNode.name === hoverNode.name && hoverNode.hovering === hovering.IN){
        return node
    }

    // delete draggable
    let i = draggableNode.parent.children.indexOf(draggableNode)
    draggableNode.parent.children.splice(i, 1)


    if(hoverNode.hovering === hovering.ABOVE){
        let i = hoverNode.parent.children.indexOf(hoverNode)
        hoverNode.parent.children.splice(i, 0, draggableNode);
        draggableNode.parent = hoverNode.parent
    }

    if(hoverNode.hovering === hovering.BELOW){
        let i = hoverNode.parent.children.indexOf(hoverNode) + 1
        hoverNode.parent.children.splice(i, 0, draggableNode);
        draggableNode.parent = hoverNode.parent
    }

    if(hoverNode.hovering === hovering.IN){
        hoverNode.children.splice(0, 0, draggableNode);
        hoverNode.open = true
        draggableNode.parent = hoverNode
    }

    return node
}


export function inputToNode(name, input, parent){
    let root = new Node(name, [], parent)
    for(let name of Object.keys(input)){
        root.children.push(inputToNode(name, input[name], root))
    }
    return root
}