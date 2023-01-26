function Alert({errors}) {
  console.log("🚀 ~ file: Alert.js:2 ~ Alert ~ errors", errors)

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
