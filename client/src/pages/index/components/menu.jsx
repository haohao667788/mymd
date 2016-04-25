import fs from 'fs';
import path from 'path';
import {remote} from 'electron';
import {Component} from 'react';

class MyMenu extends Component {

	constructor(props, context) {
		super(props, context);
		this.template = [
			{
				label: 'File',
				submenu: [
					{
						label: 'Open...',
						accelerator: 'CmdOrCtrl+O',
						click: (item, focusedWindow) => {
		          remote.dialog.showOpenDialog({
		          	title: 'Open a file',
		          	properties: ['openFile']
		          }, filenames => {
		          	let filename = this.filename = filenames[0];
		          	let name = path.basename(filename);
		          	document.title = name;
		          	fs.readFile(filename, 'utf-8', (err, data) => {
		          		this.props.onFileOpen(data);
		          	});
		          })
		        }	
					}, {
						label: 'Save',
						accelerator: 'CmdOrCtrl+S',
						click: (item, focusedWindow) => {
							let code = this.props.code;
							if (this.filename) {
								let name = path.basename(this.filename);
								fs.writeFile(this.filename, code, () => {
									document.title = name;	
									this.props.onFileSave();
								});
							} else {
								remote.dialog.showSaveDialog({}, filename => {
									fs.writeFile(filename, code, () => {
										document.title = path.basename(filename);	
										this.filename = filename;
										this.props.onFileSave();
									});
								});
							}
						}
					}
				]
			}, {
		    label: 'Edit',
		    submenu: [
		      {
		        label: 'Undo',
		        accelerator: 'CmdOrCtrl+Z',
		        role: 'undo'
		      },
		      {
		        label: 'Redo',
		        accelerator: 'Shift+CmdOrCtrl+Z',
		        role: 'redo'
		      },
		      {
		        type: 'separator'
		      },
		      {
		        label: 'Cut',
		        accelerator: 'CmdOrCtrl+X',
		        role: 'cut'
		      },
		      {
		        label: 'Copy',
		        accelerator: 'CmdOrCtrl+C',
		        role: 'copy'
		      },
		      {
		        label: 'Paste',
		        accelerator: 'CmdOrCtrl+V',
		        role: 'paste'
		      },
		      {
		        label: 'Select All',
		        accelerator: 'CmdOrCtrl+A',
		        role: 'selectall'
		      },
		    ]
		  },
		  {
		    label: 'View',
		    submenu: [
		      {
		        label: 'Reload',
		        accelerator: 'CmdOrCtrl+R',
		        click: function(item, focusedWindow) {
		          if (focusedWindow)
		            focusedWindow.reload();
		        }
		      },
		      {
		        label: 'Toggle Full Screen',
		        accelerator: (function() {
		          if (process.platform == 'darwin')
		            return 'Ctrl+Command+F';
		          else
		            return 'F11';
		        })(),
		        click: function(item, focusedWindow) {
		          if (focusedWindow)
		            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
		        }
		      },
		      {
		        label: 'Toggle Developer Tools',
		        accelerator: (function() {
		          if (process.platform == 'darwin')
		            return 'Alt+Command+I';
		          else
		            return 'Ctrl+Shift+I';
		        })(),
		        click: function(item, focusedWindow) {
		          if (focusedWindow)
		            focusedWindow.toggleDevTools();
		        }
		      },
		    ]
		  },
		  {
		    label: 'Window',
		    role: 'window',
		    submenu: [
		      {
		        label: 'Minimize',
		        accelerator: 'CmdOrCtrl+M',
		        role: 'minimize'
		      },
		      {
		        label: 'Close',
		        accelerator: 'CmdOrCtrl+W',
		        role: 'close'
		      },
		    ]
		  },
		  {
		    label: 'Help',
		    role: 'help',
		    submenu: [
		      {
		        label: 'Learn More',
		        click: function() { require('electron').shell.openExternal('http://electron.atom.io') }
		      },
		    ]
		  },
		];
		if (process.platform == 'darwin') {
		  var name = require('electron').remote.app.getName();
		  this.template.unshift({
		    label: name,
		    submenu: [
		      {
		        label: 'About ' + name,
		        role: 'about'
		      },
		      {
		        type: 'separator'
		      },
		      {
		        label: 'Services',
		        role: 'services',
		        submenu: []
		      },
		      {
		        type: 'separator'
		      },
		      {
		        label: 'Hide ' + name,
		        accelerator: 'Command+H',
		        role: 'hide'
		      },
		      {
		        label: 'Hide Others',
		        accelerator: 'Command+Alt+H',
		        role: 'hideothers'
		      },
		      {
		        label: 'Show All',
		        role: 'unhide'
		      },
		      {
		        type: 'separator'
		      },
		      {
		        label: 'Quit',
		        accelerator: 'Command+Q',
		        click: function() { remote.require('app').quit(); }
		      },
		    ]
		  });
		  // Window menu.
		  this.template[3].submenu.push(
		    {
		      type: 'separator'
		    },
		    {
		      label: 'Bring All to Front',
		      role: 'front'
		    }
		  );
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return false;
	}

	componentWillMount() {
		let Menu = remote.Menu;
		let menu = Menu.buildFromTemplate(this.template);
		Menu.setApplicationMenu(menu);
	}
}

export default MyMenu;
