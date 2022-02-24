import LabelView from '@/components/LabelView';
import LabelGroup from '@/components/LabelView/LabelGroup';
import XModal from '@/components/Modal/XModal';
import SensitiveHidden from '@/components/SensitiveHidden';
import { ACCOUT_TYPE_ENUM } from '@/constants/Vocher.const';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import AccountInfo from './components/AcountInfo';
import { useBalanceManageContext } from './index.context';

interface Props {}

const SettlementObjectInfoModal: FC<Props> = () => {
  const { settlementModalRef, settlementData } = useBalanceManageContext();

  return (
    <XModal title="结算对象信息" ctrlRef={settlementModalRef} footer={null}>
      <LabelGroup>
        <LabelView label="名称">
          <SensitiveHidden text={settlementData.accountName} type="name" />
        </LabelView>
        {/* 个人就是身份证号。机构的是税号 */}
        <LabelView label="身份证/税号">
          {ACCOUT_TYPE_ENUM[1].value === settlementData.accountType ? (
            <SensitiveHidden
              text={settlementData.accountIdentity}
              type="IDNumber"
            />
          ) : (
            <SensitiveHidden
              text={settlementData.accountIdentity}
              type="number"
            />
          )}
        </LabelView>
        <LabelView label="UID">{settlementData.beneficiaryUid}</LabelView>
        <LabelView label="账户信息">
          <AccountInfo data={settlementData} />
        </LabelView>
      </LabelGroup>
    </XModal>
  );
};

export default observer(SettlementObjectInfoModal);
