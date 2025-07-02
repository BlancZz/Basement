import LeftCloud1 from './LeftCloud1';
import LeftCloud2 from './LeftCloud2';
import LeftCloud3 from './LeftCloud3';
import LeftStar1 from './LeftStar1';
import LeftStar2 from './LeftStar2';
import LeftStar3 from './LeftStar3';
import LeftStar4 from './LeftStar4';

import RightCloud1 from './RightCloud1';
import RightCloud2 from './RightCloud2';
import RightCloud3 from './RightCloud3';
import RightStar1 from './RightStar1';
import RightStar2 from './RightStar2';
import RightStar3 from './RightStar3';
import RightStar4 from './RightStar4';

const WhiteboardDecoration = () => {
  return (
    <div className="decor">
      <div className="left-clouds-container">
        <LeftCloud1 />
        <LeftCloud2 />
        {/* <LeftStar4 /> */}
        {/* <LeftCloud3 /> */}
        {/* delete */}
        <LeftStar1 />
        <LeftStar2 />
        <LeftStar3 />
      </div>
      <div className="right-clouds-container">
        <RightCloud1 />
        <RightCloud2 />
        <RightStar3 />
        <RightCloud3 />
        <RightStar1 />
        <RightStar2 />
        {/* <RightStar4 /> */}
      </div>
    </div>
  );
};

export default WhiteboardDecoration;
