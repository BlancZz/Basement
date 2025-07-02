import axios from 'axios';

function DiscordService(clearForm) {
  const Send = async (data) => {
    try {
      await axios.post('https://basement-1.onrender.com/api/discord', {
        data: data,
      });
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
