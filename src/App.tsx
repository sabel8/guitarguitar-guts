import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import { Home } from './components/Home';

interface IStores {
}

class App extends React.Component {
  private stores: IStores;

	constructor(props: any) {
		super(props);

		this.stores = {
		};
	}

	render() {
		return (
			<Provider {...this.stores}>
				<Home />
			</Provider>
		);
	}
}

export default App;
