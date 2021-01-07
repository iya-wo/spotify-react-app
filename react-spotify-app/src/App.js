import React from 'react';
import axios from 'axios';
import io from 'socket.io';
import './App.css';
import Typical from 'react-typical';

const App = (props) => { let interval;
const itemDefault = {
  album: {
    images: [{ url: "" }]
  },
  name: "",
  artists: [{ name: "" }],
  duration_ms: 0
};

const [item, setItem] = useState(itemDefault);
const [isPlaying, setIsPlaying] = useState("Paused");
const [progressms, setProgressms] = useState(0);
const [repeatState, setRepeatState] = useState();
const [shuffleState, setShuffleState] = useState();
const [device, setDevice] = useState();

const [data, setData] =  useState(true);

useEffect(() => {
  let token = hash.access_token;
  const backendEndpoint = 'https://https://chat-app-v2020.herokuapp.com/';
  const socket = io(backendEndpoint, {transports: ['websocket']});

  socket.emit('join', {
    name: '',
    room: ''
  }, () => {});
  socket.emit('disconnect');

  if (token) {
    setToken(token);
    getCurrentlyPlaying(token);
  }

  interval = setInterval(() => {
    tick(token);
  }, 1000);

  return () => {
    clearInterval(interval);
  }
}, [])

const tick = (token) => {
  if(token) {
    getCurrentlyPlaying(token);
  }
}

const getCurrentlyPlaying = (token) => {
  axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(({ data }) => {
    if(!data) {
      setData(data);
      return;
    }

    setItem(data.item);
    setIsPlaying(data.is_playing);
    setProgressms(data.progress_ms);
    setShuffleState(data.shuffle_state);
    setRepeatState(data.repeat_state);
    setDevice(data.device.name);
    setData(true);
  });
}

}

// // function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>Hi, I'm Abi</h1>

//         <p>
//           I am a {' '}
          
//           <Typical 
//             loop={Infinity}
//             wrapper="b"
//             steps={[
//               'developer',
//               1000,
//               'artist',
//               1000,
//               'student',
//               1000,
//               'teacher',
//               1000
//             ]}
//           />
//         </p>
//       </header> */}
//     </div>
//   );
// }

export default App;
