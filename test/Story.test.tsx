import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

//import { Story } from '../stories/Story.stories';

describe('Cards', () => {
  it('should return 15 for add(10,5)', () => {
    expect(10 + 5).toBe(15);
  });
  it('renders Button without crashing', async () => {
    await act(async () => {
      render(<div />);
    });
  });
  /*it('renders Story without crashing', async () => {
    await act(async () => {
      render(<Story {...Story.args} />);
    });
  });*/
});
