export const generate = (size = 1000) => {
    const data = [];
    const source = '{"id":"<root>","name":"<root>","props":{"droppable":true},"children":[{"id":"alpha","name":"Alpha","props":{"droppable":true}},{"id":"bravo","name":"Bravo","props":{"droppable":true},"children":[{"id":"charlie","name":"Charlie","props":{"droppable":true},"children":[{"id":"delta","name":"Delta","props":{"droppable":true},"children":[{"id":"echo","name":"Echo","props":{"droppable":true}},{"id":"foxtrot","name":"Foxtrot","props":{"droppable":true}}]},{"id":"golf","name":"Golf","props":{"droppable":true}}]},{"id":"hotel","name":"Hotel","props":{"droppable":true},"children":[{"id":"india","name":"India","props":{"droppable":true},"children":[{"id":"juliet","name":"Juliet","props":{"droppable":true}}]}]},{"id":"kilo","name":"Kilo","loadOnDemand":true,"props":{"droppable":true}}]}]}';
    for (let i = 0; i < size; ++i) {
        // data.push(JSON.parse(source.replace(/"(id|name)":"([^"]*)"/g, '"$1": "$2.' + i + '"')));
    }
    return data;
};

export const convertExplorerModelToTree = (model, index = null) => {
    if (index == null) {
        let boards = [];
        console.log(model.models[model.root].boards)
        model.models[model.root].boards.forEach(element => {
            boards.push(convertExplorerModelToTree(model, element));
        });
        return {'id': 'root', 'name': 'asd', children: [
            {'id': 'root-boards', 'name': 'Boards', children: boards}
        ]};
    }

    const m = model.models[index];
    if (m.kind == "board") {
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
        return {'id': m.id, 'name': m.name, 'children':[
            {'id': m.id + '-components', 'name': 'Components', children: components},
            {'id': m.id + '-signals', 'name': 'Signals', children: signals},
            {'id': m.id + '-interfaces', 'name': 'Interfaces', children: interfaces},
            {'id': m.id + '-parts', 'name': 'Parts', children: parts},
        ]};
    }

    if (m.kind == "interface") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    if (m.kind == "part") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    if (m.kind == "component") {
        return {'id': m.id, 'name': m.refdes, 'children':[]};
    }

    if (m.kind == "signal") {
        return {'id': m.id, 'name': m.name, 'children':[]};
    }

    return []
}
