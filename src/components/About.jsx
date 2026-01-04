const About = () => {
  return (
    <>
      <div className="about_container">
        <h1 className="about_heading">About Us</h1>

        <div className="about_us">
          <img
            className="aboutimg"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/10/23/4311f7ab-f07d-47c1-b364-66fc611466ab_979016.jpg"
            alt="About FoodMy"
          />

          <p className="about_text">
            Welcome to FoodMy, a modern food discovery platform designed to make
            your dining experience simple and enjoyable. In today’s fast-paced
            world, choosing the right restaurant and meal can be overwhelming.
            Many platforms are cluttered, slow, or difficult to navigate, which
            affects the overall user experience. FoodMy aims to solve this
            problem by offering a clean, intuitive, and responsive interface
            where users can easily explore restaurants, browse menus, and check
            ratings before making a decision. This project is built using modern
            web technologies such as React, JavaScript, HTML, and CSS, following
            best practices like reusable components and efficient state
            management. FoodMy is a growing project, with future plans to
            include features like cart management, authentication, and real-time
            data integration.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
