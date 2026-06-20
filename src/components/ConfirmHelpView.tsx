import React, { useState } from 'react';

interface ConfirmHelpViewProps {
  transcription: string;
  onBack: () => void;
  onConfirm: (finalContent: string) => void;
}

export default function ConfirmHelpView({ transcription, onBack, onConfirm }: ConfirmHelpViewProps) {
  const [content, setContent] = useState(transcription);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcription);

  const handleSaveEdit = () => {
    setContent(editedText);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 w-full max-w-md mx-auto px-4 py-8 flex flex-col gap-6 relative min-h-[600px] justify-between">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold text-primary">确认求助内容</h1>
        <p className="text-xs text-on-surface-variant font-medium mt-1">请核对以下信息，确认无误后发出</p>
      </header>

      {/* Main Form Fields Checklist card */}
      <div className="bg-surface-container-low rounded-[24px] p-6 shadow-healing border border-[#EAE2D5] flex flex-col gap-5 relative overflow-hidden group">
        {/* soft background circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container rounded-full filter blur-2xl opacity-20"></div>

        {/* Row 1: Type */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-secondary-container text-lg">construction</span>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-on-surface-variant/80 mb-0.5">类型</h3>
            <p className="text-sm font-semibold text-on-surface">借工具</p>
          </div>
        </div>

        <div className="w-full h-px bg-surface-variant/50"></div>

        {/* Row 2: Content (Editable inline!) */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary-container text-lg">description</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <h3 className="text-[11px] font-bold text-on-surface-variant/80">内容</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSaveEdit();
                  } else {
                    setEditedText(content);
                    setIsEditing(true);
                  }
                }}
                className="text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-xs">{isEditing ? 'done' : 'edit'}</span>
                {isEditing ? '保存' : '修改'}
              </button>
            </div>

            {isEditing ? (
              <textarea
                rows={2}
                className="w-full bg-white border border-outline rounded-lg p-2 text-xs text-on-surface focus:ring-1 focus:ring-primary outline-none"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <p className="text-xs font-semibold text-on-surface text-pretty leading-relaxed">
                {content}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-surface-variant/50"></div>

        {/* Row 3: Location */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-tertiary-container text-lg">location_on</span>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-on-surface-variant/80 mb-0.5">位置</h3>
            <p className="text-sm font-semibold text-on-surface flex items-center gap-1.5 flex-wrap">
              <span>青年路社区附近</span>
              <span className="text-outline text-xs font-medium bg-surface px-2 py-0.5 rounded-md border border-outline-variant/30">(模糊位置)</span>
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-surface-variant/50"></div>

        {/* Row 4: Visibility */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">visibility</span>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-on-surface-variant/80 mb-0.5">可见范围</h3>
            <p className="text-sm font-semibold text-on-surface">同小区邻居可见</p>
          </div>
        </div>

        <div className="w-full h-px bg-surface-variant/50"></div>

        {/* Row 5: Time remaining */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-error-container text-lg">timer</span>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-on-surface-variant/80 mb-0.5">有效时间</h3>
            <p className="text-sm font-bold text-error">30 分钟</p>
          </div>
        </div>
      </div>

      {/* Primary Actions Button array */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => onConfirm(content)}
          className="w-full py-4 bg-primary text-on-primary rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(74,101,69,0.3)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          确认发出
        </button>
        <button
          onClick={onBack}
          className="w-full py-3.5 bg-secondary-container text-on-secondary-container rounded-full font-semibold text-xs hover:bg-secondary-fixed active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          重新录入语音
        </button>
        <button
          onClick={onBack}
          className="w-full py-2.5 text-on-surface-variant hover:text-on-surface text-xs font-semibold hover:bg-surface-container/30 rounded-full transition-colors cursor-pointer"
        >
          取消求助
        </button>
      </div>

      {/* Privacy Guarantee Note */}
      <div className="text-center mt-2 flex items-center justify-center gap-1.5 text-outline">
        <span className="material-symbols-outlined text-[16px]">shield</span>
        <p className="text-xs font-medium">您的具体门牌号等隐私信息将受到保护</p>
      </div>
    </div>
  );
}
