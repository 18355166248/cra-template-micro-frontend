import React, { FC, useState } from 'react';
import './index.scoped.scss';

type Type = 'name' | 'IDNumber' | 'number' | 'email'; // 名称 身份证 税号 账号

interface Props {
  text: string;
  type: Type;
}

const SensitiveHidden: FC<Props> = (props: Props) => {
  const { text, type } = props;
  const [visible, setVisible] = useState(false);

  return (
    <span className="sensitiveHidden">
      {visible ? text : hiddenText(text, type, setVisible)}
    </span>
  );
};

function hiddenText(text: string, type: Type, setVisible: any): any {
  let str = text;

  switch (type) {
    case 'name': {
      if (text.length <= 2) {
        str = text.replace(/(.{1})$/, '*');
      } else {
        str = text.replace(/.{2}$/, Array(2).fill('*').join(''));
      }
      break;
    }
    case 'IDNumber': {
      if (text.length > 10) {
        str = text.replace(
          /^(.{6})(?:\w+)(.{4})$/,
          `$1${Array(text.length - 10)
            .fill('*')
            .join('')}$2`
        );
      }
      break;
    }
    case 'number': {
      if (text.length > 8) {
        str = text.replace(
          /^(.{4})(?:\w+)(.{4})$/,
          `$1${Array(text.length - 8)
            .fill('*')
            .join('')}$2`
        );
      }
      break;
    }
    case 'email': {
      const strs = str.split('@');

      if (strs.length === 2) {
        if (strs[0].length > 4) {
          const first = strs[0].replace(
            /^(.{2})(?:\w+)(.{2})$/,
            `$1${Array(strs[0].length - 4)
              .fill('*')
              .join('')}$2`
          );
          str = `${first}@${strs[1]}`;
        }
      } else if (text.length > 8) {
        str = text.replace(
          /^(.{4})(?:\w+)(.{4})$/,
          `$1${Array(text.length - 8)
            .fill('*')
            .join('')}$2`
        );
      }
      break;
    }
    default:
      throw Error('脱敏类型不正确');
  }

  return (
    <span>
      <span className="sensitiveStr" onClick={() => setVisible(true)}>
        {str}
      </span>
    </span>
  );
}

export default SensitiveHidden;
