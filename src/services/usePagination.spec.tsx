import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import usePagination from './usePagination';

interface Row {
    id: number;
    created: string;
    modified: string;
}

const PaginationProbe = ({
    source,
}: {
    source: (
        page: number,
        pageSize: number,
    ) => Promise<{ data: { results: Row[]; count: number } }>;
}) => {
    const { data, count, page, pageSize, changePage, changePageSize } = usePagination<Row>({
        source: source as any,
    });

    return (
        <div>
            <span data-testid="count">{count}</span>
            <span data-testid="page">{page}</span>
            <span data-testid="page-size">{pageSize}</span>
            <span data-testid="first-id">{data[0]?.id ?? 'none'}</span>
            <button onClick={() => changePage(3)}>page-3</button>
            <button onClick={() => changePageSize(50)}>size-50</button>
        </div>
    );
};

describe('usePagination', () => {
    it('loads data and reacts to page/pageSize changes', async () => {
        const source = jest.fn().mockImplementation(async (page: number, pageSize: number) => ({
            data: {
                results: [{ id: page * 100 + pageSize, created: 'x', modified: 'y' }],
                count: 77,
            },
        }));

        render(<PaginationProbe source={source} />);

        await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('77'));
        expect(screen.getByTestId('first-id').textContent).toBe('120');
        expect(source).toHaveBeenCalledWith(1, 20);

        fireEvent.click(screen.getByText('page-3'));
        await waitFor(() => expect(screen.getByTestId('page').textContent).toBe('3'));
        expect(source).toHaveBeenLastCalledWith(3, 20);

        fireEvent.click(screen.getByText('size-50'));
        await waitFor(() => expect(screen.getByTestId('page-size').textContent).toBe('50'));
        expect(screen.getByTestId('page').textContent).toBe('1');
        expect(source).toHaveBeenLastCalledWith(1, 50);
    });
});
