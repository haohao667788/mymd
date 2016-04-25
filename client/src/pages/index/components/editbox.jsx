import {Component} from 'react';
import Codemirror from 'react-codemirror';

import 'mode-markdown';
import 'mode-markdown-styles';

class EditBox extends Component {

	constructor(props, context) {
		super(props, context);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.needUpdate;
	}

	render() {
		let options = {
			mode: 'markdown',
			lineNumbers: true,
			lineWrapping: true,
			tabSize: 2
		};
		return <div className="editBox">
			<Codemirror 
				className='editCon'
				ref='editor'
				value={this.props.code}
				onChange={newCode => this.onTextChange(newCode)}
				options={options}
			/>
		</div>;
	}

	onTextChange(code) {
		this.props.onTextChange(code);
	}
}

export default EditBox;