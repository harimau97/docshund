import { useState } from "react";

// 케이스 1: 버튼 클릭 - 정상 작동
const Counter = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    console.log("현재 count:", count); // 여전히 이전 값이 출력됨
  }

  return <button onClick={handleClick}>{count}</button>;
}

// 케이스 2: 루프 안에서 - 문제 발생
const LoopExample = () => {
  const [count, setCount] = useState(0);
  
  const runLoop = () => {
    [1,2,3].forEach(() => {
      setCount(count + 1);  // 모든 반복에서 count는 초기값을 참조
      console.log("현재 count:", count);
    });
  }

  return <button onClick={runLoop}>{count}</button>;
}
