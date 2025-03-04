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
        atob(
          'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM0NjM2ODYzMjgyNDc5NTE4Ni9JQWVULW9WU0VVeUkwTEZzLV92MTNrOVRudFBFaFNYNlZSOXY2d29sX0dKdDNDX3pQN1JWWUJPV0d4TXFWNVh4Y29Ucw=='
        ),
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
