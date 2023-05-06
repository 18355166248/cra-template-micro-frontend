import { makeAutoObservable } from 'mobx';

class CommonModels {
  opsId?: string;

  constructor() {
    makeAutoObservable(this);
  }

  getOpsId = () => {};
}

export const common = new CommonModels();
