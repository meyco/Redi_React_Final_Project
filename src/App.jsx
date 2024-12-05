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
    //何を頼むか、味はどれが良いか？towerIndexとdiskはこの中でしか使えない
    console.log("Drag started:", { towerIndex, disk });
    setSelectedDisk(disk);
    setSelectedTower(towerIndex);
  };

  //ドロップした時の動き
  const handleDrop = (targetTowerIndex) => {
    console.log("Disk moved to tower:", targetTowerIndex);
    console.log("Selected Disk number:", selectedDisk);
    console.log("Disk moved from tower:", selectedTower);

       //diskもtowerも選択してないとき
    if (selectedDisk === null || selectedTower === null)
      return;//処理を終える。nullにしないと処理がおわらない

    const destinationTower = towers[targetTowerIndex];
    //ドロップ先タワー。targetTowerIndexで指定されたタワーの番号をdestinationTowerに持つ


    if (
      destinationTower.length > 0 &&  //ドロップ先のタワーにディスクが積まれているかをチェック。 空０かどうか
      //&&「両方の条件がtrueの場合のみ」、true
      destinationTower[destinationTower.length - 1] < selectedDisk
    )
    //Drop先タワーの配列の最後の要素が、ディスクより小さい時
     {
      alert("大きいディスクは小さいディスクの上に置けません");
      return;
    }

    //実際にディスクを1つのタワーから別のタワーに動かす処理
    const newTowers = towers.map((tower, index) => {//タワーのインデックスを一つずつ確認
      //移動元のタワーの処理
      if (index === selectedTower) {
        return tower.slice(0, -1);//このタワーの一番上のディスクを取り除く
        //行き先のタワーの処理
      } else if (index === targetTowerIndex) {
        //スプレッド構文、配列やオブジェクトの中身を「ばらして取り出す」
        return [...tower, selectedDisk];//タワーの中身を取り出し、selectedDiskを最後に追加
      } else {
        return tower;//何もせず、タワーの配列を返す
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