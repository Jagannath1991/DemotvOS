// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';

// import HomePage from './src/pages/homePage/HomePage';
// import APIError from './src/pages/apiErrorPage/APIError';
// import LoaderScreen from './src/pages/loaderScreen/LoaderScreen';
// import ExitPage from './src/pages/exitPage/ExitPage';
// import NoInternetError from './src/pages/noInternetError/NoInternetError';
// import Player from './src/componets/player/Player';
// import {MessageProvider} from './src/context/MessageProvider';
// import LivePlayer from './src/componets/player/LivePlayer';
// import AppNavigator from './src/componets/navigation/AppNavigator';
// import TestRemote from './src/componets/TestRemote';

// function App() {
//   return (
//     // <LoaderScreen />

//     // <APIError />
//     // <ExitPage />
//     // <NoInternetError />
//     <MessageProvider>
//       {/* <HomePage /> */}
//       <AppNavigator />
//     </MessageProvider>
//     // <Player />
//     // <LivePlayer />
//     // <TestRemote />
//   );
// }

// export default App;
import React from 'react';
import {MessageProvider} from './src/context/MessageProvider';
import {NetworkProvider} from './src/context/NetworkContext'; // Import the NetworkProvider context
import AppNavigator from './src/componets/navigation/AppNavigator';

function App() {
  return (
    <NetworkProvider>
      <MessageProvider>
        <AppNavigator />
      </MessageProvider>
    </NetworkProvider>
  );
}

export default App;
