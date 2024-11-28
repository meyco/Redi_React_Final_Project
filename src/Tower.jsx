import Disk from "./Disk";

//データの流れ
//App.js から Tower コンポーネントにタワーの情報を渡す。
//Tower.js で disks を使って Disk コンポーネントに各円盤の size を渡す。
//Disk.js で受け取った size を使い、幅（width）を決定して表示。

function Tower({ disks, onClick }) {
  //**Towerという関数コンポーネントを定義しており、disksというプロパティ（props）を受け取っています**。
  // App.jsからonClickプロパテが渡される。<Tower>コンポーネントの中の{onClick}
  return (
    //Towerコンポーネントの外側を包む<div>です。ここには**towerStyleというスタイル**が適用
    <div onClick={onClick} style={towerStyle}>
      {/* disks配列の要素（サイズ）を1つずつ取り出し、それぞれを使って<Disk />コンポーネントを生成
       size：配列の各要素（円盤のサイズ）で、map()で取り出したもの。
        index：配列内の位置（何番目の要素か）を表すインデックスです。
        map()は配列を順番に繰り返し処理する。これはDisk配列のサイズを1つずつ取り出して
        Diskコンポーネントを作っている。*/}
      {disks.map((size, index) => (
        //Disk.jsのDiskコンポーネント。sizeをDiskコンポーネントに渡す
        //Diskコンポーネントが{size}の数字でDisk.js内で掛け算
        //keyを設定し表示のパフォーマンス向上。keyの数字を順番に渡す。
        <Disk key={index} size={size} />
      ))}
    </div>
  );
}

const towerStyle = {
  border: "1px solid black",
  width: "100px",
  height: "300px",
  margin: "10px",
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",
};

export default Tower;
