import ToggleList from "../components/global/toggleList";

import buyLanding from "../assets/buyLanding.png"
import bgPurple1 from "../assets/bgPurple1.png";
import bgPurple2 from "../assets/bgPurple2.png";
import buyMidSection1 from "../assets/buyMidSection1.png";
import buyMidSection2 from "../assets/buyMidSection2.png";

import location from "../assets/location.png";
import catalog from "../assets/catalog.png";
import customize from "../assets/customize.png";
import paste from "../assets/paste.png";
import connect from "../assets/connect.png";
import helpline from "../assets/helpline.png";
import onboard from "../assets/onboard.png";
import moreReasonsImage from "../assets/moreReasons.png";
import checkCircle from "../assets/checkCircle.png";
import startBuying from "../assets/startBuyingBG.png";
import whatsappImage from "../assets/whatsappImage.png";

import "../styles/staticBuy.css";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export function StaticBuy() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, #2F005D 40.5%, rgba(0, 0, 0, 0.5) 100%), url(${buyLanding})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "30vh",
    width: "100vw",
  };

  const backGroundStyleSection1 = {
    backgroundImage: `url(${bgPurple1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
  };

  const backGroundStyleSection2 = {
    backgroundImage: `url(${bgPurple2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
  };

  const startBuyingBackGroundStyle = {
    backgroundImage: `url(${startBuying})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
  };

  const midSections = [
    {
      tagLine: "The Fastest Way \n To Acquire Content Rights",
      content:
        "Acquiring content rights involves identifying the rights holder and engaging a seasoned entertainment lawyer or rights acquisition specialist to process the intended use, required rights, and financial offer. Without knowledge on how to navigate the process, it can often cause unnecessary delays and complications.",
      backgroundImage: backGroundStyleSection1,
      image: buyMidSection1,
      imageLeft: true,
    },
    {
      tagLine: "",
      content:
        "Producerbazaar simplifies finding the perfect content for your needs. Our trusted platform streamlines access to a vast library of content rights, saving you time and ensuring everything is above board.",
      backgroundImage: backGroundStyleSection2,
      image: buyMidSection2,
      imageLeft: false,
    },
  ];

  const reasonsToChooseProducerBazaar = [
    {
      image: location,
      content: "Safe and Verified market place",
    },
    {
      image: catalog,
      content: "Extensive Catalog",
    },
    {
      image: customize,
      content: "Customize rights & duration with few clicks",
    },
    {
      image: paste,
      content: "We do all the heavy lifting behalf of you",
    },
    {
      image: connect,
      content: "Connect with rights holders swiftly",
    },
    {
      image: helpline,
      content: "Conduct financial transactions with confidence",
    },
    {
      image: onboard,
      content: "Onboard in 3 simple steps",
    },
  ];

  const moreReasons = [
    {
      content: "Easy to search with 20+ filters",
    },
    {
      content: "5000+ movie database",
    },
    {
      content: "Exclusive dashboards for buyers and sellers",
    },
    {
      content: "Track everything in one place",
    },
  ];

  const buyingContentRights = [
    { text: 'Identify your needs', subsection: 'Determine the type of content you need, the rights required (e.g., distribution, broadcast, streaming), the duration, and the geographical regions.' },
    { text: 'Research and find content', subsection: '' },
    { text: 'Elevate options', subsection: '' },
    { text: 'Verify rights holder', subsection: '' },
    { text: 'Engage a legal expert', subsection: '' },
    { text: 'Negotiate terms', subsection: '' },
    { text: 'Draft and review contract', subsection: '' },
    { text: 'Secure financing', subsection: '' },
    { text: 'Complete thr transaction', subsection: '' },
    { text: 'Obtain and verify content', subsection: '' },
    { text: 'Register Rights', subsection: '' },
    { text: 'Implement and Distribute', subsection: '' },
  ];

  const Landing = () => {
    const tagLine = "Acquire content rights \n without any hassle";
    return (
      <div>
        <div style={backgroundStyle}>
          <div className="tagLine">
            {tagLine.split("\n").map((line, index) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MidSection = () => {
    return (
      <div>
        {midSections.map((section) => {
          return (
            <div style={section.backgroundImage}>
              <div>
                {section.imageLeft && (
                  <div className="midSectionContainer">
                    <div>
                      <img className="midSectionImage" src={section.image} />
                    </div>
                    <div className="midSectionContentContainer">
                      <div className="midSectionTagLine">
                        {section.tagLine.split("\n").map((line, index) => (
                          <div key={index}>
                            {line}
                            <br />
                          </div>
                        ))}
                      </div>
                      <div className="midSectionContent">{section.content}</div>
                    </div>
                  </div>
                )}
                {!section.imageLeft && (
                  <div className="midSectionContainer">
                    <div className="midSectionContentContainer">
                      <div className="midSectionTagLine">
                        {section?.tagLine}
                      </div>
                      <div className="midSectionContent midSectionContentText">{section.content}</div>
                    </div>
                    <div>
                      <img className="midSectionImage" src={section.image} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const ChooseProducerBazaar = () => {
    return (
      <div className="reasonsContainer">
        <div className="heading">Why Choose Producer Bazaar</div>
        <div className="reasonsToChooseContainer">
          {reasonsToChooseProducerBazaar.map((reason) => {
            return (
              <div className="reasonContainer">
                <img className="reasonImage" src={reason.image} />
                <div>{reason.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const MoreReasons = () => {
    return (
      <div className="moreReasonsContainer">
        <div className="heading">More Reasons To Choose Producer Bazaar</div>
        <div className="moreReasonsSection">
          <div className="moreReasonsImageContainer">
            <img className="moreReasonsImage" src={moreReasonsImage} />
          </div>
          <div className="moreReasonsContentContainer">
            <div className="moreReasonsContent">
              {moreReasons.map((reason) => {
                return (
                  <div className="moreReasons">
                    <div>
                      <img
                        className="moreResonsCheckCircle"
                        src={checkCircle}
                      />
                    </div>
                    <div className="reasonText">{reason.content}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BuyingContentRights = () => {
    return (
      <div style={backGroundStyleSection1}>
        <div className="buyingContentRightsContainer">
          <div className="heading">
            Buying Content Rights With Producer Bazaar
          </div>
          <div>
            <ToggleList sentences={buyingContentRights} />
          </div>
        </div>
      </div>
    )
  }

  const StartBuying = () => {
    return (
      <div style={startBuyingBackGroundStyle}>
        <div>
          <div className="heading">
            <p style={{ marginBottom: '-30px' }}>Start Buying Movie & Digital Rights</p>
            <p>At the right price </p>
          </div>
          <div className="startBuyingContainer">
            <div className="whatsappChatContainer">
              <img className="whatsappChatImage" src={whatsappImage} />
              <div className="textStyle">Chat with sales team</div>
            </div>
            <div className="signUpForFreeContainer">
              Signup
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <Header></Header>
        <Landing></Landing>
        <MidSection></MidSection>
        <ChooseProducerBazaar></ChooseProducerBazaar>
        <MoreReasons />
        <BuyingContentRights />
        <StartBuying />
        <Footer></Footer>
      </div>
    </div>
  );
}
