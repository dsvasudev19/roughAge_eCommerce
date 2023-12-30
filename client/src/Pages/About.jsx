import React from "react";
import Navbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
function About() {
  return (
    <>
      <Navbar />

      <div className="aboutPageMain">
        <div className="ourStory" id="separateDivs">
          <div className="divImage">
            <img src="/Gallery/a2.png" alt="storyImage" />
          </div>
          <div className="divContent">
            <h6 id="abouthead">
              Welcome to{" "}
              <span style={{ color: "orangered", fontWeight: "800" }}>
                roughAge
              </span>{" "}
              - the taste of{" "}
              <span style={{ color: "green", fontWeight: "700" }}>#Nature</span>
            </h6>
            <p id="abouttexts">
              At <span style={{ color: "orangered" }}>roughAge</span>, we are
              passionate advocates for healthy living and believe that everyone
              deserves access to fresh, organic fruits and vegetables. Our
              journey begins with a commitment to cultivating a sustainable and
              organic harvest, bringing the wholesome goodness of nature
              directly to your table.
            </p>
            <h4 id="abouthead">Our Roots</h4>
            <p id="abouttexts">
              Founded with a vision to redefine the way we approach food,{" "}
              <span style={{ color: "orangered" }}>roughAge</span> is more than
              just a provider of organic produce. We're cultivators and
              caretakers of the land, dedicated to preserving the purity of
              nature's flavors.
            </p>
          </div>
        </div>
        <div className="vision" id="separateDivs">
          <div className="divContent">
            <h6 id="abouthead">Vision</h6>
            <p id="abouttexts">
              We envision a world where everyone has the opportunity to savor
              the taste of nature and experience the countless benefits of
              consuming organic, sustainably grown fruits and vegetables.{" "}
              <span style={{ color: "orangered" }}>roughAge</span> aspires to be
              a catalyst for positive change in the way society views and values
              its food sources. We strive to create a global community that
              understands the significance of organic farming, values the health
              benefits it brings, and actively participates in the journey
              toward a more sustainable and nourished world. Our vision is to be
              a leading force in making organic living accessible to all,
              fostering a harmonious relationship between people and the planet.
            </p>
          </div>
          <div className="divImage">
            <img src="/Gallery/vision.png" alt="storyImage" />
          </div>
        </div>
        <div className="mission" id="separateDivs">
          <div className="divImage">
            <img src="/Gallery/g4.jpg" alt="storyImage" />
          </div>
          <div className="divContent">
            <h6 id="abouthead">Mission</h6>
            <p id="abouttexts">
              At <span style={{ color: "orangered" }}>roughAge</span>, our
              mission is to empower individuals and communities to embrace a
              healthier and more sustainable lifestyle by providing affordable
              access to fresh, organic fruits and vegetables. We are dedicated
              to cultivating and sourcing the highest quality produce, fostering
              a connection between people and the natural abundance of our
              planet. Through our commitment to organic farming and community
              support, we strive to make wholesome, nutrient-rich food a
              fundamental part of every person's daily life, promoting
              well-being and vitality.
            </p>
          </div>
        </div>
        <div className="difference" id="separateDivs">
          <div className="divContent">
            <h6 id="abouthead">What makes up apart ?</h6>
            <ul>
              <li>
                <dl>
                  <dl style={{ fontSize: "larger", fontWeight: "700" }}>
                    Farm to Fork Philosophy:
                  </dl>
                  <dd id="abouttexts">
                    At <span style={{ color: "orangered" }}>roughAge</span>, our
                    "Farm to Fork" philosophy defines us, cultivating a
                    significant portion of our fruits and vegetables on our
                    farms. This hands-on approach guarantees meticulous care,
                    providing a direct and traceable source for every produce
                    piece on your table. We prioritize sustainable practices,
                    focusing on soil health, natural fertilizers, and
                    eco-friendly cultivation, going beyond growth to nurture the
                    land and harmonize nature and agriculture. Embodying these
                    principles, we deliver the pure essence of nature with the
                    highest standards of quality and freshness, offering more
                    than just fruits and vegetables but a taste of the earth's
                    vitality.
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dl style={{ fontSize: "larger", fontWeight: "700" }}>
                    Supporting Local Farmers:{" "}
                  </dl>
                  <dd id="abouttexts">
                    Beyond buying, we{" "}
                    <span style={{ color: "orangered" }}>#roughAge</span> build
                    bonds with local organic farmers. Together, we're forging a
                    resilient community, empowering sustainability one farm at a
                    time. Our diverse bounty inspires others to join the green
                    wave, nurturing a planet that thrives.
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>

        <br></br>
        <div className="achievements" id="separateDivs">
          <div className="divContent">
            <h6 id="abouthead">Our Achievements</h6>
            <p id="abouttexts">
              Bursting with pride, we're honored to announce our Best Farmer
              Award for naturally grown fruits and vegetables! This recognition
              celebrates our deep-rooted passion for sustainable farming, where
              every harvest is a symphony of nature's gifts. From dancing with
              the seasons to nurturing the soil's whispers, we believe in the
              magic of natural solutions and the vibrancy of untouched taste.
              This award is a shared victory for every hand, bee, and sunbeam
              that brings our produce to life, and a testament to our unwavering
              commitment to quality and sustainability. Join us in savoring the
              earth's bounty and celebrating the purest flavors nature has to
              offer!
            </p>
          </div>
          <div className="divImage">
            <img
              src="/Gallery/awardPicOne.jpg"
              id="aboutPageImages"
              alt="award image"
            />
          </div>
        </div>
        <div className="team" id="separateDivs"></div>
      </div>
      <Footer />
    </>
  );
}

export default About;
