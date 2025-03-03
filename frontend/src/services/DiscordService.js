import React from 'react';
import axios from 'axios';

function DiscordService(clearForm) {
  const Send = async (data, url) => {
    const body = {
      content: 'Message Received',
      tts: false,
      color: 'white',
      embeds: [
        {
          description: data,
        },
      ],
    };

    try {
      const data = await axios.post(
        'https://discord.com/api/webhooks/1346125951158718486/kiMCPpjkqpUEGb4Q78IiMnFdTH5lTyQDulXrmuIbo6CTxfJmi_xhacfxKFCTZMUrptq5',
        body
      );
      console.log(data);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    Send,
  };
}

export default DiscordService;
