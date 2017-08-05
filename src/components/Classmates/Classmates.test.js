import React from 'react';
import ReactDOM from 'react-dom';
import Classmates from './Classmates';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Classmates />, div);
});
