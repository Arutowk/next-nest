import { useState, useEffect, useRef } from 'react';

export function useCountdown(options: {
  duration?: number;
  onStart?: () => Promise<void> | void;
}) {
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setIsCounting(false);
    }
  }, [countdown]);

  const start = async () => {
    try {
      await options.onStart?.();
      setCountdown(options.duration || 60);
      setIsCounting(true);
    } catch (error) {
      console.error('Countdown start failed:', error);
    }
  };

  return { countdown, isCounting, start };
}

// 增强版倒计时 Hook
export function usePreciseCountdown(options: {
  duration?: number;
  onStart?: () => Promise<void> | void;
  onEnd?: () => void;
}) {
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const endTime = useRef(0); // 使用精确时间戳代替递减计数
  const timerRef = useRef<number>(NaN);
  const onEndRef = useRef(options.onEnd);
  onEndRef.current = options.onEnd; // 保持最新回调引用

  // 暂停相关状态
  const pauseTime = useRef(0);
  const pause = () => {
    if (isCounting) {
      clearTimeout(timerRef.current!);
      pauseTime.current = Date.now();
      setIsCounting(false);
    }
  };
  const resume = () => {
    if (!isCounting && pauseTime.current > 0) {
      endTime.current += Date.now() - pauseTime.current;
      setIsCounting(true);
      updateCountdown();
    }
  };

  // 核心计时逻辑
  const updateCountdown = () => {
    const remaining = Math.max(0, endTime.current - Date.now());
    const newCount = Math.ceil(remaining / 1000);

    // 状态变化检测
    if (countdown !== newCount) {
      setCountdown(newCount);
    }

    if (remaining > 0) {
      const nextTick = remaining % 1000 || 1000;
      timerRef.current = window.setTimeout(updateCountdown, nextTick);
    } else {
      setIsCounting(false);
      // 触发结束回调
      if (onEndRef.current && countdown !== 0) {
        onEndRef.current();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const start = async () => {
    try {
      await options.onStart?.();

      // 记录精确结束时间
      endTime.current = Date.now() + (options.duration || 60) * 1000;
      setIsCounting(true);
      updateCountdown(); // 启动计时循环
    } catch (error) {
      console.error('Countdown start failed:', error);
    }
  };

  return { countdown, isCounting, start, pause, resume };
}

// 倒计时组件
interface CountdownButtonProps {
  duration?: number;
  onClick: () => Promise<void> | void;
  children?: React.ReactNode;
  className?: string;
}
export function CountdownButton({
  duration = 60,
  onClick,
  children = '获取验证码',
  className,
}: CountdownButtonProps) {
  const { countdown, isCounting, start } = useCountdown({
    duration,
    onStart: onClick,
  });

  return (
    <button onClick={start} disabled={isCounting} className={className}>
      {isCounting ? `${countdown}秒后重新获取` : children}
    </button>
  );
}
export function PreciseCountdownButton() {
  const { countdown, isCounting, start, pause, resume } = usePreciseCountdown({
    duration: 60,
    onStart: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
  });

  return (
    <div>
      <button onClick={start} disabled={isCounting}>
        {isCounting ? `${countdown}秒` : '获取验证码'}
      </button>
      <button onClick={pause}>暂停</button>
      <button onClick={resume}>恢复</button>
    </div>
  );
}
