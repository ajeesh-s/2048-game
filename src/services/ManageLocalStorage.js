export const ManageLocalStorage = {
  get(key) {
    if (!key) {
      return;
    }
    return localStorage.getItem(key);
  },
  set(key, data) {
    if (!key) {
      return;
    }
    let dataTemp = data || {};
    dataTemp = typeof dataTemp === 'string' ? data : JSON.stringify(dataTemp);
    localStorage.setItem(key, dataTemp);
  },
  delete(key) {
    if (!key) {
      return;
    }
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};

const LocalStorage = {
  ManageLocalStorage
};

export default LocalStorage;
