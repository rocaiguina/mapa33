import React from 'react';
import { Col, Row } from 'antd';

class FrequentQuestions extends React.Component {
  render() {
    return (
      <div className="frequentstyle m-b-15">
        <Row>
          <Col md={16}>
            <h3>1. ¿Qué es Mapa-33?</h3>
            <p>
              Mapa-33 es una herramienta digital dedicada a fomentar la participación ciudadana en la conservación de terrenos en Puerto Rico mediante la identificación, la visualización y el proceso de selección de áreas en el archipiélago que la ciudadanía quiere conservar.
            </p>
            <br />
            <h3>2. ¿Qué puedo hacer en Mapa-33?</h3>
            <p>Aquí puedes:</p>
            <ul>
              <li>
                <strong>Proponer un terreno</strong> de importancia para ti y tu comunidad.
              </li>
              <li>
                <strong>Apoyar propuestas</strong> sometidas por otros ciudadanos.
              </li>
              <li>
                <strong>Regar la voz</strong> compartiendo e invitando a tu comunidad a ser parte de la conservación del país.
              </li>
            </ul>
            <br />
            <h3>3. ¿Cómo funciona Mapa-33?</h3>
            <p>
              Todo usuario debe registrarse antes de proponer o apoyar una propuesta. Luego de registrarte, lo primero que debes hacer es identificar el terreno que quieres proteger. Una vez lo localices en el mapa, llenarás un formulario para entender mejor tu propuesta y el valor y potencial de la conservación del espacio que propones. Una vez sometida tu propuesta, será publicada en el mapa para que otros la puedan ver y apoyar. Durante este proceso, también recibirás comunicaciones que te ayudarán a manejar y promover tu propuesta.
            </p>
            <br />
            <h3>4. ¿Quién puede participar en Mapa-33?</h3>
            <p>
              La herramienta es abierta y de visualización pública; está diseñada para ser usada a través de un navegador web (Explorer, Firefox, Google Chrome, Safari, etc). Cualquier persona con acceso a una computadora, tableta o un teléfono inteligente puede someter una propuesta. Si te interesa hacer o apoyar una propuesta y no tienes acceso a estos dispositivos, puedes comunicarte al (787) 722-5882 para orientación.
            </p>
            <br />
            <h3>5. ¿El terreno propuesto será conservado por Para La Naturaleza?</h3>
            <p>
              No necesariamente. El propósito y objetivo de la herramienta es crear un espacio para que la ciudadanía participe activamente en los esfuerzos de conservación. La visualización de propuestas nos permite ver lo que todos queremos proteger y así crear un mapa de conservación de Puerto Rico en conjunto. Para la Naturaleza, dentro de los procesos de propuesta, facilitará herramientas y orientación sobre mecanismos de conservación existentes para que ciudadanos o comunidades puedan gestionar la protección de las áreas que valoran.
            </p>
            <br />
            <h3>6. ¿Cómo puedo compartir y buscar aliados para las propuestas publicadas?</h3>
            <p>
              Puedes compartir tu propuesta usando los enlaces en la Tarjeta de la Propuesta e invitando a miembros de tu comunidad a apoyar el terreno que propones. Cada tarjeta tiene una sección de comentarios dónde todos pueden compartir información e ideas.
            </p>
            <br />
            <h3>7. ¿Cómo se utilizará la información recopilada por el mapa?</h3>
            <p>
              La información generada en este mapa nos ayudará a comprender cuales son las áreas más importantes para la ciudadanía. Nos ayudará también a dedicar recursos institucionales y programas educativos para personas, organizaciones o instituciones que se comprometan con la elaboración de propuestas de conservación.
            </p>
            <br /> 
            <h3>8. ¿Por qué Mapa-33?</h3>
            <p>
              El bienestar y la salud de los habitantes de Puerto Rico depende de la protección y el uso sustentable de sus terrenos.
            </p>
            <p>
              Para la Naturaleza, tras 50 años de proteger las áreas ecológicas más sensitivas con el fin de asegurar la sobrevivencia de todos los habitantes del archipiélago, reconoce que la protección actual de dichos hábitats -de un 16% de sus terrenos- no es suficiente para detener el deterioro climático, ecológico y humano que vivimos.
            </p>
            <p>
              Conservar el 33% para el 2033 es una meta de país.
            </p>
            <p>
              Creemos que la participación y el liderazgo de comunidades locales son esenciales para practicar una conservación inclusiva. Mapa-33 es un espacio dónde todos podemos visualizar y aportar a lo que colectivamente queremos proteger. Es una herramienta para crear un mapa de conservación en comunidad.
            </p>
            <br />
            <h3>9. ¿Qué es Para la Naturaleza?</h3>
            <p>
              Somos una organización no gubernamental y sin fines de lucro dedicada a la conservación de las islas de Puerto Rico. Creemos en mantener los servicios ecosistémicos para crear resiliencia contra el cambio climático mediante la protección del 33% del patrimonio natural. Apoyamos también la preservación del patrimonio histórico y cultural, promoviendo el rescate de una cultura ecológica que asegure la salud de los ecosistemas naturales y habitantes.
            </p>
            <p>
              Para la Naturaleza maneja actualmente 64 áreas naturales protegidas y seis centros de visitantes, incluyendo Hacienda Buena Vista en Ponce, Cabezas de San Juan en Fajardo, Hacienda La Esperanza en Manatí y el Antiguo Acueducto en Río Piedras.
            </p>
            <p>
              Para más información, visita <a href="www.paralanaturaleza.org" target="_blank" style={{ color: '#fff', textDecoration: 'underline' }}>www.paralanaturaleza.org</a>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default FrequentQuestions;