import { useCallback, useEffect, useRef, useState } from 'react';
import { isFunction } from 'lodash';
import axios from 'axios';

interface Props {
  fetchFn: any;
  params?: any;
  defaultKey?: string;
  defaultRes?: any;
  filterList?: (list: any, res: any) => void; // 过滤请求结果方法
  cacheKey?: string; // 缓存的key
  errMaxNumber?: number; // 请求错误再次请求最大次数
}

type Status = {
  success: boolean;
  pending: boolean;
  done: boolean;
  error: boolean;
}; // 异步状态

const cache: any = {};

export default (props: Props) => {
  const {
    fetchFn,
    params,
    defaultKey = 'data',
    defaultRes = [],
    filterList,
    cacheKey,
    errMaxNumber,
  } = props;

  let cacheList = defaultRes;
  if (cacheKey) {
    const result = cache[cacheKey as string];
    if (result) {
      if (result.time < Date.now()) {
        cache[cacheKey as string] = undefined;
      } else if (result.list) {
        cacheList = result.list;
      }
    }
  }

  const errNumber = useRef(0);

  const [list, setList] = useState(cacheList);
  const [status, setStatus] = useState<Status>({
    success: false,
    pending: false,
    done: false,
    error: false,
  });

  useEffect(() => {
    if (cacheKey && list.length > 0) {
      cache[cacheKey] = { list, time: Date.now() + 1000 * 60 };
    }
  }, [cacheKey, list]);

  function _reset() {
    setList([]);
    setStatus({
      success: false,
      pending: false,
      done: false,
      error: false,
    });
  }

  const getList = useCallback(
    data => {
      setStatus({ ...status, pending: true });

      fetchFn({ ...params, ...data })
        .then((res: Record<string, any>) => {
          if (isFunction(filterList)) {
            setList(filterList(res[defaultKey], res));
          } else {
            setList(res[defaultKey]);
          }
          setStatus({ ...status, pending: false, success: true });
          errNumber.current = 0;
        })
        .catch((err: any) => {
          if (err instanceof axios.Cancel) return;

          if (
            typeof errMaxNumber === 'number' &&
            errNumber.current < errMaxNumber
          ) {
            errNumber.current++;
            getList(data);
          } else {
            setStatus({ ...status, pending: false, error: true });
            errNumber.current = 0;
          }
        });
    },
    [status, fetchFn, params, filterList, defaultKey, errMaxNumber]
  );

  return [list, getList, status, _reset];
};
