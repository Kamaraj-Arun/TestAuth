import ToggleList from "../components/global/toggleList";

import sellLanding from "../assets/sellLanding.png"
import bgPurple1 from "../assets/bgPurple1.png";
import bgPurple2 from "../assets/bgPurple2.png";
import sellMidSection1 from "../assets/sellMidSection1.png";
import sellMidSection2 from "../assets/sellMidSection2.png";

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

import "../styles/staticSell.css";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export function StaticSell() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, #2F005D 40.5%, rgba(0, 0, 0, 0.5) 100%), url(${sellLanding})`,
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
      tagLine: "Secure & Streamlined \n content Rights sales",
      content:
        "Selling content rights safely and easily involves several key steps. First, clearly define the rights you intend to sell, whether they are distribution rights, broadcast rights, or digital streaming rights. Next, set up contracts and conduct thorough due diligence on the financial stability of potential buyers. Additionally, set transparent terms and conditions, including pricing, usage limits, and payment schedules. All of this can become overwhelming and complicate the process.",
      backgroundImage: backGroundStyleSection1,
      image: sellMidSection1,
      imageLeft: true,
    },
    {
      tagLine: "",
      content:
        "Sell your content rights fast and hassle-free. Producerbazaar's platform takes care of the legal complexities, so you can focus on creating.",
      backgroundImage: backGroundStyleSection2,
      image: sellMidSection2,
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
      content: "Attract worldwide buyers",
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
      content: "Connect with interested parties securely",
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
    { text: 'Register and create an account', subsection: 'Sign up on the platform and create your account by providing basic information and verifying your email.' },
    { text: 'Prepare your content', subsection: '' },
    { text: 'Define your rights', subsection: '' },
    { text: 'Upload your content', subsection: '' },
    { text: 'Set terms and conditions', subsection: '' },
    { text: 'Review and approve contracts', subsection: '' },
    { text: 'List your content', subsection: '' },
    { text: 'Promote your listing', subsection: '' },
    { text: 'Engage with buyers', subsection: '' },
    { text: 'Finalize transactions', subsection: '' },
    { text: 'Register Rights', subsection: '' },
    { text: 'Monitor sales and payments', subsection: '' },
  ];

  const Landing = () => {
    const tagLine = "Sell content rights \n Safely and Easily";
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
      <div className="testAuth">
        <Header></Header>
        <Landing></Landing>
        <MidSection></MidSection>
        <ChooseProducerBazaar></ChooseProducerBazaar>
        <BuyingContentRights />
        <StartBuying />
        <Footer></Footer>
      </div>
    </div>
  );
}
