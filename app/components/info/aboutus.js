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
              Mapa-33 es una herramienta diseñada para integrar la participación
              ciudadana en la conservación del archipiélago de Puerto Rico. Esta
              iniciativa surge como respuesta a la meta del país para proteger
              el 33% de los terrenos de Puerto Rico para el 2033.
            </p>
            <p>
              Costa Rica dedica un 28% de su territorio a la conservación y
              nuestros vecinos antillanos en la República Dominicana un 26%,
              Cuba 22% e Islas Vírgenes—cuyo sustento depende casi completamente
              del turismo—protege un 32% de sus territorios. Estados Unidos,
              combinando sus reservas terrestres y marinas, protege un 26% y
              recientemente apoyó la meta global que propone conservar el 30%
              para el 2030. La misma ha sido adoptada por 85 países
              comprometidos con la protección de sus ecosistemas.
            </p>
            <p>
              Sin embargo, el total de los terrenos designados como protegidos
              por entidades gubernamentales y privadas en Puerto Rico es sólo un
              16%. La meta es ambiciosa y a largo plazo, pero creemos que es
              posible alcanzarla si se convierte en una prioridad para todos.
            </p>
            <p>
              Conservar es un esfuerzo de país y es una responsabilidad
              colectiva crear en comunidad el mapa que queremos.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AboutUs;
