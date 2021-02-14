import React from 'react';
import { Col, Row } from 'antd';

class FrequentQuestions extends React.Component {
  render() {
    return (
      <div className="frequentstyle m-b-15">
        <Row>
          <Col md={16}>
            <h3>¿Quién es Para La Naturaleza?</h3>
            <p>
              Para la Naturaleza es una organización sin fines de lucro que agrupa a todas las personas que buscamos un futuro sustentable para Puerto Rico, donde nuestros hijos puedan crecer en ciudades habitables, nadar en ríos de agua cristalina y alimentarse de los frutos de nuestra tierra.
            </p>
            <p>
              Facilitamos experiencias transformativas en la naturaleza, además de conservar terrenos de alto valor ecológico. Fomentamos la toma de responsabilidad por nuestros recursos naturales e impulsamos política pública para su protección.
            </p>
            <p>
              Con más de cuarenta años trabajando junto a otras organizaciones por la protección de la naturaleza en nuestras islas, hemos identificado una meta común a todos los puertorriqueños comprometidos con la conservación.<br />
              Para más información, visita
              <a
                style={{ color: '#ffffff', textDecoration: 'none' }}
                href="https://www.paralanaturaleza.org"
              >
                paralanaturaleza.org
              </a>
            </p>
            <br />
            <h3>¿Qué es Mapa-33?</h3>
            <p>
              Mapa 33 es un espacio virtual dedicado a fomentar la participación ciudadana en la identificación, visualización y proceso de selección de áreas con valor ecológico y cultural en Puerto Rico que merecen ser conservados o protegidos. 
            </p>
            <br />
            <h3>¿Por qué el Mapa-33?</h3>
            <p>
              En Para La Naturaleza, estamos convencidos que el progreso, salud y bienestar de los habitantes de Puerto Rico depende de la protección y uso sustentable de su territorio. La proporción áreas protegidas en Puerto Rico, en 2013, era solamente 8%. Gracias a los esfuerzos conjuntos de organizaciones públicas y privadas, tenemos hoy un 16% de nuestro territorio designado como áreas protegidas y nos proponemos que sea 33% para el 2033. En Para La Naturaleza, estamos convencidos que la mejor manera de lograr esta meta es fomentando la participación ciudadana.
            </p>
            <br />
            <h3>¿Quién puede participar en Mapa-33?</h3>
            <p>
              La herramienta es abierta y de visualización pública. Cualquier persona puede participar en una o varias de las siguientes modalidades: (1) como proponente para la conservación de un terreno, (2) para apoyar las propuestas hechas, por otras personas, o (3) para apoyar programas de conservación o uso sustentable de áreas protegidas existentes.
            </p>
            <br />
            <h3>¿Cómo funciona el Mapa-33?</h3>
            <p>
              La transformación del mapa de Puerto Rico será representada de forma progresiva en Mapa-33. La visualización de áreas de valor ecológico y cultural irá creciendo en la medida que las personas propongan terrenos para conservación o uso sustentable. Cada propuesta nos permitirá acercarnos a nuestra meta común de conservación para el año 2033.
            </p>
            <br />
            <h3>¿Cómo se utilizará la información recopilada por el mapa?</h3>
            <p>
              La información generada en este mapa (propuestas sometidas y apoyo del público a cada propuesta) nos ayudará a comprender cuales son las áreas más importantes para nuestra gente. Nos ayudará también a dedicar recursos institucionales y programas educativos para personas, organizaciones o instituciones que se comprometan con la elaboración de propuestas de conservación.
            </p>
            <br />
            <h3>¿Cómo es el proceso de publicación de propuestas? </h3>
            <p>
              Cada propuesta es única. Debido a que las especificaciones de cada terreno varían por su ubicación, cada propuesta debe ser evaluada por separado. Una vez se evalúe el contenido, nos comunicaremos mediante un correo electrónico informándote de la publicación de la propuesta y ofreciendo información adicional sobre posibilidades y mecanismos de conservación. 
            </p>
            <br />
            <h3>
            ¿Qué mejora la posibilidad de que mi propuesta sea publicada?
            </h3>
            <p>
              Contestar las preguntas del formulario con la información correcta y conocer el área, además de cualquier historial de conservación.
            </p>
            <br /> 
            <h3>
            ¿Qué complica la posibilidad de que mi propuesta sea publicada?
            </h3>
            <p>
              Ofrecer poca información respecto al área propuesta. Escoger áreas ya urbanizadas. Escoger espacios ya conservados. Hacer mal uso de la herramienta.
            </p>
            <br />
            <h3>
            ¿Cómo puedo compartir y buscar aliados para las propuestas publicadas?
            </h3>
            <p>
              Puedes compartir tu propuesta usando los enlaces en la Tarjeta de la Propuesta e invitando a la gente a apoyar el espacio que propones.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default FrequentQuestions;