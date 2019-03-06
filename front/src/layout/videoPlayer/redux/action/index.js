export const VIDEO_TITLE = 'VIDEO_TITLE';

// 新增歌曲
export function videoTitle(data) {
    return {
        type: VIDEO_TITLE,
        data
    }
}