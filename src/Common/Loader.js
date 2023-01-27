import "./Loader.css";

//FIXME: I had a loader here, it broke too much so need to find a new one tmrw.
function Loader() {
  return (
    <div className="Loader">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
