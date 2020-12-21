
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
        return {'id': 'root', 'kind': 'system', 'name': m.name, children: [
            {'id': 'root-boards', 'kind': 'misc', 'name': `Boards (${boards.length})`, children: boards}
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
        return {'id': m.id, 'kind': 'board', 'name': m.refdes, 'children':[
            {'id': m.id + '-components', 'kind': 'misc', 'name': `Components (${components.length})`, children: components},
            {'id': m.id + '-signals', 'kind': 'misc', 'name': `Signals (${signals.length})`, children: signals},
            {'id': m.id + '-interfaces', 'kind': 'misc', 'name': `Interfaces (${interfaces.length})`, children: interfaces},
            {'id': m.id + '-parts', 'kind': 'misc', 'name': `Parts (${parts.length})`, children: parts},
        ]};
    }

    if (m.kind === "interface") {
        return {'id': m.id, 'kind': 'interface', 'name': m.name, 'children':[]};
    }

    if (m.kind === "part") {
        return {'id': m.id, 'kind': 'part', 'name': m.name, 'children':[]};
    }

    if (m.kind === "component") {
        return {'id': m.id, 'kind': 'component', 'name': m.refdes, 'children':[]};
    }

    if (m.kind === "signal") {
        return {'id': m.id, 'kind': 'signal', 'name': m.name, 'children':[]};
    }

    return []
}
