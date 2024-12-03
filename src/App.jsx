import React, { useState } from "react"; // useStateをインポート
import Tower from "./Tower";
import './App.css'


export default function App() {
  const [towers, setTowers] = useState([
    [3, 2, 1], // 左のタワーに3つの円盤
    [], // 真ん中のタワー
    [], // 右のタワー
  ]);



  // 選択された円盤とその位置を管理
  const [selectedDisk, setSelectedDisk] = useState(null); // 選択された円盤のサイズ
  const [selectedTower, setSelectedTower] = useState(null); // 選択されたタワーのインデックス

  // ドラッグ開始時に呼ばれる関数
  const handleDragStart = (towerIndex, disk) => {
    console.log("Drag started:", { towerIndex, disk });
    setSelectedDisk(disk);
    setSelectedTower(towerIndex);
  };

  
const handleDrop = (towerIndex) => {
  console.log("Drop at tower:", towerIndex);
  console.log("Selected Disk:", selectedDisk);
  console.log("Selected Tower:", selectedTower);

  if (selectedDisk === null || selectedTower === null) return;

  const destinationTower = towers[towerIndex];
  if (
    destinationTower.length > 0 &&
    destinationTower[destinationTower.length - 1] < selectedDisk
  ) {
    alert("大きいディスクは小さいディスクの上に置けません");
    return;
  }

  const newTowers = towers.map((tower, index) => {
    if (index === selectedTower) {
      return tower.slice(0, -1);
    } else if (index === towerIndex) {
      return [...tower, selectedDisk];
    } else {
      return tower;
    }
  });

  setTowers(newTowers);
  setSelectedDisk(null);
  setSelectedTower(null);
};

      

  // // タワーがクリックされたときの動作
  // const handleTowerClick = (towerIndex) => {
  //   // 円盤がまだ選択されていない場合
  //   if (selectedDisk === null) {
  //     const tower = towers[towerIndex];
  //     if (tower.length === 0) return; // タワーが空の場合は何もしない

  //     // 最上部の円盤を選択
  //     setSelectedDisk(tower[tower.length - 1]);
  //     setSelectedTower(towerIndex);
  //   } else {
  //     // 同じタワーをクリックした場合は選択を解除
  //     if (towerIndex === selectedTower) {
  //       setSelectedDisk(null);
  //       setSelectedTower(null);
  //       return;
  //     }

  //     // 大きいディスクを小さいディスクの上に置けないようにする
  //     const destinationTower = towers[towerIndex];
  //     if (
  //       destinationTower.length > 0 && // 移動先タワーにディスクがある場合
  //       destinationTower[destinationTower.length - 1] < selectedDisk // 小さいディスクの上に大きいディスクを置こうとしている場合
  //     ) {
  //       alert("大きいディスクは小さいディスクの上に置けません");
  //       return;
  //     }

  //     // 移動先のタワーに円盤を移動
  //     const newTowers = towers.map((tower, index) => {
  //       if (index === selectedTower) {
  //         return tower.slice(0, -1); // 元のタワーから円盤を取り除く
  //       } else if (index === towerIndex) {
  //         return [...tower, selectedDisk]; // 選択された円盤を追加
  //       } else {
  //         return tower;
  //       }
  //     });

  //     // 状態を更新して選択を解除
  //     setTowers(newTowers);
  //     setSelectedDisk(null);
  //     setSelectedTower(null);
  //   }
  // };

  return (
    <div className="App">
      <h1>Hanoi Tower</h1>
      <h2>Click to move disk</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        {towers.map((disks, index) => (
          <Tower
          key={index}
          disks={disks}
          towerIndex={index}
          // onClick={() => handleTowerClick(index)} // クリック用
          onDragStart={handleDragStart} // ドラッグ用
          onDrop={handleDrop} // ドロップ用
          />
        ))}
      </div>
    </div>
  );
}