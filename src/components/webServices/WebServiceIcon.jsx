import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faMapLocationDot,
  faMountain,
  faTree,
  faWater,
} from '@fortawesome/free-solid-svg-icons';

const ICONS = {
  mountain: faMountain,
  building: faBuilding,
  river: faWater,
  tree: faTree,
  map: faMapLocationDot,
};

const WebServiceIcon = ({ name, className = '' }) => (
  <FontAwesomeIcon icon={ICONS[name] ?? faMountain} className={className} />
);

export default WebServiceIcon;
