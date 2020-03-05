import React from 'react';
import Axios from 'axios';
import Button from '../components/ui/Button';
import BaseLayout from '../components/layout/base';
import Icon from '../components/ui/Icon';
import LandDetail from '../components/land/detail';

class LandDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner: '',
      location: '',
      area: 0,
      status: '',
      uses: [],
      plots_count: 0,
      coordinates: [],
      attributes: '',
      photograph: '',
    };
  }

  componentDidMount() {
    const { landId } = this.props.match.params;
    this.fetchLand(landId);
  }

  fetchLand(landId) {
    const self = this;
    Axios.get(`/api/land/${landId}`)
      .then(response => {
        const metadata = response.data.metadata || {};
        self.setState({
          name: response.data.name,
          owner: response.data.owner,
          location: response.data.location,
          area: response.data.area_size,
          status: metadata.status,
          uses: metadata.uses,
          plots_count: response.data.plots_count,
          coordinates: response.data.coordinates,
          attributes: metadata.attributes,
          photograph: response.data.photographURL,
        });
      })
      .catch(err => {
        window.alert(err);
      });
  }

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };

  handleOnClose = () => {
    this.props.history.push('/map');
  };

  render() {
    const id = this.props.match.params.landId;
    const {
      name,
      owner,
      location,
      area,
      status,
      uses,
      plots_count,
      coordinates,
      attributes,
      photograph,
    } = this.state;
    return (
      <BaseLayout
        dark
        darkHeader
        header={
          <div className="page-title">
            <h2>
              TARJETA
              <br />
              DE PROPUESTA
            </h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}>
                  <Icon type="close" />
                </Button>
              </li>
            </ul>
          </div>
        }
        footerRightComponent={
          <Button
            className="m33-btn ant-btn-xlg"
            size="large"
            type="secondary"
            onClick={this.handleOnAddProposal}
            bordered
          >
            <Icon type="plus" />
          </Button>
        }
      >
        <LandDetail
          id={id}
          name={name}
          owner={owner}
          location={location}
          area={area}
          status={status}
          uses={uses}
          plots_count={plots_count}
          coordinates={coordinates}
          attributes={attributes}
          photograph={photograph}
        />
      </BaseLayout>
    );
  }
}

export default LandDetailContainer;
