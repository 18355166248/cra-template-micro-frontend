/**
 * 账户信息组件
 * 分为 1 UID 2 支付宝 3 银行卡
 */
import SensitiveHidden from '@/components/SensitiveHidden';
import {
  IsOverseasEnum,
  RECEIVIONG_ACCOUT_TYPE_ENUM,
} from '@/constants/Vocher.const';
import React, { FC } from 'react';

interface Props {
  data: any;
}

const AccountInfo: FC<Props> = (props: Props) => {
  const { data } = props;

  function renderDetail() {
    switch (data.receivingAccountType) {
      case RECEIVIONG_ACCOUT_TYPE_ENUM[1].value: // UID
        // 可能有银行卡或者支付宝信息
        return (
          <>
            {data.countryCode && <div>开户国家 - {data.countryCode}</div>}
            {data.bankProvince && <div>开户省 - {data.bankProvince}</div>}
            {data.bankCity && <div>开户市 - {data.bankCity}</div>}
            {data.branchBankName && <div>开户支行 - {data.branchBankName}</div>}
            {data.isOverseas === IsOverseasEnum[2].value && (
              <div>swiftCode - {data.swiftCode}</div>
            )}
            {/* 银行卡账号信息需脱敏 支付宝账号信息需要脱敏 */}
            {data.receivingAccountNo && (
              <span>
                <span>卡号/账号 - </span>
                <SensitiveHidden text={data.receivingAccountNo} type="email" />
              </span>
            )}
          </>
        );
        break;
      case RECEIVIONG_ACCOUT_TYPE_ENUM[3].value: // 支付宝
        return (
          <>
            <span>
              <span>卡号/账号 - </span>
              <SensitiveHidden text={data.receivingAccountNo} type="email" />
            </span>
          </>
        );
        break;
      case RECEIVIONG_ACCOUT_TYPE_ENUM[2].value: // 银行卡
        return (
          <>
            <div>开户国家 - {data.countryCode}</div>
            <div>开户省 - {data.bankProvince}</div>
            <div>开户市 - {data.bankCity}</div>
            <div>开户支行 - {data.branchBankName}</div>
            {data.isOverseas === IsOverseasEnum[2].value && (
              <div>swiftCode - {data.swiftCode}</div>
            )}
            {/* 银行卡账号信息需脱敏 支付宝账号信息需要脱敏 */}
            <span>
              <span>卡号/账号 - </span>
              <SensitiveHidden text={data.receivingAccountNo} type="IDNumber" />
            </span>
          </>
        );
        break;
      default:
        return '结算对象类型不正确';
    }
  }

  return (
    <div>
      <div>
        <span>账号类型 - </span>
        {RECEIVIONG_ACCOUT_TYPE_ENUM[data.receivingAccountType]?.text}
      </div>
      {renderDetail()}
    </div>
  );
};

export default AccountInfo;
