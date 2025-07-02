import LeftPlane from './LeftPlane';
import MsgCloud1 from './MsgCloud1';
import RightPlane from './RightPlane';
import MsgCloud2 from './MsgCloud2';

const MessageDecoration = () => {
  return (
    <div className="msgDecor">
      {/* <h1 style={{ textAlign: 'center' }}>Msger</h1> */}
      <MsgCloud1></MsgCloud1>
      <MsgCloud2></MsgCloud2>
    </div>
  );
};

export default MessageDecoration;
