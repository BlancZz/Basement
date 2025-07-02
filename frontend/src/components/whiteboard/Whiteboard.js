import React, {
  useRef,
  useEffect,
  useContext,
  useDeferredValue,
  useState,
} from 'react';
import { fabric } from 'fabric';
const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [penWidth, setPenWidth] = useState(3);
  const [penColour, setPenColour] = useState('black');
  // save the canvas
  const [fabricCanvas, setFabricCanvas] = useState();
  const [toggleEraser, setToggleEraser] = useState(false);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'white',
      // try make the dynamic
      width: 800,
      height: 500,
      // selectionColor: 'purple', // cannot select and draw at the same time
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);
    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const saveBoard = () => {
    const pngData = fabricCanvas.toDataURL('png');
    // const sfbuff = new Buffer.from(pngData.split(',')[1], 'base64');
    const base64String = pngData.split(',')[1];
    console.log(base64String);
    // const fileName = `drawing-${Math.random().toString().replace(".","")}.png`

    // downloadLink.href = pngData;
    // downloadLink
  };
  const changePenColour = (colour) => {
    // if canvas exists
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = colour;
      setPenColour(colour);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = 'white';
    }
  };

  const toggleErase = () => {
    if (fabricCanvas) {
      if (toggleEraser) {
        changePenColour('black');
        setToggleEraser(false);
      } else {
        changePenColour('white');
        setToggleEraser(true);
      }
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      <canvas ref={canvasRef}></canvas>

      <div className="d-flex justify-content-around align-items-center">
        <div
          className="d-flex justify-content-around align-items-center px-3"
          style={{
            background: '#ffd4ea',
            borderRadius: '0.5rem',
            width: '32rem',
            height: '2.5rem',
            marginTop: '1rem',
          }}
        >
          <input
            type="color"
            onChange={(e) => {
              console.log(e);
              changePenColour(e.target.value);
            }}
            style={{
              backgroundColor: '#ffd4ea',
              border: 'none',
              width: '2rem',
              height: '2rem',
            }}
            value={penColour}
          />
          <label>Stroke Width: {penWidth}</label>
          <input
            type="range"
            onChange={(e) => {
              console.log(e);
              changePenWidth(e.target.value);
            }}
            value={penWidth}
            min={1}
            max={30}
          />
          <button
            type="button"
            class="btn btn-primary"
            style={{
              backgroundColor: '#f797c9',
              border: 'none',
              height: '2.5rem',
            }}
            onClick={() => toggleErase()}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="white"
            >
              <path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z" />
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style={{
              backgroundColor: '#f797c9',
              border: 'none',
              height: '2.5rem',
            }}
            onClick={() => clearCanvas()}
          >
            Clear
          </button>
        </div>

        <button
          type="button"
          class="btn btn-primary"
          style={{
            backgroundColor: '#de498a',
            border: 'none',
            height: '2.5rem',
          }}
          onClick={() => saveBoard()}
        >
          Send
        </button>
      </div>
      {/* do the onchange shit to change the colour */}
      {/* <input
        type="color"
        id="colorpicker"
        value={colorRef.current} // this doesnt work cause ref doesnt re render it
      ></input> */}
    </div>
  );
};

export default Whiteboard;
