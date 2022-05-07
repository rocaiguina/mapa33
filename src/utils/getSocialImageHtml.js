module.exports = {
  getSocialImageHtml: function(photographUrl, name, location, coordinates) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <style>
          html {
            width: 760px;
            height: 376px;
          }
          body {
            width: 760px;
            height: 376px;
            margin: 0;
          }
          hr {
            border: 1px solid white;
            margin-bottom: 20px;
          }
          .container {
            position: absolute;
            top: 0;
            left: 0;
            width: 760px;
            height: 376px;
            background-color: #181a19;
          }
          .map {
            position: relative;
            margin: 22px 0 0 22px;
            width: 390px;
            height: 260px;
            border-radius: 34px;
            z-index: 100;
          }
          .logo {
            position: absolute;
            bottom: 4px;
            left: 30px;
            width: 370px;
            height: 98.38px;
          }
          .line {
            position: absolute;
            bottom: 12px;
            left: 22px;
            width: 390px;
            height: 4px;
          }
          .right-column {
            position: absolute;
            right: 22px;
            top: 18px;
            width: 290px;
            color: white;
            background-color: #181a19;
          }
          .title {
            font-size: 26px;
            font-weight: bold;
            font-family: "Whyte", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            line-height: 1.2;
            margin-bottom: 8px;
            margin-top: 0;
          }
          .user-name {
            font-size: 24px;
            font-weight: bold;
            font-family: "Whyte", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            line-height: 1.2;
            margin-bottom: 16px;
            margin-top: 0;
          }
          .info-title {
            font-size: 20px;
            font-weight: bold;
            font-family: "Whyte", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            line-height: 0.4rem;
            margin-bottom: 0px;
          }
          .info {
            font-size: 20px;
            font-family: "Whyte", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            line-height: 1;
            margin-bottom: 2rem;
          }
          .text-box {
            position: absolute;
            display: flex;
            width: 290px;
            height: 50px;
            right: 22px;
            bottom: 28px;
            font-family: "Whyte", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            background-color: #f073a8;
            color: #181a19;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            text-transform: uppercase;
            border-radius: 25px;
            line-height: 1.7;
          }
          .text-box-text {
            align-self: center;
            justify-self: center;
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${photographUrl}" class="map" />
          <img src="${process.env.SERVER_URL +
            '/images/M33-FondoNegro.svg'}" class="logo" />
          <img src="${process.env.SERVER_URL +
            '/images/colorline.png'}" class="line" />
          <div class="right-column">
            <p class="title">
              ${name}
            </p>
            <hr />
            <p class="info-title">Coordenadas</p>
            <p class="info">
              <span>${coordinates}</span>
            </p>
            <p class="info-title">Localizado</p>
            <p class="info">
              <span>${location || ''}</span>
            </p>
          </div>
          <div class="text-box">
            <p class="text-box-text">APOYA ESTA PROPUESTA</p>
          </div>
        </div>
      </body>
    </html>
    `;
  },
};
