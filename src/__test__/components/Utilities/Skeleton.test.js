import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SkeletonCard from "@/components/Utilities/Skeleton";

describe('SkeletonCard', () => {
  it('renders a skeleton card container', () => {
    render(<SkeletonCard />);
    const container = screen.getByRole('presentation', { hidden: true }); // optional

    const skeletonDiv = screen.getByTestId('skeleton-card');
    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv).toHaveClass('flex', 'flex-row', 'bg-gray-200', 'rounded-lg', 'animate-pulse');
  });

  it('matches snapshot', () => {
    const { container } = render(<SkeletonCard />);
    expect(container).toMatchSnapshot();
  });
});
