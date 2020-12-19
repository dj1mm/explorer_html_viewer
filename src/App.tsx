import React from 'react';
import Dropzone from 'react-dropzone';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/Appasd.tsx</code> and save to reload.</p>
        <Dropzone onDrop=
          {(acceptedFiles) => 
            acceptedFiles.forEach((file) => {
              const reader = new FileReader();
        
              reader.onabort = () => console.log('file reading was aborted');
              reader.onerror = () => console.log('file reading has failed');
              reader.onload = () => {
              // Do whatever you want with the file contents
              const binaryStr = reader.result;
              if (typeof binaryStr == 'string')
              console.log(JSON.parse(binaryStr)['4360229008']);
            };
            reader.readAsText(file);
        
            })
          }>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>

  );
}

export default App;
