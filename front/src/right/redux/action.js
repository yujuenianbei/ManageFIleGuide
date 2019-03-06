export const CHAT_PART = 'CHAT_PART';

// 聊天弹窗
export function chatpart(data) {
  return {
    type: CHAT_PART,
    data
  }
}