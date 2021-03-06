const wrap = require('../lib/wrap')
const err = require('../lib/custom-exception')
describe('test the handle', () => {
    test('wrap empty reject', async () => {
        var func = jest.fn(() => Promise.reject("something"))
        var next = jest.fn()
        var result = await wrap(func)(undefined,undefined,next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0].message).toBe("something")
        expect(next.mock.calls[0][0].status).toBe(500)
    })

    test('wrap throw general exception', async () => {
        var func = jest.fn(() => {throw 'something'})
        var next = jest.fn()
        var result = await wrap(func)(undefined,undefined,next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0].message).toBe("something")
        expect(next.mock.calls[0][0].status).toBe(500)
    })

    test('wrap throw general exception', async () => {
        var func = jest.fn(() => {throw new Error("Something")})
        var next = jest.fn()
        var result = await wrap(func)(undefined,undefined,next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0].message).toBe("Error: Something")
        expect(next.mock.calls[0][0].status).toBe(500)
    })

    test('wrap not empty reject', async () => {
        var error = new err("error local",400, "some cause")
        var func = jest.fn(() => Promise.reject(error))
        var next = jest.fn()
        var result = await wrap(func)(undefined,undefined,next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0].message).toBe(error.message)
        expect(next.mock.calls[0][0].status).toBe(error.status)
        expect(next.mock.calls[0][0].response).toBe(error.response)
    })

})