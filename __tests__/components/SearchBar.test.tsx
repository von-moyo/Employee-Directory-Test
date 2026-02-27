import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} />,
    );
    expect(getByPlaceholderText('Search employees...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} placeholder="Search..." />,
    );
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByPlaceholderText('Search employees...'), 'Emily');
    expect(onChangeText).toHaveBeenCalledWith('Emily');
  });

  it('shows clear button when value is not empty', () => {
    const { getByLabelText } = render(
      <SearchBar value="Emily" onChangeText={jest.fn()} />,
    );
    expect(getByLabelText('Clear search')).toBeTruthy();
  });

  it('calls onChangeText with empty string when clear is pressed', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = render(
      <SearchBar value="Emily" onChangeText={onChangeText} />,
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('does not show clear button when value is empty', () => {
    const { queryByLabelText } = render(
      <SearchBar value="" onChangeText={jest.fn()} />,
    );
    expect(queryByLabelText('Clear search')).toBeNull();
  });
});
