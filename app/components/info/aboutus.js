import React from 'react';
import BaseLayout from '../layout/base';
import {
  Button,
  Col,
  Input,
  Row,
  DatePicker,
  Select,
  Checkbox,
  Typography,
} from 'antd';

class AboutUs extends React.Component {

  render () {
    return (
        <div className="contactstyle" >
            <Row>
                <div style={{marginBottom: "35px"}}>
                    <h2>Sobre&nbsp;</h2>
                    <img src={'/images/logo-white.png'} className="img-responsive" />
                </div>
                <p>
                    Mapa-33 es una herramienta para lograr nuestra meta común: la conservación del 33% de los terrenos en Puerto Rico para el 2033.Los Estados Unidos continentales y Costa Rica dedican un 26% de su territorio a la conservación y nuestros vecinos antillanos en la República Dominicana un 24%, Cuba 17% e Islas Vírgenes—cuyo sustento depende casi completamente del turismo—protege hasta el 52% de su territorio.
                    Sin embargo en Puerto Rico el total de los terrenos protegidos por entidades gubernamentales y privadas es de solamente un 16%. Nuestra meta es ambiciosa y a largo plazo, pero creemos que es posible alcanzarla si se convierte en la meta común de todos.A través de esta plataforma puedes proponer terrenos que, después de un proceso de evaluación, serán propuestas visibles en la herramienta. También puedes apoyar propuestas que ya estén en el mapa ayudándoles a adelantar su proceso de adquisición.
                    <br/>
                    <br/>
                    La conservación es una gestión colectiva y es por eso que juntos crearemos el mapa del 2033.
                </p>
            </Row>
            
        </div>
        
    );
  }
}
export default AboutUs;