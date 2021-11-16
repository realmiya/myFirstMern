import './App.scss';
import React from 'react';
import CardSection from "./components/CardSection"
import Header from "./components/Header"
import InviteSection from "./components/InviteSection"
import "./styles/reset.scss";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <main className="main">

          <div className="shiftCard">
            <div className="inviteText">
              <div className="header1">Shifts</div>
            </div>


            <InviteSection />

            <CardSection />
          </div>


        </main>
      </div>

    </div>
  );
}

export default App;
