function Disk({ size }) {
    return (
      <div
        style={{
          width: `${size * 20}px`,
          height: "20px",
          backgroundColor: "skyblue",
          margin: "2px",
        }}
      ></div>
    );
  }
  
  export default Disk;
  