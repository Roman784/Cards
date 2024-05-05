import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function ActivityCell({studyTime}: {studyTime: number}) {
  const colorByStudyTimes = new Map<number, string>();

  colorByStudyTimes.set(1, "#b0d0ff");
  colorByStudyTimes.set(5, "#88b8ff");
  colorByStudyTimes.set(10, "#589cff");
  colorByStudyTimes.set(15, "#3586ff");
  colorByStudyTimes.set(30, "#0d6efd");

  function getColor() {
    let color: string = "";

    for (const [key, value] of colorByStudyTimes) {
      if (studyTime >= key)
        color = value;
      else
        break;
    }

    return color;
  }

  return (
    <>
      <OverlayTrigger key="top" placement="top"
        overlay={
          <Tooltip id={`tooltip-$top`}>{studyTime} min</Tooltip>}>
          
        <Card className="activity-cell" style={{backgroundColor: getColor()}}/>
      </OverlayTrigger>
  </>
  );
}