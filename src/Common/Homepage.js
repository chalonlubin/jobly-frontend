import "./Homepage.css"


/** Renders the homepage.
 *
 * Props: none
 *
 * State: none
 *
 * App -> Homepage
 *
 * */
function Homepage() {
  return (
    <section className="Homepage">
      <div className="Homepage-content">
        <h1 className="Homepage-title"> Jobly </h1>
        <h2 className="Homepage-subtitle"> Not your average job finder. </h2>
      </div>
    </section>
  );
}

export default Homepage;
