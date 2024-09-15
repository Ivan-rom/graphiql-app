import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VariableComponent } from './Variable';
import { VariableKeys, IVariable } from '@/helpers/types';
import { renderWithIntl } from '@/__test__/utils';

const messages = { Client: { 'key-placeholder': 'Key', 'value-placeholder': 'Value' } };

vi.mock('@/assets/svg/trash.svg', () => ({
  default: () => <svg data-testid="trash-icon" />,
}));

describe('VariableComponent', () => {
  const mockCallback = vi.fn();
  const mockRemoveCallback = vi.fn();

  const variable: IVariable = { id: 1, key: 'Authorization', value: 'Bearer token' };

  it('renders the variable input fields and delete button', () => {
    renderWithIntl(
      <VariableComponent variable={variable} index={0} callback={mockCallback} removeCallback={mockRemoveCallback} />,
      { messages },
    );

    // Проверяем наличие плейсхолдеров и значений полей
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
  });

  it('calls callback when inputs lose focus', () => {
    renderWithIntl(
      <VariableComponent variable={variable} index={0} callback={mockCallback} removeCallback={mockRemoveCallback} />,
      { messages },
    );

    // Вызываем событие потери фокуса
    const keyInput = screen.getByDisplayValue('Authorization');
    fireEvent.blur(keyInput, { target: { value: 'Authorization' } });

    expect(mockCallback).toHaveBeenCalledWith('Authorization', VariableKeys.key, 0);
  });

  it('updates input values on change', () => {
    renderWithIntl(
      <VariableComponent variable={variable} index={0} callback={mockCallback} removeCallback={mockRemoveCallback} />,
      { messages },
    );

    const keyInput = screen.getByDisplayValue('Authorization');
    fireEvent.change(keyInput, { target: { value: 'NewKey' } });

    expect(screen.getByDisplayValue('NewKey')).toBeInTheDocument();
  });
});
