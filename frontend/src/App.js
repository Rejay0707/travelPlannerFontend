

import React, { useState } from 'react';
import WelcomePage from "./components/WelcomePage";
import { Provider } from 'react-redux';
import store from "./components/store";
import TripRegistration from './components/TripRegisteration';
import TripList from './components/TripList';
import ToastCON from './components/toastify'

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    const handleWelcomeComplete = () => {
        setShowWelcome(false);
    };

    return (
        <Provider store={store}>
            <div className="App">
                {showWelcome ? (
                    <WelcomePage onComplete={handleWelcomeComplete} duration={3000} />
                ) : (
                    <>
                <h1>Add a New Trip</h1>
            <TripRegistration />
            <br /><br />
            <TripList />
            <ToastCON />
                        
                    </>
                )}
            </div>
        </Provider>
    );
}

export default App;


