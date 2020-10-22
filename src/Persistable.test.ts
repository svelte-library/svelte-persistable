import {persistable} from "./Persistable";

describe('persistable', () => {
    it('calls the default value creator if there is no value in store', async () => {
        const creator = jest.fn(() => 'default-value');
        const setItem = jest.fn();
        const getItem = jest.fn();
        const tester = persistable(
            creator,
            {
                key: 'mock-test',
                storage: {
                    setItem, getItem
                }
            }
        );

        await tester.wait();
        expect(creator).toHaveBeenCalledTimes(1);
        const getData = jest.fn();
        tester.subscribe(getData);
        expect(getData).toHaveBeenCalledWith('default-value');
    });

    it('does not call the default value creator if there is a value in store', async () => {
        const creator = jest.fn(() => 'default-value');
        const setItem = jest.fn();
        const getItem = jest.fn(() => '"i have a value"');
        const tester = persistable(
            creator,
            {
                key: 'mock-test',
                storage: {
                    setItem, getItem
                }
            }
        );

        await tester.wait();
        expect(creator).not.toHaveBeenCalled();
        const getData = jest.fn();
        tester.subscribe(getData);
        expect(getData).toHaveBeenCalledWith('i have a value');
    });
});
