# tree-editable

This package is a light-weight customizable tree component.
The tree nodes can be editable and draggable.

## Installation

    npm install tree-editable



## Usage
### Example input data

    const inputTree = {
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

### Example
    import Tree from 'tree-editable'

    <TreeList input={inputTree} />
