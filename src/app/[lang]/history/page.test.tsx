import LocalStorageMock from '@/__test__/mock/localStorage/localStorageMock';
import { renderWithIntl } from '@/__test__/utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import History from './page';
import { RequestMethods } from '@/helpers/enums';

describe('test history page', () => {
  beforeEach(() => {
    window.localStorage = new LocalStorageMock();
  });

  it('should display empty message', () => {
    renderWithIntl(<History />, {
      messages: {
        History: {
          'history-header': 'History Requests',
          'empty-msg': "You haven't executed any requests. It's empty here. Try:",
          client: 'Client',
        },
      },
    });
    expect(screen.getByText('History Requests')).toBeInTheDocument();
    expect(screen.getByText("You haven't executed any requests. It's empty here. Try:")).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
  });

  it('should display history', () => {
    const historyArray = [{ url: 'testURL', method: RequestMethods.GET, href: 'testHREF' }];
    localStorage.setItem('history', JSON.stringify(historyArray));
    renderWithIntl(<History />, {
      messages: {
        History: {
          'history-header': 'History Requests',
          'empty-msg': "You haven't executed any requests. It's empty here. Try:",
          client: 'Client',
        },
      },
    });
    expect(screen.getByText('History Requests')).toBeInTheDocument();
    expect(screen.getByText(historyArray[0].url)).toBeInTheDocument();
    expect(screen.getByText(historyArray[0].method)).toBeInTheDocument();
  });
});
