function Disk({ size, onDragStart }) {
    return (
      <div
        draggable // ドラッグ可能にする
        onDragStart={onDragStart} // ドラッグ開始時の処理
        style={{
          width: `${size * 20}px`,
          height: "20px",
          backgroundColor: "skyblue",
          margin: "2px",
          textAlign: "center",
          lineHeight: "20px",
          border: "1px solid black",
        }}
      >
        {size}
      </div>
    );
  }
  
  export default Disk;
  