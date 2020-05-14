import { hot } from 'react-hot-loader/root';
import "reflect-metadata";
import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import LoadingPage from './LoadingPage';

if(process.env.NODE_ENV === 'production') {
    console.log = () => {}
}

console.log('hai')

const App = React.lazy(() => import('./App'))

const AppComponent = () => {
    return(
        <Suspense fallback={<LoadingPage />}>
            <App />
        </Suspense>
    )
  
}

const Root = hot(AppComponent)

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
