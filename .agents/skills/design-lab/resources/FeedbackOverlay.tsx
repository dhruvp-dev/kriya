'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface FeedbackComment {
  id: string;
  variantId: string;
  selector: string;
  elementLabel: string;
  text: string;
  x: number;
  y: number;
}

export interface FeedbackOverlayProps {
  targetName?: string;
  onFeedbackSubmit?: (formattedMarkdown: string) => void;
}

export function FeedbackOverlay({ targetName = 'UI Component', onFeedbackSubmit }: FeedbackOverlayProps) {
  const [isActive, setIsActive] = useState(false);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [hoveredEl, setHoveredEl] = useState<{ rect: DOMRect; selector: string; label: string } | null>(null);
  const [activeCommentTarget, setActiveCommentTarget] = useState<{
    variantId: string;
    selector: string;
    label: string;
    x: number;
    y: number;
  } | null>(null);
  const [draftCommentText, setDraftCommentText] = useState('');
  const [overallDirection, setOverallDirection] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to construct a reasonable CSS selector and readable label for an element
  const getElementDetails = useCallback((el: HTMLElement) => {
    let variantId = 'General';
    let current: HTMLElement | null = el;
    while (current) {
      if (current.dataset && current.dataset.variant) {
        variantId = current.dataset.variant;
        break;
      }
      current = current.parentElement;
    }

    let selector = el.tagName.toLowerCase();
    if (el.id) {
      selector = `#${el.id}`;
    } else if (el.getAttribute('data-testid')) {
      selector = `[data-testid='${el.getAttribute('data-testid')}']`;
    } else if (el.className && typeof el.className === 'string' && el.className.trim()) {
      const firstClass = el.className.trim().split(/\s+/)[0];
      if (firstClass) selector = `.${firstClass}`;
    }

    const tag = el.tagName.toLowerCase();
    const textSnippet = el.textContent?.trim().slice(0, 24) || '';
    const label = textSnippet ? `${tag} ("${textSnippet}${textSnippet.length >= 24 ? '...' : ''}")` : tag;

    return { variantId, selector, label };
  }, []);

  // Handle pointer hover in inspection mode
  useEffect(() => {
    if (!isActive) {
      setHoveredEl(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('[data-feedback-ui="true"]')) {
        setHoveredEl(null);
        return;
      }

      const rect = target.getBoundingClientRect();
      const { selector, label } = getElementDetails(target);
      setHoveredEl({ rect, selector, label });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, getElementDetails]);

  // Handle pointer click to drop a comment pin
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    const target = e.target as HTMLElement;
    if (target.closest('[data-feedback-ui="true"]')) return;

    e.preventDefault();
    e.stopPropagation();

    const { variantId, selector, label } = getElementDetails(target);
    setActiveCommentTarget({
      variantId,
      selector,
      label,
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
    setDraftCommentText('');
  };

  const handleAddComment = () => {
    if (!activeCommentTarget || !draftCommentText.trim()) return;

    const newComment: FeedbackComment = {
      id: Math.random().toString(36).substring(2, 9),
      variantId: activeCommentTarget.variantId,
      selector: activeCommentTarget.selector,
      elementLabel: activeCommentTarget.label,
      text: draftCommentText.trim(),
      x: activeCommentTarget.x,
      y: activeCommentTarget.y,
    };

    setComments((prev) => [...prev, newComment]);
    setActiveCommentTarget(null);
    setDraftCommentText('');
  };

  const handleRemoveComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const generateMarkdownFeedback = () => {
    const grouped: Record<string, FeedbackComment[]> = {};
    comments.forEach((c) => {
      if (!grouped[c.variantId]) grouped[c.variantId] = [];
      grouped[c.variantId].push(c);
    });

    let md = `## Design Lab Feedback\n\n`;
    md += `**Target:** ${targetName}\n`;
    md += `**Total Comments:** ${comments.length}\n\n`;

    Object.keys(grouped).sort().forEach((vKey) => {
      md += `### Variant ${vKey}\n`;
      grouped[vKey].forEach((c, idx) => {
        md += `${idx + 1}. **${c.elementLabel}** (\`${c.selector}\`)\n   "${c.text}"\n`;
      });
      md += `\n`;
    });

    if (overallDirection.trim()) {
      md += `### Overall Direction\n${overallDirection.trim()}\n`;
    }

    return md;
  };

  const handleCopyFeedback = () => {
    const formatted = generateMarkdownFeedback();
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    if (onFeedbackSubmit) onFeedbackSubmit(formatted);
  };

  return (
    <>
      {/* Visual Inspector Click Catch-All when active */}
      {isActive && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[9990] cursor-crosshair select-none pointer-events-auto"
          style={{ background: 'rgba(59, 130, 246, 0.03)' }}
        />
      )}

      {/* Hover outline */}
      {isActive && hoveredEl && (
        <div
          className="fixed z-[9991] pointer-events-none border-2 border-indigo-500 bg-indigo-500/10 rounded transition-all duration-75 flex items-start justify-start p-1"
          style={{
            top: hoveredEl.rect.top,
            left: hoveredEl.rect.left,
            width: hoveredEl.rect.width,
            height: hoveredEl.rect.height,
          }}
        >
          <span className="bg-indigo-600 text-white text-[10px] font-mono font-medium px-1.5 py-0.5 rounded shadow-sm">
            {hoveredEl.label}
          </span>
        </div>
      )}

      {/* Placed Pin Markers */}
      {comments.map((c, index) => (
        <div
          key={c.id}
          className="absolute z-[9992] flex items-center justify-center w-7 h-7 bg-indigo-600 text-white rounded-full font-bold text-xs shadow-lg ring-2 ring-white hover:scale-110 transition-transform cursor-pointer"
          style={{ top: c.y - 14, left: c.x - 14 }}
          onClick={() => setIsDrawerOpen(true)}
          title={`Variant ${c.variantId}: ${c.text}`}
        >
          {index + 1}
        </div>
      ))}

      {/* Add Comment Dialog */}
      {activeCommentTarget && (
        <div
          data-feedback-ui="true"
          className="fixed z-[9999] bg-gray-900 border border-gray-700 text-white rounded-xl shadow-2xl p-4 w-80 max-w-[90vw]"
          style={{
            top: Math.min(activeCommentTarget.y - window.scrollY + 10, window.innerHeight - 220),
            left: Math.min(activeCommentTarget.x - window.scrollX + 10, window.innerWidth - 340),
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Variant {activeCommentTarget.variantId} • {activeCommentTarget.label}
            </span>
            <button
              onClick={() => setActiveCommentTarget(null)}
              className="text-gray-400 hover:text-gray-200 text-xs px-1"
            >
              ✕
            </button>
          </div>
          <textarea
            autoFocus
            rows={3}
            value={draftCommentText}
            onChange={(e) => setDraftCommentText(e.target.value)}
            placeholder="Type feedback for this element..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setActiveCommentTarget(null)}
              className="px-3 py-1.5 text-xs text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!draftCommentText.trim()}
              className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-md shadow"
            >
              Save Pin
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div
        data-feedback-ui="true"
        className="fixed bottom-5 right-5 z-[9995] flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-gray-700/80 px-4 py-2.5 rounded-full shadow-2xl text-white select-none"
      >
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isActive
              ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 animate-pulse'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
          }`}
        >
          <span className="text-sm">{isActive ? '🎯' : '💬'}</span>
          {isActive ? 'Click Element to Comment' : 'Add Feedback'}
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-full transition-all"
        >
          <span>📋</span> Comments
          {comments.length > 0 && (
            <span className="ml-1 bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {comments.length}
            </span>
          )}
        </button>
      </div>

      {/* Feedback Drawer / Modal */}
      {isDrawerOpen && (
        <div data-feedback-ui="true" className="fixed inset-0 z-[9998] flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 text-white border-l border-gray-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-100">Design Feedback Summary</h3>
                <p className="text-xs text-gray-400">{targetName} • {comments.length} pins created</p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-xs">
                  No visual pins dropped yet.<br />Click "Add Feedback" and click any element to leave comments!
                </div>
              ) : (
                comments.map((c, i) => (
                  <div key={c.id} className="bg-gray-800/80 border border-gray-700/60 rounded-lg p-3 relative group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                        Pin #{i + 1} • Variant {c.variantId}
                      </span>
                      <button
                        onClick={() => handleRemoveComment(c.id)}
                        className="text-gray-500 hover:text-red-400 text-xs opacity-80 group-hover:opacity-100"
                        title="Delete pin"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 mb-1.5 truncate">
                      {c.elementLabel}
                    </div>
                    <p className="text-sm text-gray-200 leading-snug">{c.text}</p>
                  </div>
                ))
              )}

              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Overall Direction / Decision:
                </label>
                <textarea
                  rows={3}
                  value={overallDirection}
                  onChange={(e) => setOverallDirection(e.target.value)}
                  placeholder="e.g. Go with Variant B's layout, but use Variant A's color palette."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/90">
              <button
                onClick={handleCopyFeedback}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>{copied ? '✅' : '📋'}</span>
                {copied ? 'Feedback Copied to Clipboard!' : 'Submit & Copy Feedback for Agent'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackOverlay;
