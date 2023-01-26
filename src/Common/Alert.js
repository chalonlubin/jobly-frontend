function Alert({errors}) {
  return (
    <div className="Alert">
      {errors.map((e) => (
        <div key={e} className="alert alert-danger" role="alert">
          {e}
        </div>
      ))}
    </div>
  );
}
export default Alert;
