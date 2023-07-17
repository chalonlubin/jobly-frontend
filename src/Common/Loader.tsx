import "./Loader.css";

/** Renders a loading bubble.  */
function Loader() {
  return (
    <div className="Loader spinner-grow text-success" role="status">
      <span className="sr-only"></span>
    </div>
  );
}

export default Loader;
