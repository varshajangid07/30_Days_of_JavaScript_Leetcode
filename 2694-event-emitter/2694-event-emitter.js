class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  subscribe(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const listeners = this.events[event];
    listeners.push(cb);

    return {
      unsubscribe: () => {
        const index = listeners.indexOf(cb);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  emit(event, args = []) {
    const listeners = this.events[event];
    
    if (!listeners || listeners.length === 0) {
      return [];
    }

    const listenersCopy = [...listeners];
    const results = new Array(listenersCopy.length);

    for (let i = 0; i < listenersCopy.length; i++) {
      results[i] = listenersCopy[i](...args);
    }

    return results;
  }
}