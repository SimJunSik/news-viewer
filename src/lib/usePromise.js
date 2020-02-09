import { useState, useEffect } from 'react';

// usePromise를 사용하면 NewsList에서 대기 중 상태 관리와 useEffect 설정을 직접 하지 않아도 되므로
// 코드가 훨씬 간결해진다. 요청 상태를 관리할 때 무조건 커스텀 Hook을 만들어서 사용해야 하는건 아니지만
// 상황에 따라 적절히 사용하면 좋은 코드를 만들 수 있음
export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  // useEffect에 등록하는 함수는 async로 작성하면 안됨
  // 그 대신 함수 내부에 async 함수를 따로 만들어줘야 함
  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
