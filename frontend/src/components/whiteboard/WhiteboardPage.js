import BrowserWindow from '../BrowserWindow';
import Whiteboard from './Whiteboard';
import WhiteboardDecoration from './WhiteboardDecoration';

const WhiteboardPage = () => {
  return (
    // <div className="sky-background" style={{ paddingTop: '4rem' }}>
    <div className="w-full h-full d-flex flex-column  align-items-center ">
      <h1 style={{ textAlign: 'center' }}>Whiteboard</h1>

      <BrowserWindow>
        <Whiteboard />
        {/* <WhiteboardDecoration /> */}
        {/* <ReactSketchCanvas
        style={{
          border: '0.0625rem solid #fff',
        }}
        ref={this.canvas}
        strokeWidth={4}
        strokeColor={'white'}
        canvasColor="black"
      /> */}
        {/* <footer className="position-fixed w-100 text-center p-3 b-0">
        &copy; 2024 Cool Website. All rights reserved.
      </footer> */}
      </BrowserWindow>
    </div>
  );
};

export default WhiteboardPage;
