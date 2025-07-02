import LeftPlane from './LeftPlane';
import RightPlane from './RightPlane';
import Message from './Message';
import MessageDecoration from './MsgDecoration';
import plane from './Plane.png';
import DarkBackground from '../../assets/DarkBackground.png';
import LightBackground from '../../assets/LightBackground.png';
import { useTheme } from '../../ThemeContext';
import BrowserWindow from '../BrowserWindow';

const MessagePage = () => {
  const { mode } = useTheme();

  return (
    // <div
    //   className="sunset-background"
    //   style={{ position: 'relative', paddingTop: '4rem' }}
    // >
    //   <MessageDecoration></MessageDecoration>
    // <div
    //   style={{
    //     top: '15%',
    //     width: '100%',
    //     height: '70%',
    //     position: 'absolute',
    //     backgroundImage: `url(${plane})`,
    //     backgroundSize: 'contain',
    //     backgroundRepeat: 'no-repeat',
    //   }}
    // >
    <div className="w-full h-full d-flex flex-column  align-items-center">
      <h1 style={{ textAlign: 'center' }}>Message</h1>
      <BrowserWindow>
        <Message />
      </BrowserWindow>
    </div>
  );
};

export default MessagePage;
