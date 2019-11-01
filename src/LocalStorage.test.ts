import { LocalStorage } from './LocalStorage';

describe('LocalStorage', () => {
  beforeEach(() => {
    LocalStorage.clear();
  });

  test('set and stringify, sets correct value', () => {
    const value = { test: 1 };
    const success = LocalStorage.set('test_key', value);

    const readValue = localStorage.getItem('test_key');

    expect(success).toEqual(true);

    expect(JSON.parse(readValue as string)).toEqual(value);
  });

  test('set, without stringify, sets correct value', () => {
    LocalStorage.set('test_key', 'value', { useJSONStringify: false });

    const value = localStorage.getItem('test_key');

    expect(value).toEqual('value');
  });

  test('get, returns null for non existing key', () => {
    const value = LocalStorage.get('test_key');

    expect(value).toEqual(null);
  });

  test('get, returns string for existing key', () => {
    localStorage.setItem('test_key', 'value');

    const value = LocalStorage.get('test_key', null, { useJSONParse: false });

    expect(value).toEqual('value');
  });

  test('get and parse, with valid json, returns correct value', () => {
    const value = { test: 'test' };
    localStorage.setItem('test_key', JSON.stringify(value));

    const readValue = LocalStorage.get('test_key');

    expect(readValue).toEqual(value);
  });

  test('get and parse, with invalid json returns null', () => {
    localStorage.setItem('test_key', 'invalid JSON');

    const readValue = LocalStorage.get('test_key');

    expect(readValue).toEqual(null);
  });

  test('remove, removes existing key', () => {
    localStorage.setItem('test_key', 'test');
    const beforeRemove = localStorage.getItem('test_key');

    LocalStorage.remove('test_key');
    const afterRemove = localStorage.getItem('test_key');

    expect(beforeRemove).toEqual('test');
    expect(afterRemove).toEqual(null);
  });

  test('clear, clears localStorage', () => {
    localStorage.setItem('test_key', 'value');
    localStorage.setItem('key1', 'value');
    localStorage.setItem('key2', 'value');

    LocalStorage.clear();

    expect(localStorage.length).toEqual(0);
  });
});
