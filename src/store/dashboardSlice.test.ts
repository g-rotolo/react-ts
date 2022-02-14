import reducer from './dashboardSlice';

test('should return the initial state', () => {
    expect(
        reducer(undefined, {
            type: undefined,
        })
    ).toEqual({
        isLoading: false,
        dashboardData: [],
    });
});
