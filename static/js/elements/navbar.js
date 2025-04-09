export class NavBarElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <style>
      
        #navbar {
          position: absolute;
          width: 1044px;
          height: 54px;
        }

        #navbar-box {
          position: absolute;
          width: 1044px;
          height: 54px;
          border-radius: 10px;
          background: rgba(209, 196, 233, 0.29);
          border: 1px solid #ffffff;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.53);
          backdrop-filter: blur(11px);
        }

        #navbar-profile {
          position: absolute;
          left: 24px;
          top: 7px;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background: url('data:image/jpeg;base64,...'); /* raccourci */
          background-size: 40px 40px;
        }

        #navbar-users {
          position: absolute;
          left: 88px;
          top: 11px;
          width: 40px;
          height: 32px;
          background: #ffffff;
        }

        #frame {
          position: absolute;
          left: 152px;
          top: 5px;
          width: 40px;
          height: 45.71px;
          overflow: hidden;
        }

        #navbar-plus {
          position: absolute;
          left: 1.43px;
          top: 4.29px;
          width: 37.14px;
          height: 37.14px;
          background: #ffffff;
        }

        #navbar-island {
          position: absolute;
          left: 253px;
          top: 11px;
          width: 592px;
          height: 32px;
          border-radius: 10px;
          background: #4caf50;
        }

        #navbar-bell {
          position: absolute;
          left: 921px;
          top: 10px;
          width: 31px;
          height: 35.43px;
          background: #ffffff;
        }

        #navbar-connect {
          position: absolute;
          left: 978px;
          top: 10px;
          width: 40px;
          height: 35px;
          background: #ffffff;
        }

        i {
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
      </style>

      <div id="navbar">
        <div id="navbar-box"></div>
        <div id="navbar-profile"></div>
        <div id="navbar-users"><i class="fas fa-users"></i></div>
        <div id="frame">
          <div id="navbar-plus"><i class="fas fa-plus"></i></div>
        </div>
        <div id="navbar-island"></div>
        <div id="navbar-bell"><i class="fas fa-bell"></i></div>
        <div id="navbar-connect"><i class="fas fa-sign-out-alt"></i></div>
      </div>
    `;
  }
}
