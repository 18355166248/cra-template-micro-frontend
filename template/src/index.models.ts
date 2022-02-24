import { getOpsId } from '@/services/virtualAccount-services';
import { makeAutoObservable } from 'mobx';

class CommonModels {
  opsId?: string;

  constructor() {
    makeAutoObservable(this);
  }

  getOpsId = () => {
    getOpsId().then((res: any) => {
      this.opsId = res as string;
    });
  };
}

export const common = new CommonModels();
