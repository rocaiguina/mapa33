import React from 'react';
import { Col, Row } from 'antd';

class AboutUs extends React.Component {
  render() {
    return (
      <div className="contactstyle m-b-15">
        <Row>
          <Col md={16}>
            <br />
            <br />
            <br />
            <div className="m-b-30">
              <h2>Sobre&nbsp;</h2>
              <img src={'/images/logo-white.png'} className="img-responsive" />
            </div>
            <p>
              Mapa-33 es una herramienta diseñada para integrar la participación ciudadana en la conservación de terrenos. Debido a las situaciones  nuestra meta común: la conservación del 33% de los terrenos en Puerto Rico para el 2033. 
            </p>
            <p>
              Los Estados Unidos y Costa Rica dedican un 26% de su territorio a la conservación y nuestros vecinos antillanos en la República Dominicana un 24%, Cuba 17% e Islas Vírgenes—cuyo sustento depende casi completamente del turismo—protege hasta el 52% de su territorio.
            </p>
            <p>
              Sin embargo en Puerto Rico el total de los terrenos protegidos por entidades gubernamentales y privadas es de solamente un 16%. Nuestra meta es ambiciosa y a largo plazo, pero creemos que es posible alcanzarla si se convierte en la meta común de todos.
            </p>
            <p>
              A través de esta plataforma puedes proponer terrenos que, después de un proceso de evaluación, serán propuestas visibles en la herramienta. También puedes apoyar propuestas que ya estén en el mapa ayudándoles a lograr un mayor alcance y exposición. 
            </p>
            <p>
              La conservación es un esfuerzo colectivo y es por eso que juntos crearemos el mapa del 2033. 
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AboutUs;
