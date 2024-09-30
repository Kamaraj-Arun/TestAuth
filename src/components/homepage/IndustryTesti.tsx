import React from "react";
import supriyaImg from "../../assets/indusTest.png";
import divyaImg from "../../assets/divya.png";
import sharathImg from "../../assets/sharath.png";
import sureshImg from "../../assets/suresh.png";
import girishImg from "../../assets/girish.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const IndustryTesti = () => {
  const testimonialData = [
    {
      id: 1,
      name: "Ms. Supriya Yalagadda",
      designation: "Secretary, Active Film Producers Guild",
      content: `<p>“So far we all have been focusing on producing good content as we are basically filmmakers and we get exhausted to ready 30-page agreements. Now as a producer we have to focus on 360 degree monetization. Thank you GK and Vijay for opening up the box which we are passionate about but very scared to open it up all these days. Now we have Producerbazzar.com to track our rights when we focus on filmmaking.”</p>`,
      imgData: supriyaImg,
    },
    {
      id: 2,
      name: "Mr.Suresh Kumar",
      designation: "President, Kerala Film Chamber of Commerce",
      content: `<p>“I have been into this industry for 25+ years as a producer, distributor and director. I strongly feel technology should disrupt our industry and change the way business is one. Producerbazaar.com looks promising disrupter for Media Industry.”</p>`,
      imgData: sureshImg,
    },
    {
      id: 3,
      name: "Mr. Girish Kasaravalli",
      designation: "Kannada Film Director",
      content: `<p>Producerbazaar.com a centralized b2b platform helps to enhance the creator ecosystem acts catalyst   between the Producer – Broadcaster and End Audience this will help to  improve this industry to international standards.”</p>`,
      imgData: girishImg,
    },
    {
      id: 4,
      name: "Mr. Sharrath Marar",
      designation: "Film Producer and Entrepreneur",
      content: `All these days we have been unknowingly talking about linear and non-linear, close the agreement, proceed to release, focus on success, and then move on to next movie. But now we are at Film Business 3.0 as Mr. GK Tirunavukarasu and Mr. Vijay explained the changing dynamics of film business and markets are maturing to break rights separately and see how we can monetise that.”</p>`,
      imgData: sharathImg,
    },
    {
      id: 5,
      name: "Ms. Divya Dixit",
      designation: "Ex Alt Balaji & Ex Zee5",
      content: `<p>“Producerbazaar.com a centralised b2b platform helps to enhance the creator ecosystem acts catalystbetween the Producer – Broadcaster and End Audience this will help to  improve this industry to international standards”</p>`,
      imgData: divyaImg,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <section>
      <div className="">
        <div className="" style={{ paddingTop: "125px" }}>
          <div className="container">
            <p className="clientsTitle">Testimonials</p><br />
            <div className="testiContainerDiv">
              <Slider {...settings}>
                {testimonialData.map((item: any) => (
                  <div key={item.id}>
                    <div
                      className="testiLeftverDiv"
                      style={{
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                        alignItems: "center",
                        flexWrap: 'wrap',
                      }}
                    >
                      <div className="testiLeft">
                        <img src={item.imgData} alt="" className="testiImage" />
                        <p className="testiLeftname" style={{ color: "white" }}>{item.name}</p>
                        <p className="testiLeftDesc" style={{ color: "white" }}>{item.designation}</p>
                      </div>
                      <div className="testiRight">
                        {/* <p className="industryTitle"> Industry Testimonials</p> */}
                        <p
                          className="industryContent"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryTesti;
