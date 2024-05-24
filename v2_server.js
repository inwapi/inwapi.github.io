// Function to get query parameter by name
function getQueryParam(param) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to fetch JSON data and setup JW Player
async function fetchAndPlay() {
  try {
    // Get the id from query string
    const id = getQueryParam('id');
    if (!id) {
      document.getElementById('Zuika').innerText = 'No ID provided';
      return;
    }

    // Fetch JSON data from the constructed URL
    const jsonUrl = `https://streaming360.online/movie/tvmoviehd/data/${id}.json`;
    const response = await fetch(jsonUrl);
    const jsonData = await response.json();
    
    // Extract the m3u8_url from the JSON data
    const videoUrl = jsonData.m3u8_url;

    // Setup JW Player with the m3u8_url
    if (videoUrl) {
      const playerInstance = jwplayer('Zuika');
      playerInstance.setup({
        mute: false,
        menu: true,
        allowscriptaccess: 'always',
        wmode: 'opaque',
        sources: [
          {
            file: videoUrl,
            type: "hls"
          }
        ],
        image: '',
        width: '100%',
        height: '100%',
        autostart: true,
        primary: 'html5'
      });
      playerInstance.addButton(
        '',
        '',
        function() {  
          window.open(playerInstance.getPlaylistItem()['file'], '_blank').blur();
        },
        'download'
      );
    } else {
      document.getElementById('Zuika').innerText = 'No video URL provided';
    }
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    document.getElementById('Zuika').innerText = 'Failed to load video';
  }
}

// Call the function to fetch JSON data and play the video
fetchAndPlay();
