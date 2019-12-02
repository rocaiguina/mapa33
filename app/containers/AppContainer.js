import React, { Component } from 'react';
//import { connect } from 'react-redux';

import Map from '../components/Map';
//import { exampleUpdate } from '../redux/reducers/example';

class AppContainer extends Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div>
        <Map />
      </div>
    )
  }
}

/* REDUX CONTAINER */

// const mapStateToProps = ({ example }) => ({ example });

// const mapDispatchToProps = dispatch => ({
//   update: () => dispatch(exampleUpdate())
// });

//export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default AppContainer;
