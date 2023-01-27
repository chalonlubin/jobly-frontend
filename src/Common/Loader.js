import "./Loader.css";

/** Renders a loading bubble.  */
function Loader() {
  return (
    <div className="Loader spinner-grow text-light" role="status">
      <span className="sr-only"></span>
    </div>
  );
}

export default Loader;
