import React, { PureComponent } from 'react';
import Tree from './Tree';
import Preview from './Preview';
import debounce from 'lodash.debounce';
import { convertExplorerModelToTree } from './tree-generator';
import { Button, Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

class App extends PureComponent {
    state = {
        show: false,
        models: {},
        data: [],
        node: null,
        filterText: '',
        caseSensitive: false,
        exactMatch: false,
        includeAncestors: true,
        includeDescendants: true
    };

    textFilter = null;

    treeRef = React.createRef();

    changeCheckedState = (key) => (event) => {
        const checked = event.target.checked;

        this.setState({
            [key]: checked
        }, () => {
            this.filter();
        });
    };

    onUpdate = (node) => {
        let m = null;
        if (node == null) {
            return;
        }
        if (node.id === 'root') {
            m = this.state.models.models[this.state.models.root];
        } else {
            m = this.state.models.models[node.id];
        }

        if (m === undefined) return;
        this.setState({ node: m });
    };

    filter = (keyword) => {
        const { tree } = this.treeRef.current;

        if (!tree) {
            return;
        }

        keyword = keyword || this.textFilter.value || '';

        if (!keyword) {
            tree.unfilter();
            return;
        }

        const {
            caseSensitive,
            exactMatch,
            includeAncestors,
            includeDescendants
        } = this.state;

        tree.filter(keyword, {
            filterPath: 'name',
            caseSensitive: caseSensitive,
            exactMatch: exactMatch,
            includeAncestors: includeAncestors,
            includeDescendants: includeDescendants
        });
    };

    render() {
        return (
            <div className="container-fluid">
            <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload JSON</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Dropzone onDrop={(acceptedFiles) => { acceptedFiles.forEach((file) => {
                    const reader = new FileReader()

                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onload = () => {
                        let models = JSON.parse(reader.result);
                        this.setState({show: false})
                        this.setState({ models: models })
                        this.setState({ data: []})

                        const { tree } = this.treeRef.current;
                        tree.scrollTop(0);
                        let node = tree.getNodeById('root');
                        console.log(tree, node)
                        if (node != null)
                        {
                            tree.removeNode(node)
                        }
                        tree.appendChildNode(convertExplorerModelToTree(models))
                    }
                    reader.readAsText(file);
                    })
                }}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.setState({ show: false })}>Close</Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
            <div className="col">
                <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="text-filter">Filter</label>
                        <input
                            ref={node => {
                                this.textFilter = node;
                            }}
                            type="text"
                            className="form-control"
                            name="text-filter"
                            placeholder="Type to filter by text"
                            onKeyUp={(event) => {
                                event.persist();

                                const { keyCode } = event;
                                const BACKSPACE = 8;
                                const DELETE = 46;
                                const ENTER = 13;

                                if ([BACKSPACE, DELETE, ENTER].includes(keyCode)) {
                                    this.filter();
                                }
                            }}
                            onKeyPress={debounce((event) => {
                                this.filter();
                            }, 250)}
                        />
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col">
                    <div className="form-group">
                    <Button variant="primary" onClick={() => this.setState({ show: true })}>
                        Upload
                    </Button>
                    </div>
                </div>
                </div>
                <Tree
                    data={this.state.data}
                    ref={this.treeRef}
                    onUpdate={this.onUpdate}
                />
            </div>
            <div className="col w-50">
                <Preview node={this.state.node} models={this.state.models} />
            </div>
            </div>
            </div>
        );
    }
}

export default App;
