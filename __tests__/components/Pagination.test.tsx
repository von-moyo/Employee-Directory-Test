import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pagination } from '../../src/components/Pagination';
import type { PaginationProps } from '../../src/components/Pagination';


function makeProps(overrides: Partial<PaginationProps> = {}): PaginationProps {
  return {
    currentPage: 1,
    totalPages: 5,
    totalItems: 100,
    startIndex: 1,
    endIndex: 20,
    hasPrev: false,
    hasNext: true,
    onPageChange: jest.fn(),
    ...overrides,
  };
}

describe('Pagination', () => {
  beforeEach(() => jest.clearAllMocks());


  describe('renders nothing when totalPages <= 1', () => {
    it('returns null when totalPages is 1', () => {
      const { toJSON } = render(<Pagination {...makeProps({ totalPages: 1 })} />);
      expect(toJSON()).toBeNull();
    });

    it('returns null when totalPages is 0', () => {
      const { toJSON } = render(<Pagination {...makeProps({ totalPages: 0 })} />);
      expect(toJSON()).toBeNull();
    });
  });


  describe('range label', () => {
    it('renders the start index', () => {
      const { getByText } = render(<Pagination {...makeProps({ startIndex: 1 })} />);
      expect(getByText('1')).toBeTruthy();
    });

    it('renders the end index', () => {
      const { getByText } = render(<Pagination {...makeProps({ endIndex: 20 })} />);
      expect(getByText('20')).toBeTruthy();
    });

    it('renders the total items count', () => {
      const { getByText } = render(<Pagination {...makeProps({ totalItems: 100 })} />);
      expect(getByText('100')).toBeTruthy();
    });

    it('renders "employees" label text', () => {
      const { getByText } = render(<Pagination {...makeProps()} />);
      expect(getByText(' employees')).toBeTruthy();
    });
  });


  describe('Prev button', () => {
    it('renders the Prev button', () => {
      const { getByLabelText } = render(<Pagination {...makeProps()} />);
      expect(getByLabelText('Prev')).toBeTruthy();
    });

    it('is disabled when hasPrev is false', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ hasPrev: false })} />,
      );
      expect(getByLabelText('Prev').props.accessibilityState.disabled).toBe(true);
    });

    it('is not disabled when hasPrev is true', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ currentPage: 3, hasPrev: true })} />,
      );
      expect(getByLabelText('Prev').props.accessibilityState.disabled).toBe(false);
    });

    it('calls onPageChange with currentPage - 1 when pressed', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <Pagination
          {...makeProps({ currentPage: 3, hasPrev: true, onPageChange })}
        />,
      );
      fireEvent.press(getByLabelText('Prev'));
      expect(onPageChange).toHaveBeenCalledWith(2);
      expect(onPageChange).toHaveBeenCalledTimes(1);
    });

    it('does NOT call onPageChange when disabled', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <Pagination {...makeProps({ hasPrev: false, onPageChange })} />,
      );
      fireEvent.press(getByLabelText('Prev'));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });


  describe('Next button', () => {
    it('renders the Next button', () => {
      const { getByLabelText } = render(<Pagination {...makeProps()} />);
      expect(getByLabelText('Next')).toBeTruthy();
    });

    it('is not disabled when hasNext is true', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ hasNext: true })} />,
      );
      expect(getByLabelText('Next').props.accessibilityState.disabled).toBe(false);
    });

    it('is disabled when hasNext is false', () => {
      const { getByLabelText } = render(
        <Pagination
          {...makeProps({ currentPage: 5, totalPages: 5, hasNext: false })}
        />,
      );
      expect(getByLabelText('Next').props.accessibilityState.disabled).toBe(true);
    });

    it('calls onPageChange with currentPage + 1 when pressed', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <Pagination {...makeProps({ currentPage: 2, hasNext: true, onPageChange })} />,
      );
      fireEvent.press(getByLabelText('Next'));
      expect(onPageChange).toHaveBeenCalledWith(3);
      expect(onPageChange).toHaveBeenCalledTimes(1);
    });

    it('does NOT call onPageChange when disabled', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <Pagination
          {...makeProps({ currentPage: 5, totalPages: 5, hasNext: false, onPageChange })}
        />,
      );
      fireEvent.press(getByLabelText('Next'));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });


  describe('page number pills', () => {
    it('renders all page numbers when totalPages <= 7', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ totalPages: 5 })} />,
      );
      [1, 2, 3, 4, 5].forEach((p) => {
        expect(getByLabelText(`Go to page ${p}`)).toBeTruthy();
      });
    });

    it('marks the active page as selected', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ currentPage: 3, totalPages: 5 })} />,
      );
      expect(
        getByLabelText('Go to page 3').props.accessibilityState.selected,
      ).toBe(true);
    });

    it('marks inactive pages as not selected', () => {
      const { getByLabelText } = render(
        <Pagination {...makeProps({ currentPage: 3, totalPages: 5 })} />,
      );
      expect(
        getByLabelText('Go to page 1').props.accessibilityState.selected,
      ).toBe(false);
    });

    it('calls onPageChange with the page number when a pill is pressed', () => {
      const onPageChange = jest.fn();
      const { getByLabelText } = render(
        <Pagination {...makeProps({ totalPages: 5, onPageChange })} />,
      );
      fireEvent.press(getByLabelText('Go to page 4'));
      expect(onPageChange).toHaveBeenCalledWith(4);
      expect(onPageChange).toHaveBeenCalledTimes(1);
    });
  });


  describe('page window algorithm (> 7 total pages)', () => {
    it('near-start (current=1): shows pages 1-5 and the last page', () => {
      const { getByLabelText, queryByLabelText, getByText } = render(
        <Pagination {...makeProps({ currentPage: 1, totalPages: 10 })} />,
      );
      [1, 2, 3, 4, 5, 10].forEach((p) =>
        expect(getByLabelText(`Go to page ${p}`)).toBeTruthy(),
      );
      [6, 7, 8, 9].forEach((p) =>
        expect(queryByLabelText(`Go to page ${p}`)).toBeNull(),
      );
      expect(getByText('···')).toBeTruthy(); 
    });

    it('near-end (current=9): shows page 1 and the last 5 pages', () => {
      const { getByLabelText, queryByLabelText, getByText } = render(
        <Pagination
          {...makeProps({ currentPage: 9, totalPages: 10, hasPrev: true })}
        />,
      );
      [1, 6, 7, 8, 9, 10].forEach((p) =>
        expect(getByLabelText(`Go to page ${p}`)).toBeTruthy(),
      );
      [2, 3, 4, 5].forEach((p) =>
        expect(queryByLabelText(`Go to page ${p}`)).toBeNull(),
      );
      expect(getByText('···')).toBeTruthy(); 
    });

    it('middle (current=6): shows page 1, current-1, current, current+1, and last', () => {
      const { getByLabelText, queryByLabelText, getAllByText } = render(
        <Pagination
          {...makeProps({ currentPage: 6, totalPages: 12, hasPrev: true })}
        />,
      );
      [1, 5, 6, 7, 12].forEach((p) =>
        expect(getByLabelText(`Go to page ${p}`)).toBeTruthy(),
      );
      [2, 3, 4, 8, 9, 10, 11].forEach((p) =>
        expect(queryByLabelText(`Go to page ${p}`)).toBeNull(),
      );
      expect(getAllByText('···')).toHaveLength(2);
    });
  });


  describe('progress bar', () => {
    it('renders when totalPages > 1', () => {
      const { toJSON } = render(<Pagination {...makeProps({ totalPages: 5 })} />);
      expect(toJSON()).not.toBeNull();
    });
  });
});
