import {Component} from 'react';
import ReactMarkdown from 'react-markdown';

import '../../../common/styles/markdown/github.css';

class ShowBox extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <div className="showBox">
			<ReactMarkdown source={this.props.code} />
		</div>;
	}
}

export default ShowBox;