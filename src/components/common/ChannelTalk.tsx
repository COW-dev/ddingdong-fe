'use client';

import { boot, loadScript } from '@channel.io/channel-web-sdk-loader';

export function ChannelTalk() {
  let channelTalkDidInit = false;

  if (typeof window !== 'undefined' && !channelTalkDidInit) {
    channelTalkDidInit = true;
    loadScript();
    boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN ?? '',
    });
  }
  return null;
}
