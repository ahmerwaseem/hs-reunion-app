import React from 'react';
import ReactDOM from 'react-dom';
import TopBanner from './TopBanner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopBanner />, div);
});
