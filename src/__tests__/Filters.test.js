import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters'; // Путь к вашему компоненту Filters
import '@testing-library/jest-dom';

describe('Filters', () => {
  test('должен корректно обновлять фильтры', () => {
    // Мокаем функцию setFilters, чтобы проверять, вызывается ли она с правильными значениями
    const setFilters = jest.fn();

    const filters = {
      type: '',
      category: '',
      dateRange: ['', ''],
      amountRange: [0, Infinity], // начальные значения
    };

    render(<Filters filters={filters} setFilters={setFilters} />);

    // Проверяем наличие полей фильтра
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('From')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('To')).toBeInTheDocument();

    // Симулируем изменение поля категории
    fireEvent.change(screen.getByPlaceholderText('Category'), {
      target: { value: 'Food' },
    });

    // Симулируем изменение полей для диапазона суммы
    fireEvent.change(screen.getByPlaceholderText('Min Amount'), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByPlaceholderText('Max Amount'), {
      target: { value: '500' },
    });

    // Симулируем изменение полей для диапазона даты
    fireEvent.change(screen.getByPlaceholderText('From'), {
      target: { value: '2025-01-01' },
    });
    fireEvent.change(screen.getByPlaceholderText('To'), {
      target: { value: '2025-12-31' },
    });

    // Проверяем, что setFilters был вызван с обновленными значениями только один раз
    expect(setFilters).toHaveBeenCalledWith({
      amountRange: [50, 500],       // обновленный диапазон суммы
      category: 'Food',             // обновленная категория
      dateRange: ['2025-01-01', '2025-12-31'], // обновленный диапазон дат
      type: '',                     // тип не изменился
    });

    // Проверяем, что setFilters был вызван только один раз
    expect(setFilters).toHaveBeenCalledTimes(1);
  });
});
