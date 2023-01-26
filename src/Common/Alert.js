function Alert({ alerts, type }) {
  return (
    <div className="Alert">
      <div className={`alert alert-${type}`} role="alert">
        {alerts.map((e) => (
          <p className="mb-0 small" key={e}>{e}</p>
        ))}
      </div>
    </div>
  );
}
export default Alert;
