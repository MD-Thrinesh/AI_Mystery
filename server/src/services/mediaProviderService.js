export const mediaProviderService = {
  async generateImage(_prompt) {
    return {
      assetId: 'asset_img_demo',
      status: 'ready',
      url: '/images/demo-scene.png',
    };
  },

  async generateVideo(_prompt) {
    return {
      assetId: 'asset_vid_demo',
      status: 'fallback',
      url: null,
      note: 'Video generation unavailable; a clearly labeled CCTV fallback is used instead.',
    };
  },
};
