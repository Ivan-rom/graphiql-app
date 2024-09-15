export default class LocalStorageMock {
  items: Map<string, string> = new Map();

  length = this.items.values.length;

  getItem(key: string) {
    return this.items.get(key) || null;
  }

  setItem(key: string, value: string) {
    this.items.set(key, value);
    this.length = this.items.values.length;
  }

  removeItem(key: string) {
    this.length = this.items.values.length;
    return this.items.delete(key);
  }

  clear() {
    return this.length;
  }

  key(index: number) {
    return Array.from(this.items.keys())[index];
  }
}
