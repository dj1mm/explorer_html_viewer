
export const convertExplorerModelToTree = (model, index = null) => {
    if (index == null) {
        return convertExplorerModelToTree(model, model.root);
    }

    const m = model.models[index];
    if (m.kind === "system") {
        let boards = [];
        model.models[model.root].boards.forEach(element => {
            boards.push(convertExplorerModelToTree(model, element));
        });
        return {'id': 'root', 'name': m.name, children: [
            {'id': 'root-boards', 'name': 'Boards', children: boards}
        ]};
    }
    
    if (m.kind === "board") {
        let components = [];
        m.components.forEach(element => {
            components.push(convertExplorerModelToTree(model, element));
        });
        let signals = [];
        m.signals.forEach(element => {
            signals.push(convertExplorerModelToTree(model, element));
        });
        let interfaces = [];
        m.interfaces.forEach(element => {
            interfaces.push(convertExplorerModelToTree(model, element));
        });
        let parts = [];
        m.parts.forEach(element => {
            parts.push(convertExplorerModelToTree(model, element));
        });
        return {'id': m.id, 'name': m.refdes, 'children':[
            {'id': m.id + '-components', 'name': 'Components', children: components},
            {'id': m.id + '-signals', 'name': 'Signals', children: signals},
            {'id': m.id + '-interfaces', 'name': 'Interfaces', children: interfaces},
            {'id': m.id + '-parts', 'name': 'Parts', children: parts},
        ]};
    }

    if (m.kind === "interface") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    if (m.kind === "part") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    if (m.kind === "component") {
        return {'id': m.id, 'name': m.refdes, 'children':[]};
    }

    if (m.kind === "signal") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    return []
}
