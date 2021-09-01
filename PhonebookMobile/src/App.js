import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import rootReducer from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<Router />
			</Provider>
		</NavigationContainer>
	);
};

export default App;