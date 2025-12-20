import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner', () => {
  it('renders spinner container', () => {
    const { container } = render(<Spinner />);

    const wrapper = container.querySelector('.full-spinner');
    const spinner = container.querySelector('.spinner');

    expect(spinner).toBeInTheDocument();
    expect(wrapper).toBeInTheDocument();
  });
});
