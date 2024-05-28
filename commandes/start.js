const fortu = (m.quoted || m); 
         const quoted = (fortu.mtype == 'buttonsMessage') ? fortu[Object.keys(fortu)[1]] : (fortu.mtype == 'templateMessage') ? fortu.hydratedTemplate[Object.keys(fortu.hydratedTemplate)[1]] : (fortu.mtype == 'product') ? fortu[Object.keys(fortu)[0]] : m.quoted ? m.quoted : m; 

const audiovn = "./start.mp3";
    const dooc = {
        audio: {
          url: audiovn
        },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Mbuvi-md",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "Hi human, I am on run",
          body: "Mbuvi BOT",
          thumbnailUrl: "https://telegra.ph/file/a7ca8d4777fa8ad977795.jpg",
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
