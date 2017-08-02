import React from 'react';
import ReactDOM from 'react-dom';
import ModalWindow from './ModalWindow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalWindow />, div);
});
