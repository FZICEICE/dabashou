import React, { useState, useEffect } from 'react';

interface LoginViewProps {
  onLogin: (phone: string) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [warning, setWarning] = useState('');
  const [simulatedSMS, setSimulatedSMS] = useState('');

  // Settle verification count down timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      setWarning('请输入正确的11位手机号');
      return;
    }
    setWarning('');
    setCountdown(60);
    // Simulate active code
    const mockCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedSMS(`[搭把手] 模拟验证码为: ${mockCode}`);
    setVerificationCode(mockCode);
  };

  const handleLoginClick = () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      setWarning('请输入正确的11位手机号');
      return;
    }
    if (!verificationCode) {
      setWarning('请输入验证码');
      return;
    }
    if (!agreed) {
      setWarning('您需要同意用户协议与隐私政策才能继续');
      return;
    }
    setWarning('');
    onLogin(phoneNumber);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 py-8 min-h-[600px] w-full">
      {/* Background Organic Blobs */}
      <div className="absolute top-[-40px] left-[-40px] w-80 h-80 rounded-full bg-primary-container/20 blur-[50px] mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-30px] right-[-30px] w-72 h-72 rounded-full bg-secondary-fixed/30 blur-[60px] mix-blend-multiply pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
        {/* Branding */}
        <div className="flex flex-col items-center mb-6 w-full text-center">
          <div className="w-20 mb-3 hover:scale-[1.03] transition-transform duration-300 flex justify-center items-center">
            <img src="/LOGO.png" alt="搭把手 LOGO" className="w-full h-auto object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#d87532] tracking-wider mb-1">搭把手</h1>
          <p className="text-sm text-on-surface-variant font-medium text-slate-500">邻里之间，随手帮一把。</p>
        </div>

        {/* Input Fields container */}
        <div className="bg-white/50 backdrop-blur-md border border-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4 mb-4 w-full shadow-[0_8px_32px_rgba(168,198,159,0.1)]">
          <h2 className="text-xl font-bold text-on-surface mb-1">欢迎回来</h2>

          {/* Form */}
          <div className="flex flex-col gap-3">
            {/* Country code + phone */}
            <div className="relative flex items-center bg-white rounded-xl border border-outline-variant overflow-hidden h-14 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <button className="flex items-center gap-1 px-4 text-on-surface-variant text-sm font-medium border-r border-outline-variant/60 h-full hover:bg-surface-container-low transition-colors">
                <span>+86</span>
                <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
              </button>
              <input
                className="flex-1 bg-transparent border-none px-4 text-sm text-on-surface outline-none h-full focus:ring-0 placeholder-gray-400"
                placeholder="请输入手机号"
                type="tel"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, ''));
                  setWarning('');
                }}
              />
            </div>

            {/* Code */}
            <div className="relative flex items-center bg-white rounded-xl border border-outline-variant overflow-hidden h-14 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <input
                className="flex-1 bg-transparent border-none px-4 text-sm text-on-surface outline-none h-full focus:ring-0 placeholder-gray-400"
                placeholder="请输入验证码"
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/\D/g, ''));
                  setWarning('');
                }}
              />
              <button
                type="button"
                className="px-4 text-primary text-xs font-semibold hover:opacity-85 transition-opacity border-l border-outline-variant h-full disabled:opacity-55 cursor-pointer"
                disabled={countdown > 0}
                onClick={handleSendCode}
              >
                {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* Warning Message */}
          {warning && (
            <p className="text-xs text-error font-medium flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {warning}
            </p>
          )}

          {/* Simulated SMS Box */}
          {simulatedSMS && countdown > 0 && (
            <div className="bg-primary-container/20 border border-primary-container/50 rounded-lg p-2.5 text-xs text-on-primary-container animate-pulse">
              <p className="font-semibold">{simulatedSMS}</p>
            </div>
          )}

          {/* Alternate Password link */}
          <div className="flex justify-end">
            <span 
              onClick={() => {
                setPhoneNumber('13800138000');
                setVerificationCode('123456');
                setWarning('');
              }}
              className="text-xs text-on-surface-variant hover:text-primary cursor-pointer border-b border-dashed border-on-surface-variant/40"
            >
              使用测试账号快捷填入
            </span>
          </div>

          {/* Login Action button */}
          <button
            onClick={handleLoginClick}
            className="w-full bg-primary text-white rounded-full py-4 text-base font-semibold shadow-[0_4px_15px_rgba(45,70,53,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>进入社区</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-2 w-full px-2 mb-6">
          <input
            className="mt-1 rounded text-primary focus:ring-primary border-outline-variant w-4 h-4 cursor-pointer"
            id="agreement"
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setWarning('');
            }}
          />
          <label className="text-xs text-on-surface-variant cursor-pointer select-none" htmlFor="agreement">
            我已阅读并同意
            <a className="text-primary hover:underline font-medium" href="#" onClick={(e) => { e.preventDefault(); setAgreed(!agreed); }}>《用户协议》</a>
            与
            <a className="text-primary hover:underline font-medium" href="#" onClick={(e) => { e.preventDefault(); setAgreed(!agreed); }}>《隐私政策》</a>
          </label>
        </div>

        {/* Alternate login channels */}
        <div className="w-full flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-outline-variant/50"></div>
          <span className="text-xs text-outline font-medium">其他方式登录</span>
          <div className="flex-1 h-px bg-outline-variant/50"></div>
        </div>

        <div className="flex gap-6 justify-center">
          <button 
            onClick={() => { setAgreed(true); setPhoneNumber('15921820391'); setVerificationCode('6688'); }}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#07C160] hover:scale-110 transition-transform duration-200 border border-outline-variant/40"
            title="微信快捷登录"
          >
            <span className="material-symbols-outlined text-2xl">chat</span>
          </button>
          <button 
            onClick={() => { setAgreed(true); setPhoneNumber('18698201292'); setVerificationCode('8899'); }}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-inverse-surface hover:scale-110 transition-transform duration-200 border border-outline-variant/40"
            title="Apple 账户登录"
          >
            <span className="material-symbols-outlined text-2xl">apps</span>
          </button>
        </div>
      </div>
    </div>
  );
}
