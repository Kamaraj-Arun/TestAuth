import React from "react";

const FourSimpleSteps = () => {
  const flowData = [
    {
      id: 1,
      number: "1",
      content: "Sign up with few clicks",
      gradient: "linear-gradient(180deg, #2FA5DD 0%, #00FFC2 100%)",
    },
    {
      id: 2,
      number: "2",
      content: "Onboard your content with few clicks",
      gradient: "linear-gradient(180deg, #04ABD5 0%, #00576B 100%)",
    },
    {
      id: 3,
      number: "3",
      content: "Your content is visible on the world market place",
      gradient: "linear-gradient(180deg, #6251A1 0%, #291A6C 100%)",
    },
    {
      id: 4,
      number: "4",
      content: "Get top offers across the world for your content",
      gradient: "linear-gradient(180deg, #E06F73 0%, #CF2D2A 100%)",
    },
  ];
  return (
    <section>
      <div className="">
        <div style={{ paddingTop: "116px" }}>
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '100%' }}>
              <p className="stepsTitle">
                Sell Content & Digital Rights In 4 Simple Steps
              </p>

              <div className="numberOverAllContainer">
                {/* <div className="waveBackground"></div>{" "} */}
                {flowData.map((item: any) => (
                  <div key={item.id} className="numberContainer">
                    <p
                      className="numberDesign"
                      style={{
                        background: `${item.gradient}`,
                      }}
                    >
                      {item.number}
                    </p>
                    <div className="lineBelowNumber"></div>
                    <p className="fourstepContent">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default FourSimpleSteps;
