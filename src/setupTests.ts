import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

React.useLayoutEffect = React.useEffect;
Enzyme.configure({ adapter: new Adapter() });
