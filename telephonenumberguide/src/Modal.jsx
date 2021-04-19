export const Modal = ({ name, text }) => {
  return (
    <div
      style={{
        background: "black",
        opacity: 0.5,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          background: "white",
          display: "flex",
          alignItems: "center",
          padding: "2rem",
          color: "red",
          borderRadius: "8px",
          boxShadow: "2px 2px 2px 1px rgb(255 255 255 / 15%)",
        }}
      >
        <p>
          <b>{`${name} `}</b>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Modal;
