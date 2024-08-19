'use client';

import { useEffect, useState } from 'react';

// 业务问题如下：

function Chat() {
  const [text, setText] = useState('');

  const onScroll = () => {
    // do something....
    setText(text + 'xx');
  };

  const Tscroll = useT(1000, onScroll);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return <div>{text}</div>;
}

// ‒ 业务上要监听 scroll 事件，scroll 事件触发，会引起 onScroll 函数调用，onScroll 函数调用，会引起setText 更新 text 数据
// ‒ 问题来了，当浏览器滚动的时候，由于 scroll 事件触发相当频繁， useEffect 中的注册和取消 scroll 事件监听函数的行为也会反复出现，这样性能不好
// ‒ 如何解决性能不好这个问题？你有什么思路？可以使用具体代码实现吗？

export function useT(time: number, fn: Function): Function {
  let timer: any;
  let flag = false;
  //节流实现函数
}
