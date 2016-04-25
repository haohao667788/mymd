import {Component} from 'react';

import EditBox from './editbox';
import ShowBox from './showbox';
import MyMenu from './menu';

let markdown = '';

class Root extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			code: markdown,
			needUpdate: true
		};
		this.modified = false;
	} 

	componentDidMount() {
		this.setState({
			needUpdate: false
		});
	}

	render() {
		return <div className="wrapper">
		<MyMenu 
			onFileOpen={code => this.onFileOpen(code)}
			onFileSave={() => this.onFileSave()}
			code={this.state.code}
		/>
		<EditBox 
			code={this.state.code}
			needUpdate={this.state.needUpdate}
			onTextChange={code => this.onTextChange(code)}
		/>
		<ShowBox code={this.state.code}/>
		</div>;
	}

	onTextChange(code) {
		if (!this.modified) {
			document.title = '*' + document.title;
			this.modified = true;
		}
		this.setState({'code': code, 'needUpdate': false});
	}

	onFileSave() {
		this.modified = false;
	}

	onFileOpen(code) {
		this.setState({'code': code, 'needUpdate': true});
	}
}

export default Root;